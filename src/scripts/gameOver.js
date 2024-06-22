export class GameOver {
  constructor(game) {
    this.game = game
    this.fontFamily = "Inter";
    this.baseFontSize = 60;
    this.fontSize;
  }
  drawGameOverText() {
    this.game.ctx.save();
      this.game.ctx.font = `${this.fontSize}px ${this.fontFamily}`;
      this.game.ctx.textAlign = "center";
      this.game.ctx.shadowColor = "#000";
      this.game.ctx.shadowBlur = 4;
      this.game.ctx.fillText(
        "Game Over",
        this.game.width * 0.5,
        this.game.height * 0.5 - this.fontSize,
        this.game.width
      );
      this.game.ctx.font = `${this.fontSize}px ${this.fontFamily}`;

      this.game.ctx.fillText(
        `score: ${this.game.score}`,
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