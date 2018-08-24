const GameView = require('./game_view');

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.height = 805;
  canvasEl.width = 975;
  const ctx = canvasEl.getContext("2d");
  const view = new GameView(ctx);
});
