const MovingObject = require('./moving_object');

const DEFAULTS = {
  pos: [350, 300],
  dir: [-1, 0],
  vel: 2.5,
  radius: 18,
  isFrightened: false,
  isDead: false,
  moveShift: false,
  gridSize: 50,
  wallSize: 5
};

class Ghost extends MovingObject {
  constructor(options) {
    options.pos = DEFAULTS.pos;
    options.dir = DEFAULTS.dir;
    options.vel = DEFAULTS.vel;
    options.radius = DEFAULTS.radius;
    super(options);
    this.beerman = options.beerman;
    this.isFrightened = DEFAULTS.isFrightened;
    this.isDead = DEFAULTS.isDead;
    this.moveShift = DEFAULTS.moveShift;
    this.frightenedColor = "#000080";
    this.deadColor = "A9A9A9";
  }

  render(ctx) {
    if (this.isFrightened) {
      ctx.fillStyle = this.frightenedColor;
    } else if (this.isDead) {
      ctx.fillStyle = this.deadColor;
    } else {
      ctx.fillStyle = this.color;
    }
    ctx.beginPath();

    // main body
    const centerPos = [this.pos[0] + DEFAULTS.gridSize / 2 + DEFAULTS.wallSize / 2, this.pos[1] + DEFAULTS.gridSize / 2 + DEFAULTS.wallSize / 2];
    ctx.arc(centerPos[0], centerPos[1], this.radius, Math.PI, 0);
    ctx.moveTo(centerPos[0] - this.radius, centerPos[1]);
    if (this.moveShift) {
      ctx.lineTo(centerPos[0] - this.radius, centerPos[1] + this.radius * 5 / 4);
      ctx.lineTo(centerPos[0] - this.radius * (3 / 4), centerPos[1] + this.radius);
      ctx.lineTo(centerPos[0] - this.radius / 2, centerPos[1] + this.radius * 5 / 4);
      ctx.lineTo(centerPos[0] - this.radius / 4, centerPos[1] + this.radius);
      ctx.lineTo(centerPos[0], centerPos[1] + this.radius * 5 / 4);
      ctx.lineTo(centerPos[0] + this.radius / 4, centerPos[1] + this.radius);
      ctx.lineTo(centerPos[0] + this.radius / 2, centerPos[1] + this.radius * 5 / 4);
      ctx.lineTo(centerPos[0] + this.radius * (3 / 4), centerPos[1] + this.radius);
      ctx.lineTo(centerPos[0] + this.radius, centerPos[1] + this.radius * 5 / 4);
      ctx.lineTo(centerPos[0] + this.radius, centerPos[1]);
    } else {
      ctx.lineTo(centerPos[0] - this.radius, centerPos[1] + this.radius);
      ctx.lineTo(centerPos[0] - this.radius * (3 / 4), centerPos[1] + this.radius * 5 / 4);
      ctx.lineTo(centerPos[0] - this.radius / 2, centerPos[1] + this.radius);
      ctx.lineTo(centerPos[0] - this.radius / 4, centerPos[1] + this.radius * 5 / 4);
      ctx.lineTo(centerPos[0], centerPos[1] + this.radius);
      ctx.lineTo(centerPos[0] + this.radius / 4, centerPos[1] + this.radius * 5 / 4);
      ctx.lineTo(centerPos[0] + this.radius / 2, centerPos[1] + this.radius);
      ctx.lineTo(centerPos[0] + this.radius * (3 / 4), centerPos[1] + this.radius * 5 / 4);
      ctx.lineTo(centerPos[0] + this.radius, centerPos[1] + this.radius);
      ctx.lineTo(centerPos[0] + this.radius, centerPos[1]);
    }
    ctx.fill();

    // eyes and mouth
    if (!this.isFrightened) {
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(centerPos[0] - this.radius / 2.5, centerPos[1] - this.radius / 5, this.radius / 3, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(centerPos[0] + this.radius / 2.5, centerPos[1] - this.radius / 5, this.radius / 3, 0, 2 * Math.PI);
      ctx.fill();


      if (this.dir[0] === -1 && this.dir[1] === 0) {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(centerPos[0] - this.radius / 3 - this.radius / 5, centerPos[1] - this.radius / 5, this.radius / 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(centerPos[0] + this.radius / 3 - this.radius / 10, centerPos[1] - this.radius / 5, this.radius / 6, 0, 2 * Math.PI);
        ctx.fill();
      } else if (this.dir[0] === 0 && this.dir[1] === -1) {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(centerPos[0] - this.radius / 3, centerPos[1] - this.radius / 5 - this.radius / 5, this.radius / 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(centerPos[0] + this.radius / 3, centerPos[1] - this.radius / 5 - this.radius / 5, this.radius / 6, 0, 2 * Math.PI);
        ctx.fill();
      } else if (this.dir[0] === 1 && this.dir[1] === 0) {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(centerPos[0] - this.radius / 3 + this.radius / 10, centerPos[1] - this.radius / 5, this.radius / 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(centerPos[0] + this.radius / 3 + this.radius / 5, centerPos[1] - this.radius / 5, this.radius / 6, 0, 2 * Math.PI);
        ctx.fill();
      } else if (this.dir[0] === 0 && this.dir[1] === 1) {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(centerPos[0] - this.radius / 3, centerPos[1] - this.radius / 5 + this.radius / 5, this.radius / 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(centerPos[0] + this.radius / 3, centerPos[1] - this.radius / 5 + this.radius / 5, this.radius / 6, 0, 2 * Math.PI);
        ctx.fill();
      }
    } else {
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(centerPos[0] - this.radius / 2.5, centerPos[1] - this.radius / 5, this.radius / 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(centerPos[0] + this.radius / 2.5, centerPos[1] - this.radius / 5, this.radius / 6, 0, 2 * Math.PI);
      ctx.fill();

      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.lineWidth = 0.8;
      ctx.moveTo(centerPos[0] - this.radius * 3 / 4, centerPos[1] + this.radius / 4);
      ctx.lineTo(centerPos[0] - this.radius / 2, centerPos[1] + this.radius / 2);
      ctx.lineTo(centerPos[0], centerPos[1] + this.radius / 4);
      ctx.lineTo(centerPos[0] + this.radius / 2, centerPos[1] + this.radius / 2);
      ctx.lineTo(centerPos[0] + this.radius * 3 / 4, centerPos[1] + this.radius / 4);
      ctx.stroke();
    }
  }

  // target() {
  //   return this.beerman.pos;
  // }

  move(walls) {
    const xDif = this.pos[0] - this.beerman.pos[0];
    const yDif = this.pos[1] - this.beerman.pos[1];
    if (this.pos[0] % DEFAULTS.gridSize === 0 && this.pos[1] % DEFAULTS.gridSize === 0) {
      if (Math.abs(xDif) >= Math.abs(yDif)) {
        if (!this.tryXMove(xDif, walls, false)) this.tryYMove(yDif, walls, true);
      }
      if (Math.abs(yDif) > Math.abs(xDif)) {
        if (!this.tryYMove(yDif, walls, false)) this.tryXMove(xDif, walls, true);
      }
    } else {
      this.moveOnce();
    }
    this.wrap();
  }

  checkDirEquality(dir1, dir2) {
    return (dir1[0] === dir2[0] && dir1[1] === dir2[1]);
  }

  tryXMove(xDif, walls, retry) {
    if (xDif >= 0 && !this.willCollide([-1, 0], walls, !this.checkDirEquality([-1, 0], this.dir))) {
      this.dir = [-1, 0];
      this.moveOnce();
      return true;
    } else if (xDif < 0 && !this.willCollide([1, 0], walls, !this.checkDirEquality([1, 0], this.dir))) {
      this.dir = [1, 0];
      this.moveOnce();
      return true;
    } else {
      if (retry) {
        this.moveRandomly(walls);
      } else {
        return false;
      }
    }
  }

  tryYMove(yDif, walls, retry) {
    if (yDif >= 0 && !this.willCollide([0, -1], walls, !this.checkDirEquality([0, -1], this.dir))) {
      this.dir = [0, -1];
      this.moveOnce();
    } else if (yDif < 0 && !this.willCollide([0, 1], walls, !this.checkDirEquality([0, 1], this.dir))) {
      this.dir = [0, 1];
      this.moveOnce();
    } else {
      if (retry) {
        this.moveRandomly(walls);
      } else {
        return false;
      }
    }
  }

  moveOnce() {
    this.pos = [this.pos[0] + this.dir[0] * this.vel, this.pos[1] + this.dir[1] * this.vel];
  }

  moveRandomly(walls) {
    const dirs = [[-1, 0], [0, -1], [1, 0], [0, 1]];
    const randomDir = dirs[Math.floor(Math.random() * 4)];
    if (this.willCollide(randomDir, walls, !this.checkDirEquality(randomDir, this.dir))) {
      this.moveRandomly(walls);
    } else {
      this.dir = randomDir;
      this.moveOnce();
    }
  }
}

module.exports = Ghost;