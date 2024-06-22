import "./styles.css";
import { Game } from "./scripts/app.js";

const init = () => {
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 720;
  canvas.height = 720;

  const game = new Game(canvas, ctx);

  game.gameOver = false;
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    game.render();
    // game.isGameOver();
    // if (!game.isGameOver()) requestAnimationFrame(animate);
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
};

window.addEventListener("load", init);
