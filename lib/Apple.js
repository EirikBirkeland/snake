export default class Apple {
    constructor(x, y) {
      this.X = x;
      this.Y = y;
    }
    render() {
      ctx.fillStyle = "red";
      ctx.strokeStyle = "black";
      ctx.strokeRect(this.X * GRID_X_LENGTH, this.Y * GRID_Y_LENGTH, 20, 20);
      ctx.fillRect(this.X * GRID_X_LENGTH, this.Y * GRID_Y_LENGTH, 20, 20);
    }
  }