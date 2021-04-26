class Rectangle {
  constructor(x, y, w, h, color) {
    this.position = new Vector(x, y);
    this.size = new Vector(w, h);
    this.velocity = new Vector();
    this.color = color;
  }
  get left() {
    return this.position.x - this.size.x / 2;
  }
  get right() {
    return this.position.x + this.size.x / 2;
  }
  get top() {
    return this.position.y - this.size.y / 2;
  }
  get bottom() {
    return this.position.y + this.size.y / 2;
  }
}
