class Player extends Rectangle {
  constructor(x = 0, y = 0, id, color = "white") {
    super(x, y, 20, 100, color);
    this.id = id;
    this.color = color;
    this.score = 0;
  }
}
