import { CANVAS_W, CANVAS_H, SIZ, H, W, PLAYER_SPEED, PLAYER_AIR_CONTROL, PLAYER_JUMP } from "./constants.js";
import { mapData, TILE_SPEC, setMapData, buildClassicMapDef, generateRandomMapDef } from "./map.js";
import { rectsIntersect, drawFrame } from "./utils.js";
import { Player } from "./player.js";
import { Enemy } from "./enemy.js";

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image: " + src));
    img.src = src;
  });
}

async function loadFont(name, url) {
  const face = new FontFace(name, `url("${url}")`);
  await face.load();
  document.fonts.add(face);
}

async function main() {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");

  let images;
  try {
    [images] = await Promise.all([
      Promise.all([
        loadImage("back.png"),
        loadImage("hero1.png"),
        loadImage("тер.png"),
        loadImage("ene.png"),
        loadImage("dimon.png"),
        loadImage("Ztep.png"),
      ]),
      loadFont("COld", "COld.TTF").catch(() => {}),
    ]);
  } catch (e) {
    document.body.textContent = "Не удалось загрузить ресурсы игры: " + e.message;
    return;
  }
  const [backImg, heroImg, terImg, eneImg, dimonImg, ztepImg] = images;

  const tileSkins = [
    { name: "тер.png", img: terImg },
    { name: "Ztep.png", img: ztepImg },
  ];
  let tileSkinIndex = 0;
  let tileImg = tileSkins[0].img;
  let skinToastText = "";
  let skinToastUntil = 0;

  const music1 = new Audio("last.mp3");
  const music2 = new Audio("Gimn.mp3");
  music1.loop = true;
  music2.loop = true;

  let offsetX = 0, offsetY = 0;
  let variable = 0;
  let isPlaying = 1;
  let mousDown = false;
  let stopped = false;

  let pl = new Player();
  const enemies = [];

  function resetGame(def) {
    setMapData(def.grid);
    offsetX = 0;
    offsetY = 0;

    pl = new Player();
    pl.rect.left = def.spawn.x;
    pl.rect.top = def.spawn.y;

    enemies.length = 0;
    for (const spec of def.enemySpecs) {
      const e = new Enemy();
      e.set(spec.tex === "dimon" ? dimonImg : eneImg, spec.x, spec.y, spec.sizeX, spec.sizeY, spec.hp);
      enemies.push(e);
    }

    window.__game = { pl, enemies };
  }

  resetGame(buildClassicMapDef());

  let snows = [];

  const menuFontSize = 36;
  const menu = {
    start: { text: "Start Game", x: 150, y: 200, color: "red" },
    random: { text: "Random Map", x: 150, y: 250, color: "white" },
    sound: { text: "Sound:", x: 150, y: 300, color: "white" },
    quit: { text: "Quit", x: 150, y: 350, color: "white" },
  };

  function menuBounds(item) {
    ctx.font = `${menuFontSize}px COld, sans-serif`;
    const width = ctx.measureText(item.text).width;
    return { left: item.x, top: item.y, width: width, height: menuFontSize * 1.15 };
  }

  function pointInBounds(b, x, y) {
    return x >= b.left && x <= b.left + b.width && y >= b.top && y <= b.top + b.height;
  }

  const keys = new Set();
  window.addEventListener("keydown", (e) => {
    keys.add(e.code);
    if (e.ctrlKey && e.altKey && e.code === "KeyZ") {
      e.preventDefault();
      tileSkinIndex = (tileSkinIndex + 1) % tileSkins.length;
      tileImg = tileSkins[tileSkinIndex].img;
      skinToastText = "Текстуры: " + tileSkins[tileSkinIndex].name;
      skinToastUntil = performance.now() + 1500;
    }
  });
  window.addEventListener("keyup", (e) => keys.delete(e.code));

  function canvasPos(e) {
    const r = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) * (canvas.width / r.width),
      y: (e.clientY - r.top) * (canvas.height / r.height),
    };
  }

  canvas.addEventListener("mousedown", (e) => {
    if (e.button !== 0 || variable !== 0) return;
    if (mousDown) return;
    mousDown = true;
    const { x, y } = canvasPos(e);

    if (pointInBounds(menuBounds(menu.start), x, y)) {
      resetGame(buildClassicMapDef());
      variable = 1;
      pl.startpos = 1;
    } else if (pointInBounds(menuBounds(menu.random), x, y)) {
      resetGame(generateRandomMapDef());
      variable = 1;
      pl.startpos = 1;
    } else if (pointInBounds(menuBounds(menu.sound), x, y)) {
      if (isPlaying === 1) {
        menu.sound.text = "Sound: On - 1";
        music1.play();
        isPlaying = 2;
      } else if (isPlaying === 2) {
        menu.sound.text = "Sound: On - 2";
        music1.pause();
        music2.play();
        isPlaying = 3;
      } else {
        menu.sound.text = "Sound: Off";
        music1.pause();
        music2.pause();
        isPlaying = 1;
      }
    } else if (pointInBounds(menuBounds(menu.quit), x, y)) {
      stopped = true;
      document.body.innerHTML = "<div style='color:white;font-family:sans-serif;padding:40px'>Игра остановлена. Закройте вкладку.</div>";
    }
  });

  canvas.addEventListener("mouseup", (e) => {
    if (e.button === 0) mousDown = false;
  });

  canvas.addEventListener("mousemove", (e) => {
    if (variable !== 0) return;
    const { x, y } = canvasPos(e);
    menu.start.color = pointInBounds(menuBounds(menu.start), x, y) ? "yellow" : "red";
    menu.random.color = pointInBounds(menuBounds(menu.random), x, y) ? "yellow" : "white";
    menu.sound.color = pointInBounds(menuBounds(menu.sound), x, y) ? "yellow" : "white";
    menu.quit.color = pointInBounds(menuBounds(menu.quit), x, y) ? "yellow" : "white";
  });

  const gameStart = performance.now();
  const enemyClockStart = performance.now();
  let gameTime = 0;
  let enTime = 0, elTime = 0;
  let lastFrame = performance.now();
  let lastSnow = performance.now();

  function drawTextOutlined(str, x, y, size, fillColor, bold) {
    ctx.font = `${bold ? "bold " : ""}${size}px COld, sans-serif`;
    ctx.textBaseline = "top";
    ctx.lineJoin = "round";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "black";
    ctx.strokeText(str, x, y);
    ctx.fillStyle = fillColor;
    ctx.fillText(str, x, y);
  }

  function renderMenu() {
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.globalAlpha = 200 / 255;
    ctx.drawImage(backImg, 0, 0, backImg.width, backImg.height, 0, 0, CANVAS_W, CANVAS_H);
    ctx.globalAlpha = 1;
    drawTextOutlined(menu.start.text, menu.start.x, menu.start.y, menuFontSize, menu.start.color, false);
    drawTextOutlined(menu.random.text, menu.random.x, menu.random.y, menuFontSize, menu.random.color, false);
    drawTextOutlined(menu.sound.text, menu.sound.x, menu.sound.y, menuFontSize, menu.sound.color, false);
    drawTextOutlined(menu.quit.text, menu.quit.x, menu.quit.y, menuFontSize, menu.quit.color, false);
  }

  function renderTiles() {
    for (let i = 0; i < H; i++) {
      const row = mapData[i];
      for (let j = 0; j < W; j++) {
        const spec = TILE_SPEC[row[j]];
        if (!spec) continue;
        drawFrame(ctx, tileImg, spec.x, spec.y, spec.w, spec.h, j * SIZ - offsetX, i * SIZ - offsetY);
      }
    }
  }

  function updateSnow(dtSeconds) {
    if (Math.random() * 100 < 5) {
      snows.push({ x: Math.random() * CANVAS_W, y: Math.random() * 30, speed: 100 });
    }
    for (const s of snows) s.y += s.speed * dtSeconds;
    snows = snows.filter((s) => s.y < 600);
  }

  function renderSnow() {
    ctx.fillStyle = "white";
    for (const s of snows) {
      ctx.beginPath();
      ctx.arc(s.x + 2, s.y + 2, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function updateGame(time) {
    if (pl.life) {
      gameTime = Math.trunc((performance.now() - gameStart) / 1000);
      const moveSpeed = pl.onGround ? PLAYER_SPEED : PLAYER_SPEED * PLAYER_AIR_CONTROL;
      if (keys.has("ArrowLeft") || keys.has("KeyA")) pl.speedX = -moveSpeed;
      if (keys.has("ArrowRight") || keys.has("KeyD")) pl.speedX = moveSpeed;
      if (keys.has("ArrowUp") || keys.has("KeyW")) {
        if (pl.onGround) { pl.speedY = PLAYER_JUMP; pl.onGround = false; }
      }
    }
    if (keys.has("Escape")) variable = 0;

    pl.update(time);
    for (const en of enemies) en.update(time, pl);

    for (let i = 0; i < enemies.length; i++) {
      const en = enemies[i];
      if (!rectsIntersect(pl.rect, en.rect) || !en.life) continue;

      if (pl.speedY > 0) {
        pl.speedY = i === 5 ? -3 : -0.4;
        en.hp -= 1;
        enTime = Math.trunc((performance.now() - enemyClockStart) / 1000);
        if (en.hp === 0) {
          en.life = false;
          en.speedX = 0;
        }
      } else if (pl.health > 0 && Math.abs(enTime - Math.trunc((performance.now() - enemyClockStart) / 1000)) >= 1) {
        if (Math.abs(elTime - Math.trunc((performance.now() - enemyClockStart) / 1000)) >= 1) {
          pl.health--;
          elTime = Math.trunc((performance.now() - enemyClockStart) / 1000);
          if (pl.health > 0) {
            if (pl.niz === 1) pl.rect.left -= 120;
            else pl.rect.left += 120;
          }
        }
      }
    }

    if (pl.rect.left > 600) offsetX = pl.rect.left - 600;
    if (pl.rect.top > 200) offsetY = pl.rect.top - 400;
  }

  function bulletWord(count) {
    let slov = count;
    if (slov === 11 || slov === 12 || slov === 13 || slov === 14) slov = 0;
    else slov = count % 10;
    if (slov === 1) return "пуля";
    if (slov >= 2 && slov <= 4) return "пули";
    return "пуль";
  }

  function renderGame() {
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.fillStyle = "#1c1210";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    renderTiles();
    if (isPlaying === 2 || isPlaying === 3) renderSnow();

    for (const en of enemies) {
      if (!en.life) {
        if ((performance.now() - en.deathTime) / 1000 > 20) {
          en.drawSprite = false;
        } else if (en.drawSprite) {
          drawFrame(ctx, en.image, en.frame.sx, en.frame.sy, en.frame.sw, en.frame.sh, en.rect.left - offsetX, en.rect.top - offsetY);
        }
      } else {
        en.deathTime = performance.now();
        drawFrame(ctx, en.image, en.frame.sx, en.frame.sy, en.frame.sw, en.frame.sh, en.rect.left - offsetX, en.rect.top - offsetY);
      }
    }

    const word = bulletWord(pl.plCount);
    if (pl.pos !== 9) {
      drawTextOutlined(`${pl.plCount} - ${word}`, 1050, 0, 40, "white", false);
      drawTextOutlined(`ХВ:${pl.health}`, 0, 0, 40, "red", true);
      if (!pl.life) {
        drawTextOutlined(`Время в секундах:${gameTime}`, 300, 200, 80, "red", true);
      }
    } else {
      drawTextOutlined(" КОНЕЦ ", 450, 100, 80, "white", false);
      drawTextOutlined(`${pl.plCount} - ${word}`, 450, 200, 80, "red", true);
    }

    drawFrame(ctx, tileImg, 0, 64, SIZ, SIZ, 32 * SIZ, -8, 1.3, 1.3);
    if (pl.life) drawFrame(ctx, heroImg, 0, 300, 40, 50, 3 * SIZ, -8, 0.9, 0.9);
    else drawFrame(ctx, heroImg, 0, 184, 40, 50, 3 * SIZ, -8, 0.9, 0.9);

    drawFrame(ctx, heroImg, pl.frame.sx, pl.frame.sy, pl.frame.sw, pl.frame.sh, pl.rect.left - offsetX, pl.rect.top - offsetY);
  }

  function frame(now) {
    let time = (now - lastFrame) * 1000 / 600;
    if (time > 15) time = 15;
    const dtSnow = (now - lastSnow) / 1000;
    lastFrame = now;
    lastSnow = now;

    if (stopped) return;

    if (variable === 1) {
      updateGame(time);
      if (isPlaying === 2 || isPlaying === 3) updateSnow(dtSnow);
      renderGame();
    } else {
      renderMenu();
    }

    if (now < skinToastUntil) {
      drawTextOutlined(skinToastText, 20, CANVAS_H - 50, 28, "yellow", true);
    }

    requestAnimationFrame(frame);
  }

  requestAnimationFrame((t) => { lastFrame = t; lastSnow = t; requestAnimationFrame(frame); });
}

main();
