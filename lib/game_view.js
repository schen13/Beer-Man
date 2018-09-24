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

const BOARD_X = 645;
const CANVAS_X = 800;
const CANVAS_Y = 645;

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
    this.ctx.fillRect(325, 345, 60, 15);
    this.ctx.fillStyle = "white";
    this.ctx.font = "30px monospace";
    this.ctx.textAlign = "center";
    this.ctx.fillText("READY?", 325, 350);
  }

  showPause() {
    const text = "Spacebar to";
    const text2 = "pause/resume";
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(650, 600, 50, 40);
    this.ctx.fillStyle = "white";
    this.ctx.font = "16px monospace";
    this.ctx.textAlign = "left";
    this.ctx.fillText(text, 660, 620, 130);
    this.ctx.fillText(text2, 660, 640, 130);
  }

  showRestart() {
    const text = "Press Y";
    const text2 = "to restart";
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(650, 560, 50, 40);
    this.ctx.fillStyle = "white";
    this.ctx.font = "16px monospace";
    this.ctx.textAlign = "left";
    this.ctx.fillText(text, 660, 560, 130);
    this.ctx.fillText(text2, 660, 580, 130);
  }

  showLives() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(660, 365, 200, 25);
    this.ctx.fillStyle = "white";
    this.ctx.font = "18px monospace";
    this.ctx.textAlign = "left";
    this.ctx.fillText("Lives: " + parseInt(this.game.lives), 660, 365);
  }

  showScore() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(660, 330, 150, 25);
    this.ctx.fillStyle = "white";
    this.ctx.font = "18px monospace";
    this.ctx.textAlign = "left";
    this.ctx.fillText("Score: " + parseInt(this.game.score), 660, 330);
  }

  showEndScreen() {
    this.game.chars[0].dying = false;
    this.ctx.clearRect(0, 0, 1000, CANVAS_Y);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(320, 350, 80, 15);
    this.ctx.fillStyle = "white";
    this.ctx.font = "32px monospace";
    this.ctx.textAlign = "center";

    const text = this.game.gameOver ? "You Lose..." : "You Won!";
    const score = `Score: ${this.game.score}`;
    this.ctx.fillText(text, 320, 320);
    this.ctx.fillText(score, 320, 380);
    setTimeout(() => {
      this.ctx.clearRect(0, 0, 1000, CANVAS_Y);
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(320, 350, 80, 15);
      this.ctx.fillStyle = "white";
      this.ctx.font = "32px monospace";
      this.ctx.textAlign = "center";
      this.ctx.fillText("Play Again? (Press Y)", 320, 350);
      setTimeout(() => {
        this.restartBuffer += 1;
      }, 50);
    }, 2000);
  }
}


module.exports = GameView;