export class Score {
  constructor(game) {
    this.game = game;
    this.fontFamily = "Inter";
    this.baseFontSize = 100;
    this.fontSize;
    this.strokeColor = "#fff";
    this.shadowColor = "red";
  }
  drawScoreText() {
    this.game.ctx.save();
    this.game.ctx.font = `${this.fontSize}px ${this.fontFamily}`;
    this.game.ctx.strokeStyle = this.strokeColor;
    this.game.ctx.textAlign = "center";
    this.game.ctx.fillText(
      this.game.score,
      this.game.width * 0.5,
      this.game.height * 0.5,
      this.game.width
    );
    this.game.ctx.shadowColor = this.shadowColor;
    this.game.ctx.shadowBlur = Math.ceil(4 * this.game.ratio);

    this.game.ctx.strokeText(
      this.game.score,
      this.game.width * 0.5,
      this.game.height * 0.5,
      this.game.width
    );
    this.game.ctx.restore();
  }
  resize() {
    this.fontSize = this.baseFontSize * this.game.ratio;
  }
}
