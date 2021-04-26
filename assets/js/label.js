class Label {
  constructor(
    startX = 100,
    startY = 100,
    size = 10,
    color = "white",
    value = "test",
    align = "center"
  ) {
    this.startX = startX;
    this.startY = startY;
    this.size = size;
    this.color = color;
    this.align = align;
    this.update(value);
  }

  update(value) {
    const array2D = Label.getArray2D(value);
    let a, x, y;
    switch (this.align) {
      case "center":
        a = -0.5;
        break;
      case "left":
        a = -1;
        break;
      case "right":
        a = 0;
        break;
    }
    x = this.startX + a * (array2D[0].length * this.size);
    y = this.startY - (array2D.length * this.size) / 2;
    this.rectangles = Label.getRectangles(
      array2D,
      x,
      y,
      this.size,
      this.size,
      this.color
    );
  }
}

Label.characters = "abcdefghijklmnopqrstuvwxyz0123456789 !_";
Label.pixels = [
  "111101111101101",
  "11101010111110011111",
  "111100100100111",
  "110101101101110",
  "111100110100111",
  "111100111100100",
  "11111000101110011111",
  "101101111101101",
  "11111",
  "111001001101111",
  "101101110101101",
  "100100100100111",
  "1000111011101011000110001",
  "10011101101110011001",
  "111101101101111",
  "111101111100100",
  "11101010101010101111",
  "111101110101101",
  "011100111001111",
  "111010010010010",
  "101101101101111",
  "101101101101010",
  "1000110001101011101110001",
  "101101010101101",
  "101101111010010",
  "111001010100111",
  "111101101101111",
  "1101010101",
  "111001111100111",
  "111001011001111",
  "101101111001001",
  "111100111001111",
  "100100111101111",
  "111001001001001",
  "111101111101111",
  "111101111001001",
  "00000",
  "11101",
  "0000000000000000000011111",
];
Label.getPixels = function (char) {
  const index = Label.characters.indexOf(char);
  const pixels = Label.pixels[index].split("").map(Number);
  return pixels;
};
Label.getArray2D = function (str) {
  let array = [[], [], [], [], []];
  let index = 0;
  for (let i = 0; i < str.length; i++) {
    let pixels = Label.getPixels(str[i]);
    let width = pixels.length / 5;
    while (pixels.length > 0) {
      let a = array[index];
      let b = pixels.splice(0, width);
      let c = i !== str.length - 1 ? [0] : [];
      array[index] = a.concat(b).concat(c);
      index = ++index === 5 ? 0 : index;
    }
    return array;
  }
  Label.getRectangles = function (
    array2D,
    pivotX,
    pivotY,
    width,
    height,
    color
  ) {
    let rects = [];
    for (let y = 0; y < array2D.length; y++) {
      for (let x = 0; x < array2D[y].length; x++) {
        if (array2D[y][x]) {
          rects.push(
            new Rectangle(
              pivotX + width / 2 + x * width,
              pivotY + height / 2 + y * height,
              width,
              height,
              color
            )
          );
        }
      }
    }
    return rects;
  };
};
