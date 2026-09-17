/**
 * Deterministic pseudo-randomness for the illustration.
 *
 * Values are rounded before they reach the DOM: an un-rounded trigonometric
 * result can differ in its last bit between the server and the browser, which
 * React reports as a hydration mismatch.
 */
export const round3 = (n: number) => Math.round(n * 1000) / 1000;

/** Stable value in [a, b) for a given index. */
export const seeded = (i: number, a: number, b: number, k = 12.9898) => {
  const n = Math.sin(i * k) * 43758.5453;
  return round3(a + (n - Math.floor(n)) * (b - a));
};

/** Rounded point on a circle — used for rose windows, clock faces and rays. */
export const onCircle = (cx: number, cy: number, r: number, angle: number) => ({
  x: round3(cx + Math.cos(angle) * r),
  y: round3(cy + Math.sin(angle) * r),
});
