import { SIZ } from "./constants.js";
import { getTile, setTile } from "./map.js";
import { moveWithCollision } from "./utils.js";

export class Player {
  constructor() {
    this.speedX = 0;
    this.speedY = 0.2;
    this.rect = { left: 6 * SIZ, top: 20 * SIZ, width: 40, height: 50 };
    this.onGround = false;
    this.currentFrame = 0;
    this.life = true;
    this.plCount = 0;
    this.health = 3;
    this.niz = 0;
    this.pos = 0;
    this.startpos = 0;
    this.frame = { sx: 0, sy: 300, sw: 40, sh: 50 };
  }

  update(time) {
    if (this.pos === 1) { this.rect.top = 1326; this.pos = 2; }
    if (this.pos === 3) { this.rect.top = 2030; this.pos = 4; }
    if (this.pos === 9) { this.rect.top = 2030; this.speedX = 0; }

    moveWithCollision(this.rect, "left", this.speedX * time, () => this.collision(0));

    if (!this.onGround) this.speedY += 0.0005 * time;
    this.onGround = false;
    moveWithCollision(this.rect, "top", this.speedY * time, () => this.collision(1));
    if (this.health === 0) this.life = false;

    this.currentFrame += 0.005 * time;
    if (this.life) {
      if (this.speedX) {
        if (this.currentFrame > 6) this.currentFrame -= 6;
        if (this.speedX > 0) {
          this.frame = { sx: 40 * Math.floor(this.currentFrame), sy: 244, sw: 40, sh: 50 };
          this.niz = 1;
        }
        if (this.speedX < 0) {
          this.frame = { sx: 40 * Math.floor(this.currentFrame) + 40, sy: 244, sw: -40, sh: 50 };
          this.niz = 0;
        }
      }
      if (this.speedY === 0 && this.speedX === 0) {
        if (this.niz === 0) this.frame = { sx: 0, sy: 300, sw: 40, sh: 50 };
        else this.frame = { sx: 40, sy: 300, sw: -40, sh: 50 };
      }
      if (this.speedY) {
        if (this.speedX > 0) { this.frame = { sx: 0, sy: 360, sw: 40, sh: 50 }; this.niz = 1; }
        if (this.speedX < 0) { this.frame = { sx: 40, sy: 360, sw: -40, sh: 50 }; this.niz = 0; }
      }
    } else {
      this.frame = { sx: 0, sy: 184, sw: 40, sh: 50 };
    }
    this.speedX = 0;
  }

  collision(dir) {
    const top = this.rect.top, left = this.rect.left, w = this.rect.width, h = this.rect.height;
    const i0 = Math.floor(top / SIZ), i1 = Math.ceil((top + h) / SIZ);
    const j0 = Math.floor(left / SIZ), j1 = Math.ceil((left + w) / SIZ);
    for (let i = i0; i < i1; i++) {
      for (let j = j0; j < j1; j++) {
        let t = getTile(i, j);
        if (t === "z" || t === "k" || t === "0" || t === "r" || t === "c" || t === "C" || t === "2") {
          if (this.speedX > 0 && dir === 0) this.rect.left = j * SIZ - this.rect.width;
          if (this.speedX < 0 && dir === 0) this.rect.left = j * SIZ + SIZ;
          if (this.speedY > 0 && dir === 1) { this.rect.top = i * SIZ - this.rect.height; this.speedY = 0; this.onGround = true; }
          if (this.speedY < 0 && dir === 1) { this.rect.top = i * SIZ + SIZ; this.speedY = 0; }
        }

        t = getTile(i, j);
        if (t === "b" || t === "B") {
          if (t === "b") this.plCount += 1;
          if (t === "B") this.plCount += 3;
          setTile(i, j, " ");
        }

        t = getTile(i, j);
        if (t === "p") {
          if (this.pos === 0) this.pos = 1;
          else if (this.pos === 2) this.pos = 3;
        }

        if (!this.onGround && dir === 1) {
          t = getTile(i, j);
          if (t === "c") {
            setTile(i - 1, j, "h");
            setTile(i, j, "C");
          }
        }

        t = getTile(i, j);
        if (t === "h") {
          this.health += 1;
          setTile(i, j, " ");
        }

        t = getTile(i, j);
        if (t === "9") {
          this.pos = 9;
        }
      }
    }
  }
}
