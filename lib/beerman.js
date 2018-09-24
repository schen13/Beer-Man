const MovingObject = require('./moving_object');

const DEFAULTS = {
  dir: [1, 0],
  vel: 4,
  radius: 15,
  gridSize: 40,
  wallSize: 4
};

class Beerman extends MovingObject {
  constructor(options) {
    options.dir = DEFAULTS.dir;
    options.vel = DEFAULTS.vel;
    options.radius = DEFAULTS.radius;
    super(options);
    this.numBeers = 0;
    this.openMouth = true;
    this.poweredUp = false;
    this.numSteps = 0;
    this.dying = false;
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
    this.dying = true;
    ctx.fillStyle = this.color;
    const centerPos = [this.pos[0] + DEFAULTS.gridSize / 2 + DEFAULTS.wallSize / 2, this.pos[1] + DEFAULTS.gridSize / 2 + DEFAULTS.wallSize / 2];

    setTimeout(() => {
      this.drawState(ctx, centerPos, [Math.PI / 4, Math.PI * 7 / 4]);
      setTimeout(() => {
        this.drawState(ctx, centerPos, [Math.PI / 2, Math.PI * 3 / 2]);
        setTimeout(() => {
          this.drawState(ctx, centerPos, [Math.PI * 3 / 4, Math.PI * 5 / 4]);
          setTimeout(() => {
            this.drawState(ctx, centerPos, [Math.PI, Math.PI]);
          }, 300);
        }, 300);
      }, 300);
    }, 300);
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