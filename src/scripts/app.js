import { Player } from "./player";
import { Score } from "./score";
import { GameOver } from "./gameOver";

export class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.ctx = context;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.baseHeight = 720;
    // вычисляем соотношение между текущей высотой экрана и базовой
    this.ratio = this.height / this.baseHeight;
    this.player = new Player(this);
    this.scoreClass = new Score(this);
    this.gameOverClass = new GameOver(this);
    this.gravity;
    this.score = 0;
    this.gameOver;
    // расстояние по оси Х от центра мяча
    this.kickCorrection;
    this.handleClick;

    // реализуем все настройки из метода resize
    this.resize(window.innerWidth, window.innerHeight);

    // получаем размеры текущего экрана браузера
    window.addEventListener("resize", (evt) => {
      this.resize(evt.currentTarget.innerWidth, evt.currentTarget.innerHeight);
    });
    this.canvas.addEventListener(
      "click",
      (this.handleClick = (evt) => this.handleEvent(evt.clientX, evt.clientY))
    );

    this.isGameOver();
  }
  handleEvent(browserWidth, browserHeight) {
    if (
      // вычисляем мяч на холсте
      // evt.clientX - точка клика по ширине экрана
      // evt.clientY - точка клика по высоте экрана
      // this.player.x - положение центра мяча
      // this.player.radius - радиус мяча
      browserWidth > this.player.x - this.player.radius &&
      browserWidth < this.player.x + this.player.radius &&
      browserHeight > this.player.y - this.player.radius &&
      browserHeight < this.player.y + this.player.radius
    ) {
      this.player.kick();
      this.score++;
      this.kickCorrection = this.player.x - browserWidth;
      // присваиваем горизонтальной скорости мяча расстояние от центра мяча и направление
      this.player.y += this.player.speedY;

      this.player.speedX = this.kickCorrection;
    }
  }
  resize(width, height) {
    // присваиваем холсту текущего экрана браузера
    this.canvas.width = width;
    this.canvas.height = height;
    // присваиваем размерам игры размеры холста от экрана браузера
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.ratio = this.height / this.baseHeight;
    this.player.resize();
    this.scoreClass.resize();
    this.gameOverClass.resize();
    this.gravity = 0.3 * this.ratio;
    this.gameOver = false;
  }
  render() {
    this.player.update();
    this.player.draw();
    this.drawStatusText();
  }
  drawStatusText() {
    if (this.isGameOver()) {
      //gameover text
      this.gameOverClass.drawGameOverText();
    } else {
      // score text
      this.scoreClass.drawScoreText();
    }
  }
  isGameOver() {
    if (this.player.isTouchingBottom() && this.score > 0) {
      this.gameOver = true;
      this.canvas.removeEventListener("click", this.handleClick);
    }
    return this.gameOver;
  }
}

// const init = () => {
//   const canvas = document.querySelector("#canvas");
//   const ctx = canvas.getContext("2d");
//   canvas.width = 720;
//   canvas.height = 720;

//   const game = new Game(canvas, ctx);

//   game.gameOver = false;
//   const animate = () => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.beginPath();
//     game.render();
//     // game.isGameOver();
//     // if (!game.isGameOver()) requestAnimationFrame(animate);
//     requestAnimationFrame(animate);
//   };
//   requestAnimationFrame(animate);
// };

// window.addEventListener("load", init);
