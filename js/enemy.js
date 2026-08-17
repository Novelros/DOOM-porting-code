import { SIZ, ENEMY_SPEED_MULT, HOPPER_JUMP } from "./constants.js";
import { getTile } from "./map.js";
import { moveWithCollision } from "./utils.js";

export class Enemy {
  set(image, x, y, sizeX, sizeY, hp) {
    this.image = image;
    this.rect = { left: x, top: y, width: sizeX, height: sizeY };
    this.speedX = (sizeX === 64 ? 0.095 : 0.075) * ENEMY_SPEED_MULT;
    this.currentFrame = 0;
    this.life = true;
    this.hp = hp;
    this.t = hp;
    this.sizeX = sizeX;
    this.drawSprite = true;
    this.deathTime = performance.now();
    this.frame = { sx: 0, sy: 0, sw: SIZ, sh: SIZ };

    this.baseSpeed = this.speedX;
    this.wanderTimer = 0;

    this.speedYv = 0;
    this.onGroundE = false;
    this.nextLeapAt = 0;

    this.dashUntil = 0;
    this.nextDashAt = 0;
    this.dashDir = 1;
  }

  update(time, player) {
    const isHopper = this.sizeX === 64 && this.t === 4;
    const isDimon = this.sizeX === 64 && this.t === 7;

    if (this.life) {
      if (isHopper) this.horizontalHopper(time, player);
      else if (isDimon) this.horizontalDimon(time, player);
      else moveWithCollision(this.rect, "left", this.speedX * time, () => this.collision())
      if (!this.onGroundE) this.speedYv += 0.0005 * time;
      this.onGroundE = false;
      moveWithCollision(this.rect, "top", this.speedYv * time, () => this.collisionV());
    }
    this.currentFrame += time * 0.005;

    if (this.sizeX === 32) {
      if (this.currentFrame > 2) this.currentFrame -= 2;
      this.frame = { sx: 32 * Math.floor(this.currentFrame), sy: 0, sw: SIZ, sh: SIZ };
      if (!this.life) this.frame = { sx: 96, sy: 0, sw: SIZ, sh: SIZ };
    }
    if (this.sizeX === 64 && this.t === 4) {
      if (this.currentFrame > 2) this.currentFrame -= 2;
      this.frame = { sx: 64 * Math.floor(this.currentFrame), sy: 32, sw: SIZ * 2, sh: SIZ * 2 };
      if (!this.life) this.frame = { sx: 192, sy: 32, sw: 64, sh: 64 };
    }
    if (this.sizeX === 64 && this.t === 7) {
      if (this.currentFrame > 4) this.currentFrame -= 4;
      if (this.speedX > 0) this.frame = { sx: 64 * Math.floor(this.currentFrame) + 64, sy: 0, sw: -SIZ * 2, sh: SIZ * 2 };
      if (this.speedX < 0) this.frame = { sx: 64 * Math.floor(this.currentFrame), sy: 0, sw: SIZ * 2, sh: SIZ * 2 };
      if (!this.life) this.frame = { sx: 0, sy: 64, sw: 64, sh: 64 };
    }
  }


  horizontalHopper(time, player) {
    let detected = false;
    const baseMag = Math.abs(this.baseSpeed);

    if (player.life) {
      const dx = (player.rect.left + player.rect.width / 2) - (this.rect.left + this.rect.width / 2);
      detected = Math.abs(dx) < 360 && Math.abs(player.rect.top - this.rect.top) < 220;
      if (detected) {
        const wantDir = dx >= 0 ? 1 : -1;
        this.speedX = baseMag * 1.5 * wantDir;
      } else {
        this.wanderTimer -= time;
        if (this.wanderTimer <= 0) {
          this.wanderTimer = 400 + Math.random() * 500;
          if (Math.random() < 0.35) this.speedX *= -1;
        }
        const dir = this.speedX >= 0 ? 1 : -1;
        this.speedX = baseMag * dir;
      }
    }

    const speedBefore = this.speedX;
    moveWithCollision(this.rect, "left", this.speedX * time, () => this.collisionH());
    const hitWall = speedBefore !== 0 && Math.sign(this.speedX) !== Math.sign(speedBefore);

    const now = performance.now();
    const wantsChaseLeap = detected && this.onGroundE && now >= this.nextLeapAt;
    if (this.onGroundE && (hitWall || wantsChaseLeap)) {
      this.speedYv = HOPPER_JUMP;
      this.onGroundE = false;
      if (wantsChaseLeap) {
        const dir = this.speedX >= 0 ? 1 : -1;
        this.speedX = baseMag * 2.4 * dir;
        this.nextLeapAt = now + 500 + Math.random() * 300;
      }
    }
  }


  horizontalDimon(time, player) {
    const baseMag = Math.abs(this.baseSpeed);
    const now = performance.now();

    if (player.life) {
      const dx = (player.rect.left + player.rect.width / 2) - (this.rect.left + this.rect.width / 2);
      const detected = Math.abs(dx) < 420 && Math.abs(player.rect.top - this.rect.top) < 220;

      if (now >= this.dashUntil && detected && now >= this.nextDashAt) {
        this.dashDir = dx >= 0 ? 1 : -1;
        this.dashUntil = now + 300 + Math.random() * 200;
        this.nextDashAt = now + 1200 + Math.random() * 1400;
      }

      if (now < this.dashUntil) {
        this.speedX = baseMag * 4 * this.dashDir;
      } else if (detected) {
        const wantDir = dx >= 0 ? 1 : -1;
        this.speedX = baseMag * wantDir;
      } else {
        const dir = this.speedX >= 0 ? 1 : -1;
        this.speedX = baseMag * dir;
      }
    }

    moveWithCollision(this.rect, "left", this.speedX * time, () => this.collision());
  }

  collision() {
    const i0 = Math.floor(this.rect.top / 32), i1 = Math.ceil((this.rect.top + this.rect.height) / 32);
    const j0 = Math.floor(this.rect.left / 32), j1 = Math.ceil((this.rect.left + this.rect.width) / 32);
    for (let i = i0; i < i1; i++) {
      for (let j = j0; j < j1; j++) {
        const t = getTile(i, j);
        if (t === "z" || t === "0" || t === "r") {
          if (this.speedX > 0) { this.rect.left = j * 32 - this.rect.width; this.speedX *= -1; }
          else if (this.speedX < 0) { this.rect.left = j * 32 + 32; this.speedX *= -1; }
        }
      }
    }
  }
  

  collisionH() {
    this.collision();
  }


  collisionV() {
    const i0 = Math.floor(this.rect.top / 32), i1 = Math.ceil((this.rect.top + this.rect.height) / 32);
    const j0 = Math.floor(this.rect.left / 32), j1 = Math.ceil((this.rect.left + this.rect.width) / 32);
    for (let i = i0; i < i1; i++) {
      for (let j = j0; j < j1; j++) {
        const t = getTile(i, j);
        if (t === "z" || t === "k" || t === "0" || t === "r" || t === "c" || t === "C" || t === "2") {
          if (this.speedYv > 0) { this.rect.top = i * 32 - this.rect.height; this.speedYv = 0; this.onGroundE = true; }
          if (this.speedYv < 0) { this.rect.top = i * 32 + 32; this.speedYv = 0; }
        }
      }
    }
  }
}
