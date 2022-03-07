import { fromLinear, toLinear, m, minv, setAlpha } from "./utils.js";

/**
 * @typedef {number[]} xyz Components range: 0 <= x <= 95; 0 <= y <= 100; 0 <= z <= 108;
 */

/**
 * Updates a color based on XYZ values and alpha.
 * @param {color} color
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} a
 * @return {color}
 */
export function fromXYZ(color, x, y, z, a) {
  const r = x * m[0][0] + y * m[0][1] + z * m[0][2];
  const g = x * m[1][0] + y * m[1][1] + z * m[1][2];
  const b = x * m[2][0] + y * m[2][1] + z * m[2][2];

  color[0] = fromLinear(r / 100);
  color[1] = fromLinear(g / 100);
  color[2] = fromLinear(b / 100);

  return setAlpha(color, a);
}

/**
 * Returns a XYZ representation of a given color.
 * @param {color} color
 * @param {Array} out
 * @return {color}
 */
export function getXYZ([r, g, b, a], out = []) {
  const lr = toLinear(r) * 100;
  const lg = toLinear(g) * 100;
  const lb = toLinear(b) * 100;

  out[0] = lr * minv[0][0] + lg * minv[0][1] + lb * minv[0][2];
  out[1] = lr * minv[1][0] + lg * minv[1][1] + lb * minv[1][2];
  out[2] = lr * minv[2][0] + lg * minv[2][1] + lb * minv[2][2];
  return setAlpha(out, a);
}
