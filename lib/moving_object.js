const gridSize = 50;
const wallSize = 5;
class MovingObject {
  constructor({ pos, dir, vel, radius, color }) {
    this.pos = pos;
    this.dir = dir;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
    this.render = this.render.bind(this);
    this.move = this.move.bind(this);
    this.willCollide = this.willCollide.bind(this);
    this.includesArr = this.includesArr.bind(this);
  }

  willCollide(dir, walls, turning) {
    const pos = this.pos;
    const leftWalls = walls["LEFT"];
    const topWalls = walls["TOP"];
    const rightWalls = walls["RIGHT"];
    const bottomWalls = walls["BOTTOM"];
    const notCentered = (this.pos[0] % 50 !== 0 || this.pos[1] % 50 !== 0);
    const aboveCenterArea = (this.pos[0] >= 350 && this.pos[0] <= 450 && this.pos[1] >= 300 && this.pos[1] <= 350);
    if (!turning) {
      if (dir[0] === -1 && dir[1] === 0) {
        return this.includesArr(leftWalls, pos) || this.includesArr(rightWalls, [this.pos[0] - gridSize, this.pos[1]]);
      } else if (dir[0] === 0 && dir[1] === -1) {
        return this.includesArr(topWalls, pos) || this.includesArr(bottomWalls, [this.pos[0], this.pos[1] - gridSize]);
      } else if (dir[0] === 1 && dir[1] === 0) {
        return this.includesArr(rightWalls, pos) || this.includesArr(leftWalls, [this.pos[0] + gridSize, this.pos[1]]);
      } else if (dir[0] === 0 && dir[1] === 1) {
        return aboveCenterArea || this.includesArr(bottomWalls, pos) || this.includesArr(topWalls, [this.pos[0], this.pos[1] + gridSize]);
      }
    } else {
      if (dir[0] === -1 && dir[1] === 0) {
        return (
          this.includesArr(leftWalls, [Math.floor(this.pos[0] / gridSize) * gridSize, Math.floor(this.pos[1] / gridSize) * gridSize]) ||
          this.includesArr(leftWalls, [Math.ceil(this.pos[0] / gridSize) * gridSize, Math.ceil(this.pos[1] / gridSize) * gridSize]) ||
          this.includesArr(rightWalls, [Math.floor((this.pos[0] - gridSize) / gridSize) * gridSize, Math.floor(this.pos[1] / gridSize) * gridSize]) ||
          this.includesArr(rightWalls, [Math.ceil((this.pos[0] - gridSize) / gridSize) * gridSize, Math.ceil(this.pos[1] / gridSize) * gridSize])
        );
      } else if (dir[0] === 0 && dir[1] === -1) {
        return (
          (notCentered && this.includesArr(rightWalls, [Math.floor((this.pos[0] - gridSize) / gridSize) * gridSize, Math.floor((this.pos[1] - gridSize) / gridSize) * gridSize])) ||
          (notCentered && this.includesArr(leftWalls, [Math.floor((this.pos[0] + gridSize) / gridSize) * gridSize, Math.floor((this.pos[1] - gridSize) / gridSize) * gridSize])) ||
          this.includesArr(topWalls, [Math.floor(this.pos[0] / gridSize) * gridSize, Math.floor(this.pos[1] / gridSize) * gridSize]) ||
          this.includesArr(topWalls, [Math.ceil(this.pos[0] / gridSize) * gridSize, Math.ceil(this.pos[1] / gridSize) * gridSize]) ||
          this.includesArr(bottomWalls, [Math.floor(this.pos[0] / gridSize) * gridSize, Math.floor((this.pos[1] - gridSize) / gridSize) * gridSize]) ||
          this.includesArr(bottomWalls, [Math.ceil(this.pos[0] / gridSize) * gridSize, Math.ceil((this.pos[1] - gridSize) / gridSize) * gridSize])
        );
      } else if (dir[0] === 1 && dir[1] === 0) {
        return (
          this.includesArr(rightWalls, [Math.floor(this.pos[0] / gridSize) * gridSize, Math.floor(this.pos[1] / gridSize) * gridSize]) ||
          this.includesArr(rightWalls, [Math.ceil(this.pos[0] / gridSize) * gridSize, Math.ceil(this.pos[1] / gridSize) * gridSize]) ||
          this.includesArr(leftWalls, [Math.floor((this.pos[0] + gridSize) / gridSize) * gridSize, Math.floor(this.pos[1] / gridSize) * gridSize]) ||
          this.includesArr(leftWalls, [Math.ceil((this.pos[0] + gridSize) / gridSize) * gridSize, Math.ceil(this.pos[1] / gridSize) * gridSize])
        );
      } else if (dir[0] === 0 && dir[1] === 1) {
        return (
          aboveCenterArea ||
          this.includesArr(bottomWalls, [Math.floor(this.pos[0] / gridSize) * gridSize, Math.floor(this.pos[1] / gridSize) * gridSize]) ||
          this.includesArr(bottomWalls, [Math.ceil(this.pos[0] / gridSize) * gridSize, Math.ceil(this.pos[1] / gridSize) * gridSize]) ||
          this.includesArr(topWalls, [Math.floor(this.pos[0] / gridSize) * gridSize, Math.floor((this.pos[1] + gridSize) / gridSize) * gridSize]) ||
          this.includesArr(topWalls, [Math.ceil(this.pos[0] / gridSize) * gridSize, Math.ceil((this.pos[1] + gridSize) / gridSize) * gridSize])
        );
      }
    }
  }

  includesArr(mainArr, subArr) {
    for (let i = 0; i < mainArr.length; i++) {
      if (JSON.stringify(mainArr[i]) === JSON.stringify(subArr)) return true;
    }
    return false;
  }

  move(walls) {
    if (!this.willCollide(this.dir, walls, false)) {
      this.pos = [this.pos[0] + this.dir[0] * this.vel, this.pos[1] + this.dir[1] * this.vel];
    }
    this.wrap();
  }

  turn(dir, walls) {
    if (dir !== this.dir) {
      this.ensureSmoothTurn();
    }
    if (!this.willCollide(dir, walls, true)) {
      this.dir = dir;
    }
  }

  ensureSmoothTurn() {
    this.pos = [Math.floor(this.pos[0] / 10) * 10, this.pos[1]];
    this.pos = [Math.ceil(this.pos[0] / 10) * 10, this.pos[1]];
    this.pos = [this.pos[0], Math.floor(this.pos[1] / 10) * 10];
    this.pos = [this.pos[0], Math.ceil(this.pos[1] / 10) * 10];
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0] + gridSize / 2 + wallSize / 2,
      this.pos[1] + gridSize / 2 + wallSize / 2,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
  }

  wrap() {
    if (this.pos[0] < 0 && (this.dir[0] === -1 && this.dir[1] === 0)) {
      this.pos = [800, this.pos[1]];
    } else if (this.pos[0] > 800 && (this.dir[0] === 1 && this.dir[1] === 0)) {
      this.pos = [0, this.pos[1]];
    } else if (this.pos[1] < 0 && (this.dir[0] === 0 && this.dir[1] === -1)) {
      this.pos = [this.pos[0], 800];
    } else if (this.pos[1] > 800 && (this.dir[0] === 0 && this.dir[1] === 1)) {
      this.pos = [this.pos[0], 0];
    }
  }
}

module.exports = MovingObject;