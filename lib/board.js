class Board {
  constructor(options) {
    this.pos = options.pos;
    this.width = options.width;
    this.height = options.height;
    this.numRows = 16;
    this.numCols = this.numRows;
    this.walls = {
      "LEFT": [],
      "TOP": [],
      "RIGHT": [],
      "BOTTOM": []
    };
    this.drinkLocations = JSON.parse(JSON.stringify((DRINK_LOCATIONS)));
  }

  render(ctx) {
    this.resetWalls();
    ctx.fillStyle = "black";
    ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);
    for (let row = 0; row < this.numRows; row++) {
      for (let col = 0; col < this.numCols; col++) {
        if (this.drinkLocations[row][col] === 1) {
          this.drawBeer(ctx, row, col);
        }
        if (this.drinkLocations[row][col] === 2) {
          this.drawCoffee(ctx, row, col);
        }
        switch (EDGES[row][col]) {
          case LEFT:
            this.drawLeftEdge(ctx, row, col);
            break;
          case TOP:
            this.drawTopEdge(ctx, row, col);
            break;
          case RIGHT:
            this.drawRightEdge(ctx, row, col);
            break;
          case BOTTOM:
            this.drawBottomEdge(ctx, row, col);
            break;
          case LEFT_TOP:
            this.drawLeftEdge(ctx, row, col);
            this.drawTopEdge(ctx, row, col);
            break;
          case LEFT_RIGHT:
            this.drawLeftEdge(ctx, row, col);
            this.drawRightEdge(ctx, row, col);
            break;
          case LEFT_BOTTOM:
            this.drawLeftEdge(ctx, row, col);
            this.drawBottomEdge(ctx, row, col);
            break;
          case TOP_RIGHT:
            this.drawTopEdge(ctx, row, col);
            this.drawRightEdge(ctx, row, col);
            break;
          case TOP_BOTTOM:
            this.drawTopEdge(ctx, row, col);
            this.drawBottomEdge(ctx, row, col);
            break;
          case RIGHT_BOTTOM:
            this.drawRightEdge(ctx, row, col);
            this.drawBottomEdge(ctx, row, col);
            break;
          case LEFT_TOP_RIGHT:
            this.drawLeftEdge(ctx, row, col);
            this.drawTopEdge(ctx, row, col);
            this.drawRightEdge(ctx, row, col);
            break;
          case TOP_RIGHT_BOTTOM:
            this.drawTopEdge(ctx, row, col);
            this.drawRightEdge(ctx, row, col);
            this.drawBottomEdge(ctx, row, col);
            break;
          case LEFT_BOTTOM_RIGHT:
            this.drawLeftEdge(ctx, row, col);
            this.drawBottomEdge(ctx, row, col);
            this.drawRightEdge(ctx, row, col);
            break;
          case LEFT_TOP_BOTTOM:
            this.drawLeftEdge(ctx, row, col);
            this.drawTopEdge(ctx, row, col);
            this.drawBottomEdge(ctx, row, col);
            break;
          case FOUR_SIDES:
            this.drawLeftEdge(ctx, row, col);
            this.drawTopEdge(ctx, row, col);
            this.drawRightEdge(ctx, row, col);
            this.drawBottomEdge(ctx, row, col);
            break;
          case EMPTY:
            break;
          default:
            break;
        }
      }
    }
  }

  drawBeer(ctx, row, col) {
    ctx.font = "16px Arial";
    ctx.fillText(String.fromCodePoint(0x1F37A), col * SIZES.gridSize + 12, row * SIZES.gridSize + 30);
  }

  drawCoffee(ctx, row, col) {
    ctx.font = "20px Arial";
    ctx.fillText(String.fromCodePoint(0x2615), col * SIZES.gridSize + 11, row * SIZES.gridSize + 30);
  }

  drawLeftEdge(ctx, row, col) {
    ctx.fillStyle = "blue";
    const pos = [col * SIZES.gridSize, row * SIZES.gridSize];
    ctx.fillRect(
      pos[0],
      pos[1],
      SIZES.wall,
      SIZES.gridSize + SIZES.wall
    );
    this.storeWalls(pos, "LEFT");
  }


  drawTopEdge(ctx, row, col) {
    ctx.fillStyle = "blue";
    const pos = [col * SIZES.gridSize, row * SIZES.gridSize];
    ctx.fillRect(
      pos[0],
      pos[1],
      SIZES.gridSize,
      SIZES.wall
    );
    this.storeWalls(pos, "TOP");
  }

  drawRightEdge(ctx, row, col) {
    ctx.fillStyle = "blue";
    const pos = [col * SIZES.gridSize, row * SIZES.gridSize];
    ctx.fillRect(
      pos[0] + SIZES.gridSize,
      pos[1],
      SIZES.wall,
      SIZES.gridSize + SIZES.wall
    );
    this.storeWalls(pos, "RIGHT");
  }

  drawBottomEdge(ctx, row, col) {
    ctx.fillStyle = "blue";
    const pos = [col * SIZES.gridSize, row * SIZES.gridSize];
    ctx.fillRect(
      pos[0],
      pos[1] + SIZES.gridSize,
      SIZES.gridSize,
      SIZES.wall
    );
    this.storeWalls(pos, "BOTTOM");
  }

  isEmpty() {
    for (let row = 0; row < DRINK_LOCATIONS.length; row++) {
      for (let col = 0; col < DRINK_LOCATIONS.length; col++) {
        if (this.drinkLocations[row][col] > 0) {
          return false;
        }
      }
    }
    return true;
  }

  removeDrink(row, col) {
    this.drinkLocations[row][col] = 0;
  }

  resetWalls() {
    this.walls = {
      "LEFT": [],
      "TOP": [],
      "RIGHT": [],
      "BOTTOM": []
    };
  }

  storeWalls(pos, dir) {
    this.walls[dir].push(pos);
  }

  resetBoard() {
    this.drinkLocations = JSON.parse(JSON.stringify((DRINK_LOCATIONS)));
  }
}

const SIZES = {
  wall: 4,
  gridSize: 40
};

const LEFT = "LEFT";
const TOP = "TOP";
const RIGHT = "RIGHT";
const BOTTOM = "BOTTOM";
const LEFT_TOP = "LEFT_TOP";
const LEFT_RIGHT = "LEFT_RIGHT";
const LEFT_BOTTOM = "LEFT_BOTTOM";
const TOP_RIGHT = "TOP_RIGHT";
const TOP_BOTTOM = "TOP_BOTTOM";
const RIGHT_BOTTOM = "RIGHT_BOTTOM";
const LEFT_TOP_RIGHT = "LEFT_TOP_RIGHT";
const TOP_RIGHT_BOTTOM = "TOP_RIGHT_BOTTOM";
const LEFT_BOTTOM_RIGHT = "LEFT_BOTTOM_RIGHT";
const LEFT_TOP_BOTTOM = "LEFT_TOP_BOTTOM";
const FOUR_SIDES = "FOUR_SIDES";
const EMPTY = "EMPTY";

const EDGES = [
  [LEFT_TOP, TOP_BOTTOM, TOP_BOTTOM, TOP, TOP_BOTTOM, TOP_BOTTOM, TOP_BOTTOM,
    TOP_RIGHT, LEFT_TOP, TOP_BOTTOM, TOP_BOTTOM, TOP_BOTTOM, TOP, TOP_BOTTOM, TOP_BOTTOM, TOP_RIGHT],
  [LEFT_RIGHT, BOTTOM, RIGHT_BOTTOM, RIGHT, BOTTOM, BOTTOM, RIGHT_BOTTOM, RIGHT,
    RIGHT, BOTTOM, BOTTOM, RIGHT_BOTTOM, EMPTY, LEFT_BOTTOM, RIGHT_BOTTOM, RIGHT],
  [LEFT, BOTTOM, BOTTOM, EMPTY, EMPTY, EMPTY, BOTTOM, BOTTOM,
    BOTTOM, BOTTOM, EMPTY, EMPTY, EMPTY, BOTTOM, BOTTOM, RIGHT],
  [LEFT, LEFT_BOTTOM, RIGHT_BOTTOM, RIGHT, LEFT_TOP, LEFT, LEFT_TOP_BOTTOM, TOP_BOTTOM,
    TOP_BOTTOM, TOP_RIGHT_BOTTOM, EMPTY, LEFT_TOP_RIGHT, EMPTY, LEFT_TOP_BOTTOM, TOP_RIGHT_BOTTOM, RIGHT],
  [LEFT_BOTTOM, BOTTOM, BOTTOM, RIGHT, EMPTY, LEFT_BOTTOM, BOTTOM, RIGHT, EMPTY, BOTTOM,
    RIGHT_BOTTOM, RIGHT, EMPTY, BOTTOM, BOTTOM, RIGHT_BOTTOM],
  [EMPTY, EMPTY, EMPTY, LEFT, LEFT, BOTTOM, RIGHT_BOTTOM, EMPTY,
    LEFT, LEFT_BOTTOM, BOTTOM, RIGHT, RIGHT, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, LEFT, LEFT, LEFT, EMPTY, EMPTY,
    EMPTY, EMPTY, RIGHT, RIGHT, RIGHT, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, RIGHT, EMPTY, LEFT_BOTTOM, LEFT, LEFT_TOP, EMPTY, EMPTY,
    TOP_RIGHT, EMPTY, LEFT_RIGHT, RIGHT, EMPTY, EMPTY, EMPTY],
  [TOP, TOP, TOP, EMPTY, EMPTY, EMPTY, LEFT_BOTTOM, BOTTOM,
    BOTTOM, RIGHT_BOTTOM, EMPTY, TOP_BOTTOM, EMPTY, TOP, TOP, TOP],
  [TOP, TOP, TOP_RIGHT, RIGHT, TOP_RIGHT, EMPTY, BOTTOM, BOTTOM, BOTTOM,
    BOTTOM, RIGHT, RIGHT, EMPTY, LEFT_TOP, TOP, TOP],
  [BOTTOM, BOTTOM, RIGHT_BOTTOM, RIGHT, RIGHT_BOTTOM, EMPTY, LEFT_BOTTOM,
    BOTTOM, BOTTOM, RIGHT_BOTTOM, RIGHT, RIGHT_BOTTOM, RIGHT, BOTTOM, BOTTOM, BOTTOM],
  [LEFT, BOTTOM, BOTTOM, EMPTY, BOTTOM, BOTTOM, BOTTOM, RIGHT, EMPTY, BOTTOM,
    BOTTOM, BOTTOM, EMPTY, BOTTOM, BOTTOM, RIGHT],
  [LEFT, LEFT_BOTTOM, RIGHT, EMPTY, LEFT_BOTTOM, BOTTOM, RIGHT_BOTTOM, RIGHT,
    EMPTY, LEFT_BOTTOM, BOTTOM, RIGHT_BOTTOM, EMPTY, LEFT, RIGHT_BOTTOM, RIGHT],
  [LEFT, RIGHT, RIGHT_BOTTOM, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, LEFT_BOTTOM, LEFT, RIGHT],
  [LEFT_TOP, BOTTOM, BOTTOM, BOTTOM, LEFT_BOTTOM, TOP_BOTTOM, TOP_BOTTOM, TOP_RIGHT,
    TOP, TOP_BOTTOM, TOP_BOTTOM, RIGHT_BOTTOM, BOTTOM, BOTTOM, BOTTOM, TOP_RIGHT],
  [LEFT_BOTTOM, BOTTOM, BOTTOM, BOTTOM, BOTTOM, BOTTOM, BOTTOM, BOTTOM,
    BOTTOM, BOTTOM, BOTTOM, BOTTOM, BOTTOM, BOTTOM, BOTTOM, RIGHT_BOTTOM]
];

const DRINK_LOCATIONS = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [2, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 2],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1],
  [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1],
  [2, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 2],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// const TILES = [
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1],
//   [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
//   [0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0],
//   [0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
//   [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
//   [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
//   [0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
//   [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1],
//   [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// ];


module.exports = Board;