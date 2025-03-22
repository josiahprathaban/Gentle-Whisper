// utils/FlowField.js
import SimplexNoise from "./SimplexNoise";
import Vector from "./Vector";

export default class FlowField {
  settings = {
    frequency: 0.2,
  };

  constructor(w, h, settings = {}) {
    this.settings = { ...this.settings, ...settings };
    this.w = w || 10;
    this.h = h || 10;
    this.time = 0;
    this.simplex = new SimplexNoise();

    this.build();
  }

  build() {
    this.cols = Math.ceil(this.w);
    this.rows = Math.ceil(this.h);

    // Prepare field
    this.field = new Array(this.cols);
    for (let x = 0; x < this.cols; x++) {
      this.field[x] = new Array(this.rows);
      for (let y = 0; y < this.rows; y++) {
        this.field[x][y] = new Vector(0, 0);
      }
    }
  }

  update(delta) {
    this.time += delta;

    const updateTime = this.time * this.settings.frequency / 1000;
    for (let x = 0; x < this.field.length; x++) {
      for (let y = 0; y < this.field[x].length; y++) {
        const angle = this.simplex.noise3D(x / 20, y / 20, updateTime) * Math.PI * 2;
        const length = this.simplex.noise3D(x / 10 + 40000, y / 10 + 40000, updateTime);

        this.field[x][y].setAngle(angle);
        this.field[x][y].setLength(length);

        // Manipulate vector (optional)
        if (typeof this.manipulateVector === 'function') {
          this.manipulateVector(this.field[x][y], x, y);
        }

        // Draw vector (optional)
        if (typeof this.onDraw === 'function') {
          this.onDraw(this.field[x][y], x, y);
        }
      }
    }
  }
}
