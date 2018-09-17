const Board = require('./board');
const Game = require('./game');

const keyBinds = {
  "W": [0, -1],
  "A": [-1, 0],
  "S": [0, 1],
  "D": [1, 0],
  "ARROWUP": [0, -1],
  "ARROWLEFT": [-1, 0],
  "ARROWDOWN": [0, 1],
  "ARROWRIGHT": [1, 0]
};

const BOARD_X = 805;
const CANVAS_X = 1000;
const CANVAS_Y = 805;

class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    this.board = new Board({
      pos: [0, 0],
      width: BOARD_X,
      height: CANVAS_Y
    });
    this.game = new Game(this.ctx, this.board);
    this.isPaused = false;
    this.restartBuffer = 0;
    this.restarted = false;
    document.addEventListener('keydown', this.bindKeyHandlers.bind(this));
    this.start();
  }

  start() {
    setTimeout(() => {
      this.intervalID = setInterval(() => this.step(), 20);
    }, 1000);
    this.game.resetChars();
    if (this.restarted) {
      this.board.resetBoard();
      this.game.resetGame();
      this.restarted = false;
    }
    this.game.render(this.ctx);
    this.showText();
    this.showIntro();
  }

  step() {
    this.ctx.clearRect(0, 0, CANVAS_X, CANVAS_Y);
    this.showText();
    this.game.render(this.ctx);
    if (this.game.gameOver) {
      this.resetView();
      setTimeout(() => this.showEndScreen(), 2000);
    } else if (this.game.won) {
      this.resetView();
      setTimeout(() => this.showEndScreen(), 200);
    } else if (this.game.lostLife) {
      this.resetView();
      setTimeout(() => this.start(), 1500);
    }
    this.game.moveChars(this.board.walls);
    this.restartBuffer += 1; // prevent multiple restart presses and avoid asynchronicity issues
  }

  bindKeyHandlers(e) {
    const key = e.key.toUpperCase();
    if (key === " ") {
      if (this.isPaused) {
        this.isPaused = false;
        this.intervalID = setInterval(() => this.step(), 20);

      } else if (this.restartBuffer > 0) {
        window.clearInterval(this.intervalID);
        this.isPaused = true;
      }
      this.restartBuffer = 0;
    }
    if (keyBinds[key]) {
      this.game.chars[0].turn(keyBinds[key], this.board.walls);
    }
    if (key === "Y" && !this.game.chars[0].dying && (this.restartBuffer > 0 || this.isPaused)) {
      this.resetView();
      this.ctx.clearRect(0, 0, CANVAS_X, CANVAS_Y);
      this.restarted = true;
      this.restartBuffer = 0;
      this.start();
    }
  }

  resetView() {
    window.clearInterval(this.intervalID);
    this.game.lostLife = false;
    this.restartBuffer = -1;
  }

  showText() {
    this.showScore();
    this.showLives();
    this.showRestart();
    this.showPause();
  }

  showIntro() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(407, 435, 80, 15);
    this.ctx.fillStyle = "white";
    this.ctx.font = "36px monospace";
    this.ctx.textAlign = "center";
    this.ctx.fillText("READY?", 407, 435);
  }

  showPause() {
    const text = "Spacebar to";
    const text2 = "pause/resume";
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(805, 750, 50, 40);
    this.ctx.fillStyle = "white";
    this.ctx.font = "18px monospace";
    this.ctx.textAlign = "left";
    this.ctx.fillText(text, 820, 760, 130);
    this.ctx.fillText(text2, 820, 780, 130);
  }

  showRestart() {
    const text = "Press Y";
    const text2 = "to restart";
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(805, 750, 50, 40);
    this.ctx.fillStyle = "white";
    this.ctx.font = "18px monospace";
    this.ctx.textAlign = "left";
    this.ctx.fillText(text, 820, 700, 130);
    this.ctx.fillText(text2, 820, 720, 130);
  }

  showLives() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(870, 450, 200, 25);
    this.ctx.fillStyle = "white";
    this.ctx.font = "22px monospace";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Lives: " + parseInt(this.game.lives), 885, 450);
  }

  showScore() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(870, 420, 150, 25);
    this.ctx.fillStyle = "white";
    this.ctx.font = "22px monospace";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Score: " + parseInt(this.game.score), 885, 420);
  }

  showEndScreen() {
    this.game.chars[0].dying = false;
    this.ctx.clearRect(0, 0, 1000, CANVAS_Y);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(400, 430, 80, 15);
    this.ctx.fillStyle = "white";
    this.ctx.font = "36px monospace";
    this.ctx.textAlign = "center";

    const text = this.game.gameOver ? "You Lose..." : "You Won!";
    this.ctx.fillText(text, 400, 430);
    setTimeout(() => {
      this.ctx.clearRect(0, 0, 1000, CANVAS_Y);
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(400, 430, 80, 15);
      this.ctx.fillStyle = "white";
      this.ctx.font = "36px monospace";
      this.ctx.textAlign = "center";
      this.ctx.fillText("Play Again? (Press Y)", 400, 430);
      setTimeout(() => {
        this.restartBuffer += 1;
      }, 50);
    }, 2000);
  }
}
//  Code from https://www.html5rocks.com/en/tutorials/webaudio/intro/js/buffer-loader.js


module.exports = GameView;