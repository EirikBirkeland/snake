import { GRID_X_LENGTH, GRID_Y_LENGTH } from './constants';
import { leadingDebounce } from './util';

class SnakeSegment {
  constructor(x, y) {
    this.X = x;
    this.Y = y;
  }
}

export default class Snake {
  constructor(x, y) {
    this.length = 1;
    this.segments = [new SnakeSegment(x, y)];
    this.X = () => this.segments[0].X;
    this.Y = () => this.segments[0].Y;
    this.justAte = false;
  }

  eat() {
    this.justAte = true;
  }

  moveDebounced = leadingDebounce(this.move.bind(this), 25);

  move(moveDir) {
    console.log(moveDir);
    let y = this.Y();
    let x = this.X();

    switch (moveDir) {
      case "up":
        this.direction = "up";
        y = this.Y() - 1;
        break;
      case "down":
        this.direction = "down";
        y = this.Y() + 1;
        break;
      case "left":
        this.direction = "left";
        x = this.X() - 1;
        break;
      case "right":
        this.direction = "right";
        x = this.X() + 1;
        break;
      default:
        break;
    }

    // add 'new' head
    this.segments.unshift(new SnakeSegment(x, y));

    if (this.justAte) {
      this.justAte = false;
      return;
    }

    // remove last tail segment
    this.segments.pop();
  }

  render() {
    ctx.fillStyle = "green";
    ctx.strokeStyle = "black";

    for (let i = 0; i < this.segments.length; i++) {
      const X = this.segments[i].X;
      const Y = this.segments[i].Y;

      ctx.strokeRect(X * GRID_X_LENGTH, Y * GRID_Y_LENGTH, 20, 20);
      ctx.fillRect(X * GRID_X_LENGTH, Y * GRID_Y_LENGTH, 20, 20);
    }
  }
}