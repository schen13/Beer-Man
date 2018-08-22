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

const DIM_X = 900;
const DIM_Y = 900;

class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    this.board = new Board({
      pos: [0, 0],
      width: DIM_X,
      height: DIM_Y
    });
    this.game = new Game(this.ctx, this.board);
    document.addEventListener('keydown', this.bindKeyHandlers.bind(this));
    setInterval(() => this.step(), 20);
  }

  step() {
    this.ctx.clearRect(0, 0, DIM_X, DIM_Y);
    this.board.draw(this.ctx);
    this.game.render(this.ctx);
    this.game.moveObjects(this.board.walls);
  }

  bindKeyHandlers(e) {
    const key = e.key.toUpperCase();
    if (keyBinds[key]) {
      this.game.objects[0].turn(keyBinds[key], this.board.walls);
    }
  }
}

module.exports = GameView;