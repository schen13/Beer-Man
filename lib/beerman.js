const MovingObject = require('./moving_object');

const DEFAULTS = {
  dir: [1, 0],
  vel: 5,
  radius: 18,
  gridSize: 50
};

class Beerman extends MovingObject {
  constructor(options) {
    options.dir = DEFAULTS.dir;
    options.vel = DEFAULTS.vel;
    options.radius = DEFAULTS.radius;
    super(options);
    this.board = options.board;
    this.numBeers = 0;
  }

  drink() {
    if (this.pos[0] % DEFAULTS.gridSize === 0 && this.pos[0] % DEFAULTS.gridSize === 0) {
      const row = Math.floor(this.pos[1] / DEFAULTS.gridSize);
      const col = Math.floor(this.pos[0] / DEFAULTS.gridSize);
      if (this.board.drinkLocations[row][col] === 1) {
        this.board.removeDrink(Math.floor(this.pos[1] / DEFAULTS.gridSize), Math.floor(this.pos[0] / DEFAULTS.gridSize));
        this.numBeers += 1;
        this.vel = DEFAULTS.vel * Math.pow((1 / 2), (Math.floor(this.numBeers / DEFAULTS.gridSize)));
      } else if (this.board.drinkLocations[row][col] === 2) {
        this.board.removeDrink(Math.floor(this.pos[1] / DEFAULTS.gridSize), Math.floor(this.pos[0] / DEFAULTS.gridSize));
        console.log(this.pos);
        this.pos = [Math.floor(this.pos[0] / 5) * 5, Math.floor(this.pos[1] / 5) * 5];
        console.log(this.pos);
        this.numBeers = 0;
        this.vel = DEFAULTS.vel;
      }
    }
  }
}

module.exports = Beerman;