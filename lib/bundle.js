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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object */ \"./lib/moving_object.js\");\n\n\nconst DEFAULTS = {\n  dir: [1, 0],\n  vel: 5,\n  radius: 20\n};\n\nclass Beerman extends _moving_object__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(options) {\n    options.dir = DEFAULTS.dir;\n    options.vel = DEFAULTS.vel;\n    options.radius = DEFAULTS.radius;\n    super(options);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Beerman);\n\n//# sourceURL=webpack:///./lib/beerman.js?");

/***/ }),

/***/ "./lib/entry.js":
/*!**********************!*\
  !*** ./lib/entry.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_view */ \"./lib/game_view.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ \"./lib/game.js\");\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvasEl = document.getElementsByTagName(\"canvas\")[0];\n  canvasEl.style.background = \"black\";\n  canvasEl.height = 800;\n  canvasEl.width = 800;\n  const ctx = canvasEl.getContext(\"2d\");\n  const game = new _game__WEBPACK_IMPORTED_MODULE_1__[\"default\"](ctx);\n  const gview = new _game_view__WEBPACK_IMPORTED_MODULE_0__[\"default\"](game, ctx);\n  gview.start();\n});\n\n\n//# sourceURL=webpack:///./lib/entry.js?");

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _beerman__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./beerman */ \"./lib/beerman.js\");\n\n\nclass Game {\n\n  constructor(ctx) {\n    const beerman = new _beerman__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({ pos: [400, 400], color: \"#FFFF00\" });\n    this.objects = [beerman];\n    this.render(ctx);\n  }\n\n  render(ctx) {\n    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n    this.objects.forEach(object => object.render(ctx));\n  }\n\n  moveObjects() {\n    this.objects.forEach(object => {\n      object.move();\n      object.wrap();\n    });\n  }\n}\n\nGame.DIM_X = 800;\nGame.DIM_Y = 800;\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./lib/game.js?");

/***/ }),

/***/ "./lib/game_view.js":
/*!**************************!*\
  !*** ./lib/game_view.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\n\nconst keyBinds = {\n  \"W\": [0, -1],\n  \"A\": [-1, 0],\n  \"S\": [0, 1],\n  \"D\": [1, 0],\n  \"ARROWUP\": [0, -1],\n  \"ARROWLEFT\": [-1, 0],\n  \"ARROWDOWN\": [0, 1],\n  \"ARROWRIGHT\": [1, 0]\n};\n\nclass GameView {\n  constructor(game, ctx) {\n    this.ctx = ctx;\n    this.game = game;\n    document.addEventListener('keydown', this.bindKeyHandlers.bind(this));\n  }\n\n  start() {\n    setInterval(() => {\n      this.game.moveObjects();\n      this.game.render(this.ctx);\n    }, 20);\n  }\n\n  bindKeyHandlers(e) {\n    const key = e.key.toUpperCase();\n    if (keyBinds[key]) {\n      this.game.objects[0].turn(keyBinds[key]);\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GameView);\n\n//# sourceURL=webpack:///./lib/game_view.js?");

/***/ }),

/***/ "./lib/moving_object.js":
/*!******************************!*\
  !*** ./lib/moving_object.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass MovingObject {\n  constructor({ pos, dir, vel, radius, color }) {\n    this.pos = pos;\n    this.dir = dir;\n    this.vel = vel;\n    this.radius = radius;\n    this.color = color;\n    this.render = this.render.bind(this);\n    this.move = this.move.bind(this);\n  }\n\n  move() {\n    this.pos = [this.pos[0] + this.dir[0] * this.vel, this.pos[1] + this.dir[1] * this.vel];\n    console.log(this.pos);\n  }\n\n  turn(dir) {\n    this.dir = dir;\n  }\n\n  render(ctx) {\n    ctx.fillStyle = this.color;\n    ctx.beginPath();\n\n    ctx.arc(\n      this.pos[0],\n      this.pos[1],\n      this.radius,\n      0,\n      2 * Math.PI,\n      false\n    );\n    ctx.fill();\n  }\n\n  wrap() {\n    if (this.pos[0] === 0 && this.dir === [-1, 0]) {\n      this.pos[0] === 800;\n    } else if (this.pos[0] === 800 && this.dir === [1, 0]) {\n      this.pos[0] === 0;\n    } else if (this.pos[1] === 0 && this.dir === [-1, 0]) {\n      this.pos[1] === 800;\n    } else if (this.pos[1] === 800 && this.dir === [1, 0]) {\n      this.pos[0] === 0;\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MovingObject);\n\n//# sourceURL=webpack:///./lib/moving_object.js?");

/***/ })

/******/ });