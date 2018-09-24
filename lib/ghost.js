const MovingObject = require('./moving_object');

const DEFAULTS = {
  dir: [-1, 0],
  vel: 2,
  radius: 15,
  isFrightened: false,
  isDead: false,
  moveShift: false,
  gridSize: 40,
  wallSize: 4,
  boardSize: 800
};

class Ghost extends MovingObject {
  constructor(options) {
    options.dir = DEFAULTS.dir;
    options.vel = DEFAULTS.vel;
    options.radius = DEFAULTS.radius;
    super(options);
    this.startPos = this.pos;
    this.name = options.name;
    this.beerman = options.beerman;
    this.isFrightened = DEFAULTS.isFrightened;
    this.isDead = DEFAULTS.isDead;
    this.moveShift = DEFAULTS.moveShift;
    this.frightenedColor = "#000080";
    this.numSteps = 0;
    if (this.name === "inky") {
      this.blinky = options.blinky;
    }
  }

  render(ctx) {
    if (!this.isDead) {
      this.isFrightened = this.beerman.poweredUp;
    }
    if (this.isFrightened || this.isDead) {
      ctx.fillStyle = this.frightenedColor;
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
    if (!this.isFrightened && !this.isDead) {
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
      if (this.isFrightened) {
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
        ctx.lineWidth = 1;
        ctx.moveTo(centerPos[0] - this.radius * 3 / 4, centerPos[1] + this.radius / 2);
        ctx.lineTo(centerPos[0] - this.radius / 2, centerPos[1] + this.radius / 4);
        ctx.lineTo(centerPos[0], centerPos[1] + this.radius / 2);
        ctx.lineTo(centerPos[0] + this.radius / 2, centerPos[1] + this.radius / 4);
        ctx.lineTo(centerPos[0] + this.radius * 3 / 4, centerPos[1] + this.radius / 2);
        ctx.stroke();
      } else {
        ctx.fillStyle = "white";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerPos[0] - this.radius / 2, centerPos[1] - this.radius / 2);
        ctx.lineTo(centerPos[0] - this.radius / 4, centerPos[1] - this.radius / 4);
        ctx.moveTo(centerPos[0] - this.radius / 4, centerPos[1] - this.radius / 2);
        ctx.lineTo(centerPos[0] - this.radius / 2, centerPos[1] - this.radius / 4);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(centerPos[0] + this.radius / 2, centerPos[1] - this.radius / 2);
        ctx.lineTo(centerPos[0] + this.radius / 4, centerPos[1] - this.radius / 4);
        ctx.moveTo(centerPos[0] + this.radius / 4, centerPos[1] - this.radius / 2);
        ctx.lineTo(centerPos[0] + this.radius / 2, centerPos[1] - this.radius / 4);
        ctx.stroke();
      }
    }
  }

  move(walls) {
    if (this.name === "blinky") {
      if (this.isFrightened) {
        this.target([DEFAULTS.boardSize, 0], walls);
      } else {
        this.target(this.beerman.pos, walls);
      }
    } else if (this.name === "pinky") {
      if (this.isFrightened) {
        this.target([0, 0], walls);
      } else {
        this.target([
          this.beerman.pos[0] + this.beerman.dir[0] * DEFAULTS.gridSize * 4,
          this.beerman.pos[0] + this.beerman.dir[0] * DEFAULTS.gridSize * 4,
        ], walls);
      }
    } else if (this.name === "inky") {
      if (this.isFrightened) {
        this.target([DEFAULTS.boardSize, DEFAULTS.boardSize], walls);
      } else {
        const bmanTwoTiles = [
          this.beerman.pos[0] + this.beerman.dir[0] * DEFAULTS.gridSize * 2,
          this.beerman.pos[0] + this.beerman.dir[0] * DEFAULTS.gridSize * 2
        ];
        const inkyTarget = [2 * bmanTwoTiles[0] - this.blinky.pos[0], 2 * bmanTwoTiles[1] - this.blinky.pos[1]];
        this.target(inkyTarget, walls);
      }
    } else if (this.name === "clyde") {
      if (this.isFrightened) {
        this.target([0, DEFAULTS.boardSize], walls);
      } else {
        const distFromBMan = Math.sqrt(
          Math.pow(this.pos[0] - this.beerman.pos[0], 2)
          + Math.pow(this.pos[1] - this.beerman.pos[1], 2)
        );
        if (distFromBMan > 200) {
          this.target([0, DEFAULTS.gridSize + 100], walls);
        } else {
          this.target(this.beerman.pos, walls);
        }
      }
    }
    this.numSteps += 1;
    if (this.numSteps >= 10) {
      this.moveShift = !(this.moveShift);
      this.numSteps = 0;
    }
    this.wrap();
  }

  // target(targetPos, tiles) {
  //   if (this.pos[0] % DEFAULTS.gridSize === 0 && this.pos[1] % DEFAULTS.gridSize === 0) {
  //     // up, left, down, right
  //     const dirs = [[0, -1], [-1, 0], [0, 1], [1, 0]];
  //     const moveDistances = [];
  //     const nextTiles = [];
  //     const list = [];
  //     dirs.forEach(dir => {
  //       const nextPos = [
  //         this.pos[0] + dir[0] * DEFAULTS.gridSize,
  //         this.pos[1] + dir[1] * DEFAULTS.gridSize
  //       ];
  //       if (this.inBounds(nextPos)) {
  //         const distToTarget = this.calcDist(nextPos, targetPos);
  //         moveDistances.push(distToTarget);
  //         const nextTile = [nextPos[0] / DEFAULTS.gridSize, nextPos[1] / DEFAULTS.gridSize];
  //         nextTiles.push(nextTile);
  //         list.push({ 'dir': dir, 'dist': distToTarget, 'tile': nextTile });
  //       }
  //     });

  //     list.sort(function (a, b) {
  //       return ((a.dist < b.dist) ? -1 : ((a.dist === b.dist) ? 0 : 1));
  //     });
  //     for (let i = 0; i < list.length; i++) {
  //       dirs[i] = list[i].dir;
  //       moveDistances[i] = list[i].dist;
  //       nextTiles[i] = list[i].tile;
  //     }

  //     let selectedDir;
  //     for (let j = 0; j < dirs.length; j++) {
  //       let nextTile = nextTiles[j];
  //       if (tiles[nextTile[1]][nextTile[0]] === 1) {
  //         selectedDir = dirs[j];
  //         break;
  //       }
  //     }
  //     this.dir = selectedDir;
  //     if (this.name === "blinky") {
  //     }
  //   }
  //   this.moveOnce();
  // }

  calcDist(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
  }

  inBounds(pos) {
    return (
      pos[0] >= 0 &&
      pos[1] >= 0 &&
      pos[0] <= (DEFAULTS.boardSize - DEFAULTS.gridSize) &&
      pos[0] <= (DEFAULTS.boardSize - DEFAULTS.gridSize)
    );
  }

  target(pos, walls) {
    const xDif = this.pos[0] - pos[0];
    const yDif = this.pos[1] - pos[1];
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

  checkDirEquality(dir1, dir2) {
    return (dir1[0] === dir2[0] && dir1[1] === dir2[1]);
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

  die(ctx) {
    this.isFrightened = false;
    this.isDead = true;
    this.render(ctx);
    this.pos = [this.startPos[0], this.startPos[1] + DEFAULTS.gridSize];
    this.vel = 0;
    setTimeout(() => {
      this.pos = this.startPos;
      this.vel = DEFAULTS.vel;
      this.isDead = false;
    }, 10000);
  }
}

module.exports = Ghost;