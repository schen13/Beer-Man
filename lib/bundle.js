/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/beerman.js":
/*!************************!*\
  !*** ./lib/beerman.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./lib/moving_object.js\");\n\nconst DEFAULTS = {\n  dir: [1, 0],\n  vel: 2.5,\n  radius: 18\n};\n\nclass Beerman extends MovingObject {\n  constructor(options) {\n    options.dir = DEFAULTS.dir;\n    options.vel = DEFAULTS.vel;\n    options.radius = DEFAULTS.radius;\n    super(options);\n  }\n}\n\nmodule.exports = Beerman;\n\n//# sourceURL=webpack:///./lib/beerman.js?");

/***/ }),

/***/ "./lib/board.js":
/*!**********************!*\
  !*** ./lib/board.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Board {\n  constructor(options) {\n    this.pos = options.pos;\n    this.width = options.width;\n    this.height = options.height;\n    this.numRows = 16;\n    this.numCols = this.numRows;\n    this.walls = {\n      \"LEFT\": [],\n      \"TOP\": [],\n      \"RIGHT\": [],\n      \"BOTTOM\": []\n    };\n    this.beer = new Image();\n  }\n\n  draw(ctx) {\n    this.resetWalls();\n    ctx.fillStyle = \"black\";\n    ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);\n    for (let row = 0; row < this.numRows; row++) {\n      for (let col = 0; col < this.numCols; col++) {\n        // if (BEER_LOCATIONS[row][col] === 1) {\n        //   this.drawBeer(ctx, row, col);\n        // }\n        switch (EDGES[row][col]) {\n          case LEFT:\n            this.drawLeftEdge(ctx, row, col);\n            break;\n          case TOP:\n            this.drawTopEdge(ctx, row, col);\n            break;\n          case RIGHT:\n            this.drawRightEdge(ctx, row, col);\n            break;\n          case BOTTOM:\n            this.drawBottomEdge(ctx, row, col);\n            break;\n          case LEFT_TOP:\n            this.drawLeftEdge(ctx, row, col);\n            this.drawTopEdge(ctx, row, col);\n            break;\n          case LEFT_RIGHT:\n            this.drawLeftEdge(ctx, row, col);\n            this.drawRightEdge(ctx, row, col);\n            break;\n          case LEFT_BOTTOM:\n            this.drawLeftEdge(ctx, row, col);\n            this.drawBottomEdge(ctx, row, col);\n            break;\n          case TOP_RIGHT:\n            this.drawTopEdge(ctx, row, col);\n            this.drawRightEdge(ctx, row, col);\n            break;\n          case TOP_BOTTOM:\n            this.drawTopEdge(ctx, row, col);\n            this.drawBottomEdge(ctx, row, col);\n            break;\n          case RIGHT_BOTTOM:\n            this.drawRightEdge(ctx, row, col);\n            this.drawBottomEdge(ctx, row, col);\n            break;\n          case LEFT_TOP_RIGHT:\n            this.drawLeftEdge(ctx, row, col);\n            this.drawTopEdge(ctx, row, col);\n            this.drawRightEdge(ctx, row, col);\n            break;\n          case TOP_RIGHT_BOTTOM:\n            this.drawTopEdge(ctx, row, col);\n            this.drawRightEdge(ctx, row, col);\n            this.drawBottomEdge(ctx, row, col);\n            break;\n          case LEFT_BOTTOM_RIGHT:\n            this.drawLeftEdge(ctx, row, col);\n            this.drawBottomEdge(ctx, row, col);\n            this.drawRightEdge(ctx, row, col);\n            break;\n          case LEFT_TOP_BOTTOM:\n            this.drawLeftEdge(ctx, row, col);\n            this.drawTopEdge(ctx, row, col);\n            this.drawBottomEdge(ctx, row, col);\n            break;\n          case FOUR_SIDES:\n            this.drawLeftEdge(ctx, row, col);\n            this.drawTopEdge(ctx, row, col);\n            this.drawRightEdge(ctx, row, col);\n            this.drawBottomEdge(ctx, row, col);\n            break;\n          case EMPTY:\n            break;\n          default:\n            break;\n        }\n      }\n    }\n  }\n\n  // drawBeer(ctx, row, col) {\n  //   this.beer.addEventListener('load', () => ctx.drawImage(this.beer, col * SIZES.gridSize, row * SIZES.gridSize));\n  //   this.beer.src = '../images/beer.png';\n  // }\n\n  drawLeftEdge(ctx, row, col) {\n    ctx.fillStyle = \"blue\";\n    const pos = [col * SIZES.gridSize, row * SIZES.gridSize];\n    ctx.fillRect(\n      pos[0],\n      pos[1],\n      SIZES.wall,\n      SIZES.gridSize + SIZES.wall\n    );\n    this.storeWalls(pos, \"LEFT\");\n  }\n\n\n  drawTopEdge(ctx, row, col) {\n    ctx.fillStyle = \"blue\";\n    const pos = [col * SIZES.gridSize, row * SIZES.gridSize];\n    ctx.fillRect(\n      pos[0],\n      pos[1],\n      SIZES.gridSize,\n      SIZES.wall\n    );\n    this.storeWalls(pos, \"TOP\");\n  }\n\n  drawRightEdge(ctx, row, col) {\n    ctx.fillStyle = \"blue\";\n    const pos = [col * SIZES.gridSize, row * SIZES.gridSize];\n    ctx.fillRect(\n      pos[0] + SIZES.gridSize,\n      pos[1],\n      SIZES.wall,\n      SIZES.gridSize + SIZES.wall\n    );\n    this.storeWalls(pos, \"RIGHT\");\n  }\n\n  drawBottomEdge(ctx, row, col) {\n    ctx.fillStyle = \"blue\";\n    const pos = [col * SIZES.gridSize, row * SIZES.gridSize];\n    ctx.fillRect(\n      pos[0],\n      pos[1] + SIZES.gridSize,\n      SIZES.gridSize,\n      SIZES.wall\n    );\n    this.storeWalls(pos, \"BOTTOM\");\n  }\n\n  resetWalls() {\n    this.walls = {\n      \"LEFT\": [],\n      \"TOP\": [],\n      \"RIGHT\": [],\n      \"BOTTOM\": []\n    };\n  }\n\n  storeWalls(pos, dir) {\n    // if (dir === \"LEFT\" || dir === \"RIGHT\") {\n    //   for (let i = pos[1]; i < pos[1] + SIZES.gridSize; i++) {\n    //     this.walls[dir].push([pos[0], i]);\n    //   }\n    // } else {\n    //   for (let i = pos[0]; i < pos[0] + SIZES.gridSize; i++) {\n    //     this.walls[dir].push([i, pos[1]]);\n    //   }\n    // }\n    this.walls[dir].push(pos);\n  }\n}\n\nconst SIZES = {\n  wall: 5,\n  gridSize: 50\n};\n\nconst LEFT = \"LEFT\";\nconst TOP = \"TOP\";\nconst RIGHT = \"RIGHT\";\nconst BOTTOM = \"BOTTOM\";\nconst LEFT_TOP = \"LEFT_TOP\";\nconst LEFT_RIGHT = \"LEFT_RIGHT\";\nconst LEFT_BOTTOM = \"LEFT_BOTTOM\";\nconst TOP_RIGHT = \"TOP_RIGHT\";\nconst TOP_BOTTOM = \"TOP_BOTTOM\";\nconst RIGHT_BOTTOM = \"RIGHT_BOTTOM\";\nconst LEFT_TOP_RIGHT = \"LEFT_TOP_RIGHT\";\nconst TOP_RIGHT_BOTTOM = \"TOP_RIGHT_BOTTOM\";\nconst LEFT_BOTTOM_RIGHT = \"LEFT_BOTTOM_RIGHT\";\nconst LEFT_TOP_BOTTOM = \"LEFT_TOP_BOTTOM\";\nconst FOUR_SIDES = \"FOUR_SIDES\";\nconst EMPTY = \"EMPTY\";\n\nconst EDGES = [\n  [LEFT_TOP, TOP_BOTTOM, TOP_BOTTOM, TOP, TOP_BOTTOM, TOP_BOTTOM, TOP_BOTTOM,\n    TOP_RIGHT, LEFT_TOP, TOP_BOTTOM, TOP_BOTTOM, TOP_BOTTOM, TOP, TOP_BOTTOM, TOP_BOTTOM, TOP_RIGHT],\n  [LEFT_RIGHT, BOTTOM, RIGHT_BOTTOM, RIGHT, BOTTOM, BOTTOM, RIGHT_BOTTOM, RIGHT,\n    RIGHT, BOTTOM, BOTTOM, RIGHT_BOTTOM, EMPTY, LEFT_BOTTOM, RIGHT_BOTTOM, RIGHT],\n  [LEFT, BOTTOM, BOTTOM, EMPTY, EMPTY, EMPTY, BOTTOM, BOTTOM,\n    BOTTOM, BOTTOM, EMPTY, EMPTY, EMPTY, BOTTOM, BOTTOM, RIGHT],\n  [LEFT, LEFT_BOTTOM, RIGHT_BOTTOM, RIGHT, LEFT_TOP, LEFT, LEFT_TOP_BOTTOM, TOP_BOTTOM,\n    TOP_BOTTOM, TOP_RIGHT_BOTTOM, EMPTY, LEFT_TOP_RIGHT, EMPTY, LEFT_TOP_BOTTOM, TOP_RIGHT_BOTTOM, RIGHT],\n  [LEFT_BOTTOM, BOTTOM, BOTTOM, RIGHT, EMPTY, LEFT_BOTTOM, BOTTOM, RIGHT, EMPTY, BOTTOM,\n    RIGHT_BOTTOM, RIGHT, EMPTY, BOTTOM, BOTTOM, RIGHT_BOTTOM],\n  [EMPTY, EMPTY, EMPTY, LEFT, LEFT, BOTTOM, RIGHT_BOTTOM, EMPTY,\n    LEFT, LEFT_BOTTOM, BOTTOM, RIGHT, RIGHT, EMPTY, EMPTY, EMPTY],\n  [EMPTY, EMPTY, EMPTY, LEFT, LEFT, LEFT, EMPTY, EMPTY,\n    EMPTY, EMPTY, RIGHT, RIGHT, RIGHT, EMPTY, EMPTY, EMPTY],\n  [EMPTY, EMPTY, RIGHT, EMPTY, LEFT_BOTTOM, LEFT, LEFT_TOP, EMPTY, EMPTY,\n    TOP_RIGHT, EMPTY, LEFT_RIGHT, RIGHT, EMPTY, EMPTY, EMPTY],\n  [TOP, TOP, TOP, EMPTY, EMPTY, EMPTY, LEFT_BOTTOM, BOTTOM,\n    BOTTOM, RIGHT_BOTTOM, EMPTY, TOP_BOTTOM, EMPTY, TOP, TOP, TOP],\n  [TOP, TOP, TOP_RIGHT, RIGHT, TOP_RIGHT, EMPTY, BOTTOM, BOTTOM, BOTTOM,\n    BOTTOM, RIGHT, RIGHT, EMPTY, LEFT_TOP, TOP, TOP],\n  [BOTTOM, BOTTOM, RIGHT_BOTTOM, RIGHT, RIGHT_BOTTOM, EMPTY, LEFT_BOTTOM,\n    BOTTOM, BOTTOM, RIGHT_BOTTOM, RIGHT, RIGHT_BOTTOM, RIGHT, BOTTOM, BOTTOM, BOTTOM],\n  [LEFT, BOTTOM, BOTTOM, EMPTY, BOTTOM, BOTTOM, BOTTOM, RIGHT, EMPTY, BOTTOM,\n    BOTTOM, BOTTOM, EMPTY, BOTTOM, BOTTOM, RIGHT],\n  [LEFT, LEFT_BOTTOM, RIGHT, EMPTY, LEFT_BOTTOM, BOTTOM, RIGHT_BOTTOM, RIGHT,\n    EMPTY, LEFT_BOTTOM, BOTTOM, RIGHT_BOTTOM, EMPTY, LEFT, RIGHT_BOTTOM, RIGHT],\n  [LEFT, RIGHT, RIGHT_BOTTOM, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,\n    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, LEFT_BOTTOM, LEFT, RIGHT],\n  [LEFT_TOP, BOTTOM, BOTTOM, BOTTOM, LEFT_BOTTOM, TOP_BOTTOM, TOP_BOTTOM, TOP_RIGHT,\n    TOP, TOP_BOTTOM, TOP_BOTTOM, RIGHT_BOTTOM, BOTTOM, BOTTOM, BOTTOM, TOP_RIGHT],\n  [LEFT_BOTTOM, BOTTOM, BOTTOM, BOTTOM, BOTTOM, BOTTOM, BOTTOM, BOTTOM,\n    BOTTOM, BOTTOM, BOTTOM, BOTTOM, BOTTOM, BOTTOM, BOTTOM, RIGHT_BOTTOM]\n];\n\nconst BEER_LOCATIONS = [\n  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],\n  [1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1],\n  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],\n  [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1],\n  [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],\n  [0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0],\n  [0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],\n  [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],\n  [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],\n  [0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],\n  [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],\n  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],\n  [1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1],\n  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],\n  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],\n  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],\n];\n\n\nmodule.exports = Board;\n\n//# sourceURL=webpack:///./lib/board.js?");

/***/ }),

/***/ "./lib/entry.js":
/*!**********************!*\
  !*** ./lib/entry.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nconst GameView = __webpack_require__(/*! ./game_view */ \"./lib/game_view.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvasEl = document.getElementsByTagName(\"canvas\")[0];\n  canvasEl.height = 805;\n  canvasEl.width = 805;\n  const ctx = canvasEl.getContext(\"2d\");\n  const gview = new GameView(ctx);\n});\n\n\n//# sourceURL=webpack:///./lib/entry.js?");

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Beerman = __webpack_require__(/*! ./beerman */ \"./lib/beerman.js\");\n\nclass Game {\n\n  constructor(ctx) {\n    const beerman = new Beerman({ pos: [400, 450], color: \"#FFFF00\" });\n    this.objects = [beerman];\n    this.render(ctx);\n  }\n\n  render(ctx) {\n    this.objects.forEach(object => object.render(ctx));\n  }\n\n  moveObjects(walls) {\n    this.objects.forEach(object => {\n      object.move(walls);\n    });\n  }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./lib/game.js?");

/***/ }),

/***/ "./lib/game_view.js":
/*!**************************!*\
  !*** ./lib/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Board = __webpack_require__(/*! ./board */ \"./lib/board.js\");\nconst Game = __webpack_require__(/*! ./game */ \"./lib/game.js\");\n\nconst keyBinds = {\n  \"W\": [0, -1],\n  \"A\": [-1, 0],\n  \"S\": [0, 1],\n  \"D\": [1, 0],\n  \"ARROWUP\": [0, -1],\n  \"ARROWLEFT\": [-1, 0],\n  \"ARROWDOWN\": [0, 1],\n  \"ARROWRIGHT\": [1, 0]\n};\n\nconst DIM_X = 900;\nconst DIM_Y = 900;\n\nclass GameView {\n  constructor(ctx) {\n    this.ctx = ctx;\n    this.game = new Game(this.ctx);\n    this.board = new Board({\n      pos: [0, 0],\n      width: DIM_X,\n      height: DIM_Y\n    });\n    document.addEventListener('keydown', this.bindKeyHandlers.bind(this));\n    setInterval(() => this.step(), 20);\n  }\n\n  step() {\n    this.ctx.clearRect(0, 0, DIM_X, DIM_Y);\n    this.board.draw(this.ctx);\n    this.game.render(this.ctx);\n    this.game.moveObjects(this.board.walls);\n  }\n\n  bindKeyHandlers(e) {\n    const key = e.key.toUpperCase();\n    if (keyBinds[key]) {\n      this.game.objects[0].turn(keyBinds[key], this.board.walls);\n    }\n  }\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./lib/game_view.js?");

/***/ }),

/***/ "./lib/moving_object.js":
/*!******************************!*\
  !*** ./lib/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const gridSize = 50;\nconst wallSize = 5;\nclass MovingObject {\n  constructor({ pos, dir, vel, radius, color }) {\n    this.pos = pos;\n    this.dir = dir;\n    this.vel = vel;\n    this.radius = radius;\n    this.color = color;\n    this.render = this.render.bind(this);\n    this.move = this.move.bind(this);\n    this.willCollide = this.willCollide.bind(this);\n    this.includesArr = this.includesArr.bind(this);\n  }\n\n  willCollide(dir, walls, turning) {\n    const pos = this.pos;\n    const leftWalls = walls[\"LEFT\"];\n    const topWalls = walls[\"TOP\"];\n    const rightWalls = walls[\"RIGHT\"];\n    const bottomWalls = walls[\"BOTTOM\"];\n    const notCentered = (this.pos[0] % 50 !== 0 || this.pos[1] % 50 !== 0);\n    const aboveCenterArea = (this.pos[0] >= 350 && this.pos[0] <= 450 && this.pos[1] >= 300 && this.pos[1] <= 350);\n    if (!turning) {\n      if (dir[0] === -1 && dir[1] === 0) {\n        return this.includesArr(leftWalls, pos) || this.includesArr(rightWalls, [this.pos[0] - gridSize, this.pos[1]]);\n      } else if (dir[0] === 0 && dir[1] === -1) {\n        return this.includesArr(topWalls, pos) || this.includesArr(bottomWalls, [this.pos[0], this.pos[1] - gridSize]);\n      } else if (dir[0] === 1 && dir[1] === 0) {\n        return this.includesArr(rightWalls, pos) || this.includesArr(leftWalls, [this.pos[0] + gridSize, this.pos[1]]);\n      } else if (dir[0] === 0 && dir[1] === 1) {\n        return aboveCenterArea || this.includesArr(bottomWalls, pos) || this.includesArr(topWalls, [this.pos[0], this.pos[1] + gridSize]);\n      }\n    } else {\n      if (dir[0] === -1 && dir[1] === 0) {\n        return (\n          this.includesArr(leftWalls, [Math.floor(this.pos[0] / gridSize) * gridSize, Math.floor(this.pos[1] / gridSize) * gridSize]) ||\n          this.includesArr(leftWalls, [Math.ceil(this.pos[0] / gridSize) * gridSize, Math.ceil(this.pos[1] / gridSize) * gridSize]) ||\n          this.includesArr(rightWalls, [Math.floor((this.pos[0] - gridSize) / gridSize) * gridSize, Math.floor(this.pos[1] / gridSize) * gridSize]) ||\n          this.includesArr(rightWalls, [Math.ceil((this.pos[0] - gridSize) / gridSize) * gridSize, Math.ceil(this.pos[1] / gridSize) * gridSize])\n        );\n      } else if (dir[0] === 0 && dir[1] === -1) {\n        return (\n          (notCentered && this.includesArr(rightWalls, [Math.floor((this.pos[0] - gridSize) / gridSize) * gridSize, Math.floor((this.pos[1] - gridSize) / gridSize) * gridSize])) ||\n          (notCentered && this.includesArr(leftWalls, [Math.floor((this.pos[0] + gridSize) / gridSize) * gridSize, Math.floor((this.pos[1] - gridSize) / gridSize) * gridSize])) ||\n          this.includesArr(topWalls, [Math.floor(this.pos[0] / gridSize) * gridSize, Math.floor(this.pos[1] / gridSize) * gridSize]) ||\n          this.includesArr(topWalls, [Math.ceil(this.pos[0] / gridSize) * gridSize, Math.ceil(this.pos[1] / gridSize) * gridSize]) ||\n          this.includesArr(bottomWalls, [Math.floor(this.pos[0] / gridSize) * gridSize, Math.floor((this.pos[1] - gridSize) / gridSize) * gridSize]) ||\n          this.includesArr(bottomWalls, [Math.ceil(this.pos[0] / gridSize) * gridSize, Math.ceil((this.pos[1] - gridSize) / gridSize) * gridSize])\n        );\n      } else if (dir[0] === 1 && dir[1] === 0) {\n        return (\n          this.includesArr(rightWalls, [Math.floor(this.pos[0] / gridSize) * gridSize, Math.floor(this.pos[1] / gridSize) * gridSize]) ||\n          this.includesArr(rightWalls, [Math.ceil(this.pos[0] / gridSize) * gridSize, Math.ceil(this.pos[1] / gridSize) * gridSize]) ||\n          this.includesArr(leftWalls, [Math.floor((this.pos[0] + gridSize) / gridSize) * gridSize, Math.floor(this.pos[1] / gridSize) * gridSize]) ||\n          this.includesArr(leftWalls, [Math.ceil((this.pos[0] + gridSize) / gridSize) * gridSize, Math.ceil(this.pos[1] / gridSize) * gridSize])\n        );\n      } else if (dir[0] === 0 && dir[1] === 1) {\n        return (\n          aboveCenterArea ||\n          this.includesArr(bottomWalls, [Math.floor(this.pos[0] / gridSize) * gridSize, Math.floor(this.pos[1] / gridSize) * gridSize]) ||\n          this.includesArr(bottomWalls, [Math.ceil(this.pos[0] / gridSize) * gridSize, Math.ceil(this.pos[1] / gridSize) * gridSize]) ||\n          this.includesArr(topWalls, [Math.floor(this.pos[0] / gridSize) * gridSize, Math.floor((this.pos[1] + gridSize) / gridSize) * gridSize]) ||\n          this.includesArr(topWalls, [Math.ceil(this.pos[0] / gridSize) * gridSize, Math.ceil((this.pos[1] + gridSize) / gridSize) * gridSize])\n        );\n      }\n    }\n  }\n\n  includesArr(mainArr, subArr) {\n    for (let i = 0; i < mainArr.length; i++) {\n      if (JSON.stringify(mainArr[i]) === JSON.stringify(subArr)) return true;\n    }\n    return false;\n  }\n\n  move(walls) {\n    if (!this.willCollide(this.dir, walls, false)) {\n      this.pos = [this.pos[0] + this.dir[0] * this.vel, this.pos[1] + this.dir[1] * this.vel];\n    }\n    this.wrap();\n  }\n\n  turn(dir, walls) {\n    if (dir !== this.dir) {\n      this.ensureSmoothTurn();\n    }\n    if (!this.willCollide(dir, walls, true)) {\n      this.dir = dir;\n    }\n  }\n\n  ensureSmoothTurn() {\n    this.pos = [Math.floor(this.pos[0] / 10) * 10, this.pos[1]];\n    this.pos = [Math.ceil(this.pos[0] / 10) * 10, this.pos[1]];\n    this.pos = [this.pos[0], Math.floor(this.pos[1] / 10) * 10];\n    this.pos = [this.pos[0], Math.ceil(this.pos[1] / 10) * 10];\n  }\n\n  render(ctx) {\n    ctx.fillStyle = this.color;\n    ctx.beginPath();\n\n    ctx.arc(\n      this.pos[0] + gridSize / 2 + wallSize / 2,\n      this.pos[1] + gridSize / 2 + wallSize / 2,\n      this.radius,\n      0,\n      2 * Math.PI,\n      false\n    );\n    ctx.fill();\n  }\n\n  wrap() {\n    if (this.pos[0] < 0 && (this.dir[0] === -1 && this.dir[1] === 0)) {\n      this.pos = [800, this.pos[1]];\n    } else if (this.pos[0] > 800 && (this.dir[0] === 1 && this.dir[1] === 0)) {\n      this.pos = [0, this.pos[1]];\n    } else if (this.pos[1] < 0 && (this.dir[0] === 0 && this.dir[1] === -1)) {\n      this.pos = [this.pos[0], 800];\n    } else if (this.pos[1] > 800 && (this.dir[0] === 0 && this.dir[1] === 1)) {\n      this.pos = [this.pos[0], 0];\n    }\n  }\n}\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./lib/moving_object.js?");

/***/ })

/******/ });