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
    this.game.render(this.ctx);
    this.showIntro();
    setTimeout(() => {
      this.intervalID = setInterval(() => this.step(), 20);
    }, 3000);
  }

  step() {
    this.ctx.clearRect(0, 0, 950, DIM_Y);
    this.showScore();
    this.showPause();
    this.game.render(this.ctx);
    if (this.game.gameOver) {
      window.clearInterval(this.intervalID);
      console.log("You lose.");
    } else if (this.game.won) {
      window.clearInterval(this.intervalID);
      console.log("You win!");
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
    this.ctx.fillRect(805, 460, 50, 50);
    this.ctx.fillStyle = "white";
    this.ctx.font = "18px monospace";
    this.ctx.textAlign = "left";
    this.ctx.fillText(text, 820, 450, 130);
    this.ctx.fillText(text2, 820, 480, 130);
  }

  showScore() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(875, 400, 150, 100);
    this.ctx.fillStyle = "white";
    this.ctx.font = "22px monospace";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Score: " + parseInt(this.game.score), 880, 400);
  }
}

module.exports = GameView;