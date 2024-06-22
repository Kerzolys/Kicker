export class Player {
  constructor(game) {
    this.game = game;
    this.x;
    this.y;
    // базовый радиус мяча
    this.spriteRadius = 50;
    this.radius;
    this.baseWidth = 115;
    this.baseHeight = 115;
    this.width;
    this.height;
    // скорость по вертикали
    this.speedY = 0;
    this.speedX = 0;
    this.imp;
    this.kickSpeed;
    this.image = document.querySelector("#ballImage");
  }
  draw() {
    this.game.ctx.drawImage(
      this.image,
      this.x - this.radius - 9,
      this.y - this.radius - 4,

      this.width,
      this.height
    );
    this.game.ctx.restore();
  }
  resize() {
    this.radius = this.spriteRadius * this.game.ratio;
    this.x = this.game.width * 0.5;
    this.y = this.game.height;
    this.speedY = this.speedY * this.game.ratio;
    this.speedX = this.speedX * this.game.ratio;
    this.imp = 0.5 * this.game.ratio;
    this.kickSpeed = -8 * this.game.ratio;
    this.width = this.baseWidth * this.game.ratio;
    this.height = this.baseHeight * this.game.ratio;
  }
  update() {
    this.x += this.speedX / 3;
    this.y += this.speedY;
    if (!this.isTouchingBottom()) {
      // гравитация мяча
      this.speedY += this.game.gravity;
    }
    if (this.isTouchingBottom()) {
      this.y = this.game.height - this.radius;
      //отскок мяча
      this.speedY = -this.speedY * this.imp;
      this.speedX = this.speedX * this.imp;
      // this.game.gameOver = true;
    }
    if (this.isTouchingLeftBorders()) {
      this.x = 0 + this.radius;
    }
    if (this.isTouchingRightBorders()) {
      this.x = this.game.width - this.radius;
    }
  }
  kick() {
    if (!this.isTouchingTop()) {
      this.y += this.speedY;
      this.speedY = this.kickSpeed;
    }
  }
  isTouchingLeftBorders() {
    return this.x < 0 + this.radius;
  }
  isTouchingRightBorders() {
    return this.x > this.game.width - this.radius;
  }
  isTouchingTop() {
    return this.y < 0 + this.radius * 2;
  }
  isTouchingBottom() {
    return this.y >= this.game.height - this.radius;
  }
}
