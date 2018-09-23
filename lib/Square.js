export default class Square {
    constructor(X, Y) {
        this.X = X;
        this.Y = Y;
        this.width = 20;
        this.height = 20;
    }
    render() {
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.strokeRect(this.X * GRID_X_LENGTH, this.Y * GRID_Y_LENGTH, 20, 20);
        ctx.fillRect(this.X * GRID_X_LENGTH, this.Y * GRID_Y_LENGTH, 20, 20);
    }
}