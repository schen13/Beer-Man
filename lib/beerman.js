const MovingObject = require('./moving_object');

const DEFAULTS = {
  pos: [400, 450],
  dir: [1, 0],
  vel: 5,
  radius: 18,
  gridSize: 50,
  wallSize: 5
};

class Beerman extends MovingObject {
  constructor(options) {
    options.pos = DEFAULTS.pos;
    options.dir = DEFAULTS.dir;
    options.vel = DEFAULTS.vel;
    options.radius = DEFAULTS.radius;
    super(options);
    this.numBeers = 0;
    this.openMouth = true;
    this.poweredUp = false;
    this.numSteps = 0;
    this.drawState = this.drawState.bind(this);
    this.score = 0;
  }

  drink() {
    if (this.pos[0] % DEFAULTS.gridSize === 0 && this.pos[0] % DEFAULTS.gridSize === 0) {
      const row = Math.floor(this.pos[1] / DEFAULTS.gridSize);
      const col = Math.floor(this.pos[0] / DEFAULTS.gridSize);
      if (this.board.drinkLocations[row][col] === 1) {
        this.board.removeDrink(Math.floor(this.pos[1] / DEFAULTS.gridSize), Math.floor(this.pos[0] / DEFAULTS.gridSize));
        this.numBeers += 1;
        this.score += 100;
        this.vel = DEFAULTS.vel * Math.pow((1 / 2), (Math.floor(this.numBeers / (DEFAULTS.gridSize / 2))));
        if (this.vel !== DEFAULTS.vel) {
          this.color = "green";
        }
      } else if (this.board.drinkLocations[row][col] === 2) {
        this.board.removeDrink(Math.floor(this.pos[1] / DEFAULTS.gridSize), Math.floor(this.pos[0] / DEFAULTS.gridSize));
        this.pos = [Math.floor(this.pos[0] / DEFAULTS.wallSize) * DEFAULTS.wallSize, Math.floor(this.pos[1] / DEFAULTS.wallSize) * DEFAULTS.wallSize];
        this.numBeers = 0;
        this.vel = DEFAULTS.vel;
        this.color = "yellow";
        this.poweredUp = true;
        this.score += 500;
        setTimeout(() => {
          this.poweredUp = false;
        }, 10000);
      }
    }
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    const centerPos = [this.pos[0] + DEFAULTS.gridSize / 2 + DEFAULTS.wallSize / 2, this.pos[1] + DEFAULTS.gridSize / 2 + DEFAULTS.wallSize / 2];
    if (this.openMouth) {
      if (this.dir[0] === -1 && this.dir[1] === 0) {
        ctx.arc(centerPos[0], centerPos[1], this.radius, 2 * Math.PI - Math.PI * 7 / 9, 2 * Math.PI - Math.PI * 11 / 9);
      } else if (this.dir[0] === 0 && this.dir[1] === -1) {
        ctx.arc(centerPos[0], centerPos[1], this.radius, 2 * Math.PI - Math.PI * 2 / 9, 2 * Math.PI - Math.PI * 7 / 9);
      } else if (this.dir[0] === 1 && this.dir[1] === 0) {
        ctx.arc(centerPos[0], centerPos[1], this.radius, 2 * Math.PI - Math.PI * 16 / 9, 2 * Math.PI - Math.PI * 2 / 9);
      } else if (this.dir[0] === 0 && this.dir[1] === 1) {
        ctx.arc(centerPos[0], centerPos[1], this.radius, 2 * Math.PI - Math.PI * 11 / 9, 2 * Math.PI - Math.PI * 16 / 9);
      }
    } else {
      if (this.dir[0] === -1 && this.dir[1] === 0) {
        ctx.arc(centerPos[0], centerPos[1], this.radius, 2 * Math.PI - Math.PI * 17 / 18, 2 * Math.PI - Math.PI * 19 / 18);
      } else if (this.dir[0] === 0 && this.dir[1] === -1) {
        ctx.arc(centerPos[0], centerPos[1], this.radius, 2 * Math.PI - Math.PI * 8 / 18, 2 * Math.PI - Math.PI * 10 / 18);
      } else if (this.dir[0] === 1 && this.dir[1] === 0) {
        ctx.arc(centerPos[0], centerPos[1], this.radius, 2 * Math.PI - Math.PI * 35 / 18, 2 * Math.PI - Math.PI * 1 / 18);
      } else if (this.dir[0] === 0 && this.dir[1] === 1) {
        ctx.arc(centerPos[0], centerPos[1], this.radius, 2 * Math.PI - Math.PI * 26 / 18, 2 * Math.PI - Math.PI * 28 / 18);
      }
    }
    ctx.lineTo(centerPos[0], centerPos[1]);
    ctx.fill();
    this.numSteps += 1;
    if (this.numSteps >= 10) {
      this.openMouth = !(this.openMouth);
      this.numSteps = 0;
    }
  }

  die(ctx) {
    ctx.fillStyle = this.color;
    const centerPos = [this.pos[0] + DEFAULTS.gridSize / 2 + DEFAULTS.wallSize / 2, this.pos[1] + DEFAULTS.gridSize / 2 + DEFAULTS.wallSize / 2];

    setTimeout(() => {
      this.drawState(ctx, centerPos, [2 * Math.PI - Math.PI * 17 / 18, 2 * Math.PI - Math.PI * 19 / 18]);
      setTimeout(() => {
        this.drawState(ctx, centerPos, [2 * Math.PI - Math.PI * 8 / 18, 2 * Math.PI - Math.PI * 10 / 18]);
        setTimeout(() => {
          this.drawState(ctx, centerPos, [2 * Math.PI - Math.PI * 35 / 18, 2 * Math.PI - Math.PI * 1 / 18]);
          setTimeout(() => {
            this.drawState(ctx, centerPos, [2 * Math.PI - Math.PI * 26 / 18, 2 * Math.PI - Math.PI * 28 / 18]);
          }, 200);
        }, 200);
      }, 200);
    }, 200);
  }

  drawState(ctx, centerPos, angles) {
    this.board.render(ctx);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(centerPos[0], centerPos[1], this.radius, angles[0], angles[1]);
    ctx.lineTo(centerPos[0], centerPos[1]);
    ctx.fill();
  }
}

module.exports = Beerman;