const gridSize = 50;
const wallSize = 5;
const canvasSize = 805;
class MovingObject {
  constructor({ pos, dir, vel, radius, color }) {
    this.pos = pos;
    this.dir = dir;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
    this.queuedDir = undefined;
    this.willCollide = this.willCollide.bind(this);
  }

  willCollide(dir, walls, turning) {
    const pos = this.pos;
    const leftWalls = walls["LEFT"];
    const topWalls = walls["TOP"];
    const rightWalls = walls["RIGHT"];
    const bottomWalls = walls["BOTTOM"];
    const notCentered = (this.pos[0] % gridSize !== 0 || this.pos[1] % gridSize !== 0);
    const aboveGhostHome = (this.pos[0] >= gridSize * 7 && this.pos[0] <= gridSize * 9 && this.pos[1] >= gridSize * 6 && this.pos[1] <= gridSize * 7);
    if (!turning) {
      if (dir[0] === -1 && dir[1] === 0) {
        return this.includesArr(leftWalls, pos) || this.includesArr(rightWalls, [this.pos[0] - gridSize, this.pos[1]]);
      } else if (dir[0] === 0 && dir[1] === -1) {
        return this.includesArr(topWalls, pos) || this.includesArr(bottomWalls, [this.pos[0], this.pos[1] - gridSize]);
      } else if (dir[0] === 1 && dir[1] === 0) {
        return this.includesArr(rightWalls, pos) || this.includesArr(leftWalls, [this.pos[0] + gridSize, this.pos[1]]);
      } else if (dir[0] === 0 && dir[1] === 1) {
        return aboveGhostHome || this.includesArr(bottomWalls, pos) || this.includesArr(topWalls, [this.pos[0], this.pos[1] + gridSize]);
      }
    } else {
      if (dir[0] === -1 && dir[1] === 0) {
        return (
          (notCentered && this.includesArr(bottomWalls, [Math.floor((this.pos[0] - gridSize) / gridSize) * gridSize, Math.floor(this.pos[1] / gridSize) * gridSize])) ||
          (notCentered && this.includesArr(topWalls, [Math.floor((this.pos[0] - gridSize) / gridSize) * gridSize, Math.floor((this.pos[1] + gridSize) / gridSize) * gridSize])) ||
          this.includesArr(leftWalls, [Math.floor(this.pos[0] / gridSize) * gridSize, Math.floor(this.pos[1] / gridSize) * gridSize]) ||
          this.includesArr(leftWalls, [Math.ceil(this.pos[0] / gridSize) * gridSize, Math.ceil(this.pos[1] / gridSize) * gridSize]) ||
          this.includesArr(rightWalls, [Math.floor((this.pos[0] - gridSize) / gridSize) * gridSize, Math.floor(this.pos[1] / gridSize) * gridSize]) ||
          this.includesArr(rightWalls, [Math.ceil((this.pos[0] - gridSize) / gridSize) * gridSize, Math.ceil(this.pos[1] / gridSize) * gridSize])
        );
      } else if (dir[0] === 0 && dir[1] === -1) {
        return (
          (notCentered && this.includesArr(rightWalls, [Math.floor(this.pos[0] / gridSize) * gridSize, Math.floor((this.pos[1] - gridSize) / gridSize) * gridSize])) ||
          (notCentered && this.includesArr(leftWalls, [Math.floor((this.pos[0] + gridSize) / gridSize) * gridSize, Math.floor((this.pos[1] - gridSize) / gridSize) * gridSize])) ||
          this.includesArr(topWalls, [Math.floor(this.pos[0] / gridSize) * gridSize, Math.floor(this.pos[1] / gridSize) * gridSize]) ||
          this.includesArr(topWalls, [Math.ceil(this.pos[0] / gridSize) * gridSize, Math.ceil(this.pos[1] / gridSize) * gridSize]) ||
          this.includesArr(bottomWalls, [Math.floor(this.pos[0] / gridSize) * gridSize, Math.floor((this.pos[1] - gridSize) / gridSize) * gridSize]) ||
          this.includesArr(bottomWalls, [Math.ceil(this.pos[0] / gridSize) * gridSize, Math.ceil((this.pos[1] - gridSize) / gridSize) * gridSize])
        );
      } else if (dir[0] === 1 && dir[1] === 0) {
        console.log(this.pos, Math.floor(this.pos[0] / gridSize) * gridSize, Math.floor(this.pos[1] / gridSize) * gridSize);
        return (
          (notCentered && this.includesArr(bottomWalls, [Math.floor((this.pos[0] + gridSize) / gridSize) * gridSize, Math.floor(this.pos[1] / gridSize) * gridSize])) ||
          (notCentered && this.includesArr(topWalls, [Math.floor((this.pos[0] + gridSize) / gridSize) * gridSize, Math.floor((this.pos[1] + gridSize) / gridSize) * gridSize])) ||
          this.includesArr(rightWalls, [Math.floor(this.pos[0] / gridSize) * gridSize, Math.floor(this.pos[1] / gridSize) * gridSize]) ||
          this.includesArr(rightWalls, [Math.ceil(this.pos[0] / gridSize) * gridSize, Math.ceil(this.pos[1] / gridSize) * gridSize]) ||
          this.includesArr(leftWalls, [Math.floor((this.pos[0] + gridSize) / gridSize) * gridSize, Math.floor(this.pos[1] / gridSize) * gridSize]) ||
          this.includesArr(leftWalls, [Math.ceil((this.pos[0] + gridSize) / gridSize) * gridSize, Math.ceil(this.pos[1] / gridSize) * gridSize])
        );
      } else if (dir[0] === 0 && dir[1] === 1) {
        return (
          aboveGhostHome ||
          (notCentered && this.includesArr(rightWalls, [Math.floor(this.pos[0] / gridSize) * gridSize, Math.floor((this.pos[1] + gridSize) / gridSize) * gridSize])) ||
          (notCentered && this.includesArr(leftWalls, [Math.floor((this.pos[0] + gridSize) / gridSize) * gridSize, Math.floor((this.pos[1] + gridSize) / gridSize) * gridSize])) ||
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
    if (this.queuedDir && !this.willCollide(this.queuedDir, walls, true)) {
      this.dir = this.queuedDir;
      this.queuedDir = undefined;
    }
    if (!this.willCollide(this.dir, walls, false)) {
      this.pos = [this.pos[0] + this.dir[0] * this.vel, this.pos[1] + this.dir[1] * this.vel];
    }
    this.wrap();
  }

  turn(dir, walls) {
    if (!this.willCollide(dir, walls, true)) {
      this.dir = dir;
      this.queuedDir = undefined;
    } else {
      this.queuedDir = dir;
    }
  }

  // goes out of bounds to transition more smoothly
  wrap() {
    if (this.pos[0] < -gridSize / 2 && (this.dir[0] === -1 && this.dir[1] === 0)) {
      this.pos = [canvasSize, this.pos[1]];
    } else if (this.pos[0] > canvasSize && (this.dir[0] === 1 && this.dir[1] === 0)) {
      this.pos = [-gridSize / 2, this.pos[1]];
    }
  }
}

module.exports = MovingObject;