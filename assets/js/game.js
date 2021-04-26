class Game {
  constructor() {
    // Verbind met het pong canvas.
    this.canvas = document.getElementById("pong");
    this.context = this.canvas.getContext("2d");

    // ball object aanmaken
    this.ball = new Ball(
      this.canvas.width / 2,
      this.canvas.height / 2,
      "orange"
    );

    //Maakt twee playerss aan, doet ze in een array.
    this.players = [
      new Player(20, this.canvas.height / 2, 1),
      new Player(this.canvas.width - 20, this.canvas.height / 2, 2),
    ];

    // Maakt hud aan voor de randen en voor de score.
    this.hud = new Hud(this);

    //Maakt array aan voor de toetsen.

    this.keys = [];
    //Vangt een event op voor toets ingedrukt.
    window.addEventListener("KEY_DOWN", (event) => {
      console.log(event.detail);
      switch (event.detail) {
        case "ArrowUp":
          this.keys[38] = true;
          break;
        case 38:
          this.keys[38] = true;
          break;
        case "ArrowDown":
          this.keys[40] = true;
          break;
        case 40:
          this.keys[40] = true;
          break;
      }
    });
    //Vangt event op voor toets losgelaten.
    window.addEventListener("KEY_UP", (event) => {
      console.log(event.detail);
      switch (event.detail) {
        case "ArrowUp":
          this.keys[38] = false;
          break;
        case 38:
          this.keys[38] = false;
          break;
        case "ArrowDown":
          this.keys[40] = false;
          break;
        case 40:
          this.keys[40] = false;
          break;
      }
    });

    // Maakt gameloop aan
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

  checkInput(player, ball) {
    switch (player.id) {
      case 1: // Human player (links)
        player.velocity.y = 0;
        player.velocity.y += this.keys[38] === true ? -400 : 0;
        player.velocity.y += this.keys[40] === true ? 400 : 0;
        break;
      case 2: // Computer player (rechts)
        player.position.y = ball.position.y;
        break;
    }
  }

  update(deltatime) {
    this.ball.position.x += this.ball.velocity.x * deltatime;
    this.ball.position.y += this.ball.velocity.y * deltatime;

    this.players[0].position.y += this.players[0].velocity.y * deltatime;
    this.players[1].position.y += this.players[1].velocity.y * deltatime;

    this.players.forEach((player) => this.checkInput(player, this.ball));

    this.checkCollisions(this.players, this.ball, this.hud.edges, deltatime);
  }

  checkCollisions(players, ball, edges, deltatime) {
    for (let p = 0; p < players.length; p++) {
      if (players[p].top < edges[0].bottom) {
        players[p].position.y = edges[0].size.y + players[p].size.y / 2;
      } else if (players[p].bottom > edges[1].top) {
        players[p].position.y =
          this.canvas.height - edges[1].size.y - players[p].size.y / 2;
      }
    }

    //Bal boven en beneden tegenhouden
    if (this.ball.bottom > this.canvas.height - 10 || this.ball.top < 10) {
      this.ball.velocity.y = -this.ball.velocity.y;
    }
    if (this.ball.right > this.canvas.width || this.ball.left < 0) {
      this.ball.velocity.x = -this.ball.velocity.x;
    }
  }
  draw() {
    this.drawRectangle(this.context, this.ball);

    for (let i = 0; i < this.players.length; i++) {
      this.drawRectangle(this.context, this.players[i]);
    }

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //dit tekend de bal
  }
  drawRectangle(ctx, rect, color = "blue") {
    ctx.fillStyle = color;
    ctx.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
  }
}
