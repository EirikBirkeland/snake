import { getRandomInt } from './lib/util';
import { GRID_X_LENGTH, GRID_Y_LENGTH } from './util/constants';
import ScoreBoard from './lib/ScoreBoard';
import Snake from './lib/Snake';
import Square from './lib/Square';

const GRID_X_LENGTH = 20;
const GRID_Y_LENGTH = 20;

const keys = {
    w: { isPressed: false },
    s: { isPressed: false },
    a: { isPressed: false },
    d: { isPressed: false }
};

window.addEventListener("keydown", e => {
    e.preventDefault();
    keys.w.isPressed = e.which === 87;
    keys.s.isPressed = e.which === 83;
});

window.addEventListener("keyup", e => {
    e.preventDefault();
    keys.w.isPressed = e.which === 87;
    keys.s.isPressed = e.which === 83;
});

window.addEventListener("keydown", e => {
    e.preventDefault();
    keys.a.isPressed = e.which === 65;
    keys.d.isPressed = e.which === 68;
});

window.addEventListener("keyup", e => {
    e.preventDefault();
    keys.a.isPressed = e.which === 65;
    keys.d.isPressed = e.which === 68;
});

const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");

const grid = Array(GRID_X_LENGTH)
    .fill(true)
    .map((_, i) => {
        return Array(GRID_Y_LENGTH)
            .fill(true)
            .map((_, j) => new Square(i, j));
    });

let snake = new Snake(GRID_X_LENGTH / 2, GRID_Y_LENGTH / 2);
let apple = new Apple(3, 5);

const scoreBoard = new ScoreBoard();

let timer = 0;

function loop() {
    grid.forEach(a => {
        a.forEach(b => {
            b.render();
        });
    });

    // check for collisions
    if (apple && snake.X() === apple.X && snake.Y() === apple.Y) {
        // eat apple
        snake.justAte = true;
        scoreBoard.increment();
        apple = new Apple(getRandomInt(1, 19), getRandomInt(1, 19));
    }

    // check whether user is pushing keys and change snake coords accordingly
    if (keys.w.isPressed) {
        // unless snake tries to escape board
        if (!(snake.Y() - 1 < 0) && snake.direction !== "down") {
            snake.moveDebounced("up");
            keys.w.isPressed = false;
        }
    } else if (keys.s.isPressed && snake.direction !== "up") {
        if (!(snake.Y() + 1 > GRID_Y_LENGTH - 1)) {
            snake.moveDebounced("down");
            keys.s.isPressed = false;
        }
    }
    if (keys.a.isPressed && snake.direction !== "right") {
        if (!(snake.X() - 1 < 0)) {
            snake.moveDebounced("left");
            keys.a.isPressed = false;
        }
    } else if (keys.d.isPressed && snake.direction !== "left") {
        if (!(snake.X() + 1 > GRID_X_LENGTH - 1)) {
            snake.moveDebounced("right");
            keys.d.isPressed = false;
        }
    }

    // check collision with self
    const headSegment = snake.segments[0];
    const bodySegments = snake.segments.slice(1);

    bodySegments.forEach((bodySeg, index) => {
        if (headSegment.X === bodySeg.X && headSegment.Y === bodySeg.Y) {
            snake = new Snake(GRID_X_LENGTH / 2, GRID_Y_LENGTH / 2);
            scoreBoard.reset();
        }
    });

    // move snake in current direction
    if (timer >= 60 - snake.segments.length * 2) {
        timer = 0;
        switch (snake.direction) {
            case "up":
                if (!(snake.Y() - 1 < 0)) {
                    snake.move("up");
                }
                break;
            case "down":
                if (!(snake.Y() > GRID_Y_LENGTH - 2)) {
                    snake.move("down");
                }
                break;
            case "left":
                if (!(snake.X() - 1 < 0)) {
                    snake.move("left");
                }
                break;
            case "right":
                if (!(snake.X() + 1 > GRID_X_LENGTH - 1)) {
                    snake.move("right");
                }
                break;
        }
    }

    if (timer < 60)++timer;

    // render sprites
    snake.render();
    apple.render();
    scoreBoard.render();

    return window.requestAnimationFrame(loop);
}

loop();