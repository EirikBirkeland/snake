export default class ScoreBoard {
  constructor() {
    this.score = 0;
  }
  increment() {
    this.score++;
  }
  decrement() {
    this.score--;
  }
  reset() {
    this.score = 0;
  }
  render() {
    ctx.font = "30px Arial";
    ctx.fillText(this.score, GRID_X_LENGTH / 2 * 10, 30);
  }
}