import { SIZ } from "./constants.js";

export function rectsIntersect(a, b) {
  return a.left < b.left + b.width && a.left + a.width > b.left &&
         a.top < b.top + b.height && a.top + a.height > b.top;
}

export function moveWithCollision(rect, prop, delta, collideFn) {
  const maxStep = SIZ / 2;
  let remaining = delta;
  do {
    const step = Math.abs(remaining) > maxStep ? Math.sign(remaining) * maxStep : remaining;
    rect[prop] += step;
    const before = rect[prop];
    collideFn();
    remaining -= step;
    if (rect[prop] !== before) break;
  } while (remaining !== 0);
}

export function drawFrame(ctx, img, sx, sy, sw, sh, dx, dy, scaleX, scaleY) {
  scaleX = scaleX || 1; scaleY = scaleY || 1;
  let flipX = false, flipY = false, x = sx, y = sy, w = sw, h = sh;
  if (w < 0) { flipX = true; x = sx + sw; w = -w; }
  if (h < 0) { flipY = true; y = sy + sh; h = -h; }
  const dw = w * scaleX, dh = h * scaleY;
  if (!flipX && !flipY) {
    ctx.drawImage(img, x, y, w, h, dx, dy, dw, dh);
    return;
  }
  ctx.save();
  ctx.translate(dx + (flipX ? dw : 0), dy + (flipY ? dh : 0));
  ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
  ctx.drawImage(img, x, y, w, h, 0, 0, dw, dh);
  ctx.restore();
}
