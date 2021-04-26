class Game {
  constructor() {
    // Verbinden met het pong canvas.
    this.canvas = document.getElementById('pong');
    this.context = this.canvas.getContext('2d');

    // ball object aanmaken
    this.ball = new Ball(this.canvas.width/2, this.canvas.height/2, 'orange');
    
    let lastTime;
    const callback = (milliseconds) => {
      if (lastTime) {
        this.update((milliseconds - lastTime) / 1000);
        this.draw();
      }
      lastTime = milliseconds;
      window.requestAnimFrame(callback);
    };
    callback();
  }

  update(deltatime) {}
  draw() {
    this.drawRectangle(this.context, this.ball);
  }
  drawRectangle(ctx, rect, color = "white") {
    ctx.fillStyle = color;
    ctx.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
  }
}
