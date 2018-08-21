import GameView from './game_view';
import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.style.background = "black";
  canvasEl.height = 800;
  canvasEl.width = 800;
  const ctx = canvasEl.getContext("2d");
  const game = new Game(ctx);
  const gview = new GameView(game, ctx);
  gview.start();
});
