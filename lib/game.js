const Beerman = require('./beerman');
const Ghost = require('./ghost');
const DEFAULTS = {
  bmanVel: 5,
  ghostVel: 2.5,
  gridSize: 50,
  wallSize: 5,
  lives: 2,
  bmanDir: [1, 0],
  ghostDir: [-1, 0]
};

class Game {

  constructor(ctx, board) {
    this.defaultCharPos = [[400, 450], [300, 300], [350, 300], [400, 300], [450, 300]];
    const beerman = new Beerman({ pos: this.defaultCharPos[0], color: "#FFFF00", board });
    const blinky = new Ghost({ pos: this.defaultCharPos[1], color: "#FF0000", board, beerman, name: "blinky" });
    const pinky = new Ghost({ pos: this.defaultCharPos[2], color: "#FF69B4", board, beerman, name: "pinky" });
    const inky = new Ghost({ pos: this.defaultCharPos[3], color: "#00FFFF", board, beerman, name: "inky", blinky: blinky });
    const clyde = new Ghost({ pos: this.defaultCharPos[4], color: "#FFA500", board, beerman, name: "clyde" });
    this.ctx = ctx;
    this.board = board;
    this.chars = [beerman, blinky, pinky, inky, clyde];
    this.gameOver = false;
    this.won = false;
    this.score = 0;
    this.powerTimer = 0;
    this.lives = DEFAULTS.lives;
    this.lostLife = false;
    this.render(ctx);
  }

  render(ctx) {
    this.board.render(ctx);
    const beermanPos = this.chars[0].pos;
    this.chars.forEach((char, idx) => {
      char.render(ctx);
      if (idx >= 1 && this.checkCollision(char.pos, beermanPos)) {
        if (this.chars[0].poweredUp) {
          char.die(ctx);
          this.score += 1000;
        } else {
          this.lives -= 1;
          this.chars[0].die(ctx);
          this.lostLife = true;
        }
      }
    });
    this.won = this.board.isEmpty();
    this.gameOver = (this.lives === 0);
  }

  checkCollision(pos1, pos2) {
    return ((Math.abs(pos1[0] - pos2[0]) <= 2.5) && Math.abs(pos1[1] - pos2[1]) <= 2.5);
  }

  moveChars(walls, tiles) {
    this.chars.forEach((char, idx) => {
      if (idx === 0) {
        this.bmanDrink();
      }
      char.move(walls, tiles);
    });
  }

  bmanDrink() {
    const bman = this.chars[0];
    if (bman.pos[0] % DEFAULTS.gridSize === 0 && bman.pos[0] % DEFAULTS.gridSize === 0) {
      const row = Math.floor(bman.pos[1] / DEFAULTS.gridSize);
      const col = Math.floor(bman.pos[0] / DEFAULTS.gridSize);
      if (this.board.drinkLocations[row][col] === 1) {
        this.board.removeDrink(Math.floor(bman.pos[1] / DEFAULTS.gridSize), Math.floor(bman.pos[0] / DEFAULTS.gridSize));
        bman.numBeers += 1;
        bman.vel = DEFAULTS.bmanVel * Math.pow((1 / 2), (Math.floor(bman.numBeers / 25)));
        if (bman.vel !== DEFAULTS.bmanVel) {
          bman.color = "green";
        }
        this.score += 100;
      } else if (this.board.drinkLocations[row][col] === 2) {
        this.board.removeDrink(Math.floor(bman.pos[1] / DEFAULTS.gridSize), Math.floor(bman.pos[0] / DEFAULTS.gridSize));
        bman.pos = [Math.floor(bman.pos[0] / DEFAULTS.wallSize) * DEFAULTS.wallSize, Math.floor(bman.pos[1] / DEFAULTS.wallSize) * DEFAULTS.wallSize];
        bman.numBeers = 0;
        bman.vel = DEFAULTS.bmanVel;
        bman.color = "yellow";
        bman.poweredUp = true;
        window.clearTimeout(this.powerTimer);
        this.powerTimer = setTimeout(() => {
          bman.poweredUp = false;
        }, 7000);
        this.score += 500;
      }
    }
  }

  resetChars() {
    this.chars[0].openMouth = true;
    this.chars[0].dying = false;
    this.chars.forEach((char, idx) => {
      char.pos = this.defaultCharPos[idx];
      if (idx === 0) {
        char.dir = DEFAULTS.bmanDir;
        char.vel = DEFAULTS.bmanVel;
        char.numBeers = 0;
      } else {
        char.dir = DEFAULTS.ghostDir;
        char.vel = DEFAULTS.ghostVel;
        char.isDead = false;
      }
    });
  }

  resetGame() {
    this.resetChars();
    this.score = 0;
    this.lives = DEFAULTS.lives;
    this.gameOver = false;
    this.won = false;
  }
}

module.exports = Game;