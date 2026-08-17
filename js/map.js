import { H, W, SIZ } from "./constants.js";

export const RAW_MAP =["000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","ZzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzZ","z                                        KKK                                                                                                        z0","z                                        KKK                                                                                                   B    z0","z                     BBb                kKK                                                                                                  kk    z0","z                     kkkkkkkkkkkkkkkkkkkkkk                                                kk kk                                                   z0","z                  kk                                                                              kk                                               z0","z          kkk                                   kkkkkkkk                             kk                 rrrr                                       z0","z                                                                                                          rr                             kk        z0","z                                                                                                          rr   cc                                  z0","z                                                                                                          rr                        kk             z0","zkkk                w                                  w                   w                               rr                                       z0","z                                      w                                       kk                          rr              cc                       z0","z                                                                             k  kk                        rr     kk                                z0","z                      c                                            rr        k                w           rr                                       z0","z B                                                               rrrrrrr                                  rr        zzzzzzzzzzzzzzzzzz             z0","zzzzzzzzzzzz                                                      rr   rr                                  rr        zz              zz             z0","z           z        b   b           ckckkk                                                                rr        zzbbb           zz             z0","z           z   c    kckck                                                                                 rrrr      zzzzz           zz     cc      z0","z           z                         e                             rr                               V     rr        zz              zz             z0","z                                                e                rrrrrr          e                  p     rr        zz              zz             z0","z  s                           bb b            b bb       b       rrrrrrr              rr                  rr  rr    zz Bbbbb     BB zz        BB   z0","zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz   zzzzzzzzzzzzzzzzzzzzz","zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz   zzzzzzzzzzzzzzzzzzzzz","zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz   zzzzzzzzzzzzzzzzzzzzz","z                                                                                                                                                   z0","z                                                                                                                                                   z0","z                                                                                                                                                   z0","z                      BBb                                                                                                                          z0","z                     kkkkk                                                   w                                                                     z0","z                                                                                                                                                   z0","z           w                                                                                                 w                                     z0","z                               kk       kk         kk                                                                                              z0","z                                                     k                                                                                             z0","z                                                               2                                                                                   z0","z                                                               1                                                                                   z0","z                                                                    2                                                     w                        z0","z                                                               1    1                                                                              z0","z                                                                          2                                                                        z0","z        V                                                      1    1     1                                                                        z0","z                                  E                  E                          2                 E           E                                    z0","z        p                                                      1    1     1     1                   P                                              z0","z                                                               B          b          r                                     z      z                z0","zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz","zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz","z                                                                                                                                                   z0","z                                                                                                                                                   z0","z                                                                                                                                                   z0","z                                                                                                                                                   z0","z                                                                                                                                                   z0","z                                                                                                                                                   z0","z                                                                                                             w                                     z0","z                                                                                                                                                   z0","z                                                                                                                                                   z0","z                                                                                                                                                   z0","z                               w                                                                                                                   z0","z                                                                                             w                                                     z0","z                                                                                                                                                   z0","z                                                                                                                                                   z0","z                                       w                                                                                                           z0","z                                                                        BB                                                                         z0","z                                                11       11             11                                                        kkkkk            z0","z                              e                                           e                                           e           2   2            z0","z           P                                    11       11             11                                                        1 9 1            z0","z                 U                   bbbb      U                         BB             B        r        bbb                                      z0","zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz","zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"];

export const TILE_SPEC = {
  "k": { x: 0, y: 0, w: 32, h: 32 },
  "z": { x: 96, y: 0, w: 32, h: 32 },
  "c": { x: 64, y: 0, w: 32, h: 32 },
  "r": { x: 32, y: 0, w: 32, h: 32 },
  "w": { x: 0, y: 32, w: 64, h: 32 },
  "s": { x: 64, y: 32, w: 64, h: 32 },
  "b": { x: 0, y: 64, w: 32, h: 32 },
  "B": { x: 96, y: 128, w: 32, h: 32 },
  "C": { x: 32, y: 64, w: 32, h: 32 },
  "h": { x: 64, y: 64, w: 32, h: 32 },
  "p": { x: 64, y: 96, w: 32, h: 64 },
  "V": { x: 0, y: 96, w: 32, h: 32 },
  "e": { x: 0, y: 128, w: 32, h: 32 },
  "E": { x: 32, y: 128, w: -32, h: 32 },
  "1": { x: 32, y: 96, w: 32, h: 64 },
  "2": { x: 96, y: 64, w: 32, h: 32 },
  "P": { x: 64, y: 96, w: 32, h: 64 },
  "9": { x: 64, y: 160, w: 32, h: 64 },
  "U": { x: 128, y: 96, w: -32, h: 32 },
};

export let mapData = RAW_MAP.map((row) => row.split(""));

export function setMapData(grid) {
  mapData = grid;
}

export function getTile(i, j) {
  if (i < 0 || i >= H || j < 0 || j >= W) return " ";
  return mapData[i][j];
}

export function setTile(i, j, ch) {
  if (i < 0 || i >= H || j < 0 || j >= W) return;
  mapData[i][j] = ch;
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const FORBIDDEN_COLUMNS = new Set([60, 68, 69, 70, 71, 72, 73, 74, 75, 90, 91]);

function pickColumn(prev, min, max, used) {
  for (;;) {
    const a = randInt(min, max);
    if (prev !== 0 && (a === prev || used.includes(a))) continue;
    if (FORBIDDEN_COLUMNS.has(a)) continue;
    return a;
  }
}

export function buildClassicMapDef() {
  const grid = RAW_MAP.map((row) => row.split(""));

  const picked = [];
  let prevPick = 0;
  while (picked.length < 20) {
    const r = pickColumn(prevPick, 18, 85, picked);
    prevPick = r;
    picked.push(r);
  }

  const enemySpecs = [
    { x: picked[0] * SIZ, y: 21 * SIZ, sizeX: SIZ, sizeY: SIZ, hp: 1, tex: "ene" },
    { x: picked[1] * SIZ, y: 21 * SIZ, sizeX: SIZ, sizeY: SIZ, hp: 1, tex: "ene" },
    { x: picked[2] * SIZ, y: 21 * SIZ, sizeX: SIZ, sizeY: SIZ, hp: 1, tex: "ene" },
    { x: picked[3] * SIZ, y: 42 * SIZ, sizeX: SIZ, sizeY: SIZ, hp: 2, tex: "ene" },
    { x: picked[4] * SIZ, y: 42 * SIZ, sizeX: SIZ, sizeY: SIZ, hp: 2, tex: "ene" },
    { x: 130 * SIZ, y: 42 * SIZ, sizeX: SIZ, sizeY: SIZ, hp: 10, tex: "ene" },
    { x: picked[5] * SIZ, y: 41 * SIZ, sizeX: 64, sizeY: SIZ * 2, hp: 4, tex: "ene" },
    { x: picked[6] * SIZ, y: 41 * SIZ, sizeX: 64, sizeY: SIZ * 2, hp: 4, tex: "ene" },
    { x: picked[7] * SIZ, y: 63 * SIZ, sizeX: 64, sizeY: SIZ * 2, hp: 7, tex: "dimon" },
    { x: picked[8] * SIZ, y: 63 * SIZ, sizeX: 64, sizeY: SIZ * 2, hp: 7, tex: "dimon" },
    { x: picked[9] * SIZ, y: 63 * SIZ, sizeX: 64, sizeY: SIZ * 2, hp: 7, tex: "dimon" },
    { x: picked[10] * SIZ, y: 63 * SIZ, sizeX: 64, sizeY: SIZ * 2, hp: 7, tex: "dimon" },
    { x: 60 * SIZ, y: 63 * SIZ, sizeX: 64, sizeY: SIZ * 2, hp: 7, tex: "dimon" },
    { x: picked[11] * SIZ, y: 63 * SIZ, sizeX: 64, sizeY: SIZ * 2, hp: 7, tex: "dimon" },
    { x: 75 * SIZ, y: 63 * SIZ, sizeX: 64, sizeY: SIZ * 2, hp: 7, tex: "dimon" },
  ];

  return {
    grid,
    spawn: { x: 6 * SIZ, y: 20 * SIZ },
    enemySpecs,
  };
}

export function generateRandomMapDef() {
  const grid = [];
  for (let i = 0; i < H; i++) grid.push(new Array(W).fill(" "));
  for (let j = 0; j < W; j++) grid[0][j] = "0";
  for (let i = 0; i < H; i++) { grid[i][0] = "0"; grid[i][W - 1] = "0"; }

  const minGround = Math.floor(H * 0.32);
  const maxGround = H - 5;
  let groundRow = Math.floor(H * 0.62);
  const groundRowAt = new Array(W).fill(-1);

  for (let j = 1; j < W - 1; j++) {
    if (Math.random() < 0.045) {
      const step = Math.random() < 0.5 ? -1 : 1;
      groundRow = Math.max(minGround, Math.min(maxGround, groundRow + step));
    }
    groundRowAt[j] = groundRow;
    for (let i = groundRow; i < H - 1; i++) grid[i][j] = "z";
    grid[H - 1][j] = "z";
    if (Math.random() < 0.09) {
      grid[groundRow - 1][j] = Math.random() < 0.18 ? "B" : "b";
    }
  }

  const platformTarget = 10 + Math.floor(Math.random() * 5);
  const usedPlatformCols = [];
  let placed = 0;
  let attempts = 0;
  while (placed < platformTarget && attempts < 600) {
    attempts++;
    const pj = 8 + Math.floor(Math.random() * (W - 24));
    const pw = 3 + Math.floor(Math.random() * 4);
    if (groundRowAt[pj] < 0) continue;
    if (usedPlatformCols.some((c) => Math.abs(c - pj) < 14)) continue;
    const pi = groundRowAt[pj] - (6 + Math.floor(Math.random() * 8));
    if (pi < 4) continue;
    let clear = true;
    for (let k = 0; k < pw && clear; k++) {
      if (pj + k >= W - 1 || grid[pi][pj + k] !== " ") clear = false;
    }
    if (!clear) continue;
    for (let k = 0; k < pw; k++) grid[pi][pj + k] = "k";
    if (Math.random() < 0.7) grid[pi - 1][pj + Math.floor(Math.random() * pw)] = Math.random() < 0.25 ? "B" : "b";
    usedPlatformCols.push(pj + pw / 2);
    placed++;
  }

  for (let n = 0; n < 5; n++) {
    const col = 15 + Math.floor(Math.random() * (W - 30));
    if (groundRowAt[col] < 0) continue;
    const row = groundRowAt[col] - 4;
    if (row > 2 && grid[row][col] === " ") grid[row][col] = "c";
  }

  const ENEMY_TIERS = [
    { sizeX: SIZ, sizeY: SIZ, hp: 1, tex: "ene" },
    { sizeX: SIZ, sizeY: SIZ, hp: 2, tex: "ene" },
    { sizeX: 64, sizeY: SIZ * 2, hp: 4, tex: "ene" },
    { sizeX: 64, sizeY: SIZ * 2, hp: 7, tex: "dimon" },
    { sizeX: SIZ, sizeY: SIZ, hp: 3, tex: "ene" },
  ];
  const enemyCount = 15;
  const enemySpecs = [];
  const usedCols = [];
  const minCol = 10, maxCol = W - 16;
  let guard = 0;
  while (enemySpecs.length < enemyCount && guard < 4000) {
    guard++;
    const col = minCol + Math.floor(Math.random() * (maxCol - minCol));
    if (groundRowAt[col] < 0) continue;
    if (usedCols.some((c) => Math.abs(c - col) < 5)) continue;
    usedCols.push(col);
    const tier = ENEMY_TIERS[enemySpecs.length % ENEMY_TIERS.length];
    const row = groundRowAt[col];
    enemySpecs.push({
      x: col * SIZ,
      y: (row - tier.sizeY / SIZ) * SIZ,
      sizeX: tier.sizeX,
      sizeY: tier.sizeY,
      hp: tier.hp,
      tex: tier.tex,
    });
  }

  const spawnCol = 3;
  const spawnRow = groundRowAt[spawnCol] >= 0 ? groundRowAt[spawnCol] : Math.floor(H * 0.62);

  let finishCol = W - 8;
  while (finishCol > minCol && groundRowAt[finishCol] < 0) finishCol--;
  if (groundRowAt[finishCol] >= 0) {
    grid[groundRowAt[finishCol] - 1][finishCol] = "9";
  }

  return {
    grid,
    spawn: { x: spawnCol * SIZ, y: (spawnRow - 3) * SIZ },
    enemySpecs,
  };
}
