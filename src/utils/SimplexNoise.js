// utils/SimplexNoise.js
export default class SimplexNoise {
  constructor() {
    this.perm = [];
    this.grad3 = [
      [1, 1, 0],
      [-1, 1, 0],
      [1, -1, 0],
      [-1, -1, 0],
      [1, 0, 1],
      [-1, 0, 1],
      [1, 0, -1],
      [-1, 0, -1],
      [0, 1, 1],
      [0, -1, 1],
      [0, 1, -1],
      [0, -1, -1],
    ];
    this.init();
  }

  init() {
    for (let i = 0; i < 256; i++) {
      this.perm[i] = Math.floor(Math.random() * 256);
    }
  }

  noise3D(xin, yin, zin) {
    let X = Math.floor(xin) & 255;
    let Y = Math.floor(yin) & 255;
    let Z = Math.floor(zin) & 255;

    let xf = xin - Math.floor(xin);
    let yf = yin - Math.floor(yin);
    let zf = zin - Math.floor(zin);

    let u = this.fade(xf);
    let v = this.fade(yf);
    let w = this.fade(zf);

    let A = this.perm[X] + Y;
    let AA = this.perm[A] + Z;
    let AB = this.perm[A + 1] + Z;
    let B = this.perm[X + 1] + Y;
    let BA = this.perm[B] + Z;
    let BB = this.perm[B + 1] + Z;

    let grad1 = this.grad(this.perm[AA], xf, yf, zf);
    let grad2 = this.grad(this.perm[BA], xf - 1, yf, zf);
    let grad3 = this.grad(this.perm[AB], xf, yf - 1, zf);
    let grad4 = this.grad(this.perm[BB], xf - 1, yf - 1, zf);

    let grad5 = this.grad(this.perm[AA + 1], xf, yf, zf - 1);
    let grad6 = this.grad(this.perm[BA + 1], xf - 1, yf, zf - 1);
    let grad7 = this.grad(this.perm[AB + 1], xf, yf - 1, zf - 1);
    let grad8 = this.grad(this.perm[BB + 1], xf - 1, yf - 1, zf - 1);

    let x1 = this.lerp(grad1, grad2, u);
    let x2 = this.lerp(grad3, grad4, u);
    let x3 = this.lerp(grad5, grad6, u);
    let x4 = this.lerp(grad7, grad8, u);

    let y1 = this.lerp(x1, x2, v);
    let y2 = this.lerp(x3, x4, v);

    return this.lerp(y1, y2, w);
  }

  fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  grad(hash, x, y, z) {
    let h = hash & 15;
    let u = h < 8 ? x : y;
    let v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return (h & 1 ? -u : u) + (h & 2 ? -v : v);
  }

  // Helper function for interpolation
  lerp(a, b, t) {
    return (1 - t) * a + t * b;
  }
}
