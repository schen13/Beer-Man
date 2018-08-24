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

const DIM_X = 805;
const DIM_Y = 805;

class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    this.board = new Board({
      pos: [0, 0],
      width: DIM_X,
      height: DIM_Y
    });
    this.isPaused = false;
    this.game = new Game(this.ctx, this.board);
    document.addEventListener('keydown', this.bindKeyHandlers.bind(this));
    this.start();
  }

  start() {
    this.game.render(this.ctx);
    this.showIntro();
    setTimeout(() => {
      this.intervalID = setInterval(() => this.step(), 20);
    }, 3000);
  }

  step() {
    this.ctx.clearRect(0, 0, 1000, DIM_Y);
    this.showScore();
    this.showLives();
    // this.showRestart();
    this.showPause();
    this.game.render(this.ctx);
    if (this.game.gameOver) {
      window.clearInterval(this.intervalID);
      setTimeout(() => this.showEndScreen(), 2000);
    } else if (this.game.won) {
      window.clearInterval(this.intervalID);
      setTimeout(() => this.showEndScreen(), 200);
    } else if (this.game.lostLife) {
      window.clearInterval(this.intervalID);
      this.game.lostLife = false;
      this.game.resetCharPos();
      setTimeout(() => this.start(), 1500);
    }
    this.game.moveChars(this.board.walls, this.board.tiles);
  }

  bindKeyHandlers(e) {
    const key = e.key.toUpperCase();
    if (key === " ") {
      if (this.isPaused) {
        this.isPaused = false;
        this.intervalID = setInterval(() => this.step(), 20);

      } else {
        window.clearInterval(this.intervalID);
        this.isPaused = true;
      }
    }
    if (keyBinds[key]) {
      this.game.chars[0].turn(keyBinds[key], this.board.walls);
    }
    // if (key === "Y") {
    //   if (this.game.gameOver || this.game.won) {
    //     this.board = new Board({
    //       pos: [0, 0],
    //       width: DIM_X,
    //       height: DIM_Y
    //     });
    //     this.game = new Game(this.ctx, this.board);
    //   } else {
    //     window.clearInterval(this.intervalID);
    //   }
    //   this.ctx.clearRect(0, 0, 1000, DIM_Y);
    //   this.start();
    // }
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
    this.ctx.fillRect(805, 700, 50, 40);
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
    this.ctx.fillRect(875, 450, 200, 25);
    this.ctx.fillStyle = "white";
    this.ctx.font = "22px monospace";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Lives: " + parseInt(this.game.lives), 880, 450);
  }

  showScore() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(875, 420, 150, 25);
    this.ctx.fillStyle = "white";
    this.ctx.font = "22px monospace";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Score: " + parseInt(this.game.score), 880, 420);
  }

  showEndScreen() {
    this.ctx.clearRect(0, 0, 1000, DIM_Y);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(400, 430, 80, 15);
    this.ctx.fillStyle = "white";
    this.ctx.font = "36px monospace";
    this.ctx.textAlign = "center";

    const text = this.game.gameOver ? "You Lose..." : "You Won!";
    this.ctx.fillText(text, 400, 430);
    // setTimeout(() => {
    //   this.ctx.clearRect(0, 0, 1000, DIM_Y);
    //   this.ctx.fillStyle = "black";
    //   this.ctx.fillRect(400, 430, 80, 15);
    //   this.ctx.fillStyle = "white";
    //   this.ctx.font = "36px monospace";
    //   this.ctx.textAlign = "center";
    //   this.ctx.fillText("Play Again? (Press Y)", 400, 430);
    // }, 2000);
  }
}

module.exports = GameView;