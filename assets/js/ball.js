class Ball extends Rectangle {
  constructor(x = 0, y = 0, color = "white") {
    super(x, y, 24, 24);
    this.color = color;
    this.speed = 0;
    this.startX = x;
    this.startY = y;
    this.angle = 0;
    this.locked = false;
    this.out = false;
    this.reset();
  }

  reset(x = this.startX, y = this.startY) {
    this.setPosition(x, y);

    this.setSpeed(150);

    this.setAngle(
      getRandomNumBetween(1, 2) === 1
        ? getRandomNumBetween(150, 210)
        : getRandomNumBetween(330, 390)
    );
    this.out = false;
  }

  setPosition(x, y) {
    this.position.x = x;
    this.position.y = y;
  }

  setSpeed(speed) {
    this.speed = Math.ceil(speed);
    console.log("setSpeed(" + this.speed + ")");
    console.log("velocity = " + this.velocity.x, this.velocity.y);
  }

  setAngle(degrees) {
    const radians = this.toRadians(degrees);
    this.velocity.x = this.speed * Math.cos(radians);
    this.velocity.y = this.speed * -Math.sin(radians);
  }

  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
  toDegrees(radians) {
    return (radians * 180) / Math.PI;
  }
}
