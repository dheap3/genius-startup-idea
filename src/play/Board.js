export class Square {
  //the board knows where each square is, but each square doesn't know where it is on the board
  constructor(color, coords, licorice = false, shortcut = -1) {
    this.color = color; //color or name of special square (string)
    this.isLicorice = licorice;
    this.isShortcut = shortcut; //5-59,35-45
    this.coords = coords;
  }

  getCoords() {
    return this.coords;
  }

  getColor() {
    return this.color;
  }

  __str__() {
    return `Square(color: ${this.color}, coords: ${this.coords}, isLicorice: ${this.isLicorice}, isShortcut: ${this.isShortcut})`;
  }
}

export class Player {
  constructor(name, token) {
    this.name = name;
    this.token = token; //image of our player
    this.square = null; //current square the player is on
    this.position = -1; //index of the square the player is on, -1 means not on the board
  }

  updatePosition(squareIndex, square) {
    this.position = squareIndex;
    this.square = square;
  }
}

// 21 x 6
// pink x 6
// 1 red
// final

export class Board {
  constructor() {
    this.squares = [];
    const boardCoords = [
      { normalizedX: 0.18724, normalizedY: 0.95987 },
      { normalizedX: 0.22528, normalizedY: 0.94441 },
      { normalizedX: 0.26477, normalizedY: 0.92121 },
      { normalizedX: 0.28233, normalizedY: 0.88256 },
      { normalizedX: 0.30427, normalizedY: 0.83424 },
      { normalizedX: 0.33207, normalizedY: 0.80718 },
      // { normalizedX: 0.332306943074093, normalizedY: 0.8025113625402428 },
      { normalizedX: 0.36717, normalizedY: 0.78979 },
      { normalizedX: 0.40667, normalizedY: 0.78205 }, //{normalizedX: 0.4069161308742903, normalizedY: 0.7764194699359458},
      { normalizedX: 0.43885, normalizedY: 0.78979 },
      { normalizedX: 0.4842, normalizedY: 0.80331 },
      { normalizedX: 0.51346, normalizedY: 0.84004 },
      { normalizedX: 0.53686, normalizedY: 0.8729 },
      { normalizedX: 0.56319, normalizedY: 0.90575 },
      { normalizedX: 0.59684, normalizedY: 0.93474 },
      { normalizedX: 0.63634, normalizedY: 0.95214 },
      { normalizedX: 0.67291, normalizedY: 0.95987 },
      { normalizedX: 0.7124, normalizedY: 0.95407 },
      { normalizedX: 0.74898, normalizedY: 0.94634 },
      { normalizedX: 0.78262, normalizedY: 0.92121 },
      { normalizedX: 0.79432, normalizedY: 0.87869 },
      { normalizedX: 0.77677, normalizedY: 0.83617 },
      { normalizedX: 0.73727, normalizedY: 0.81684 },
      { normalizedX: 0.69631, normalizedY: 0.81298 },
      { normalizedX: 0.65974, normalizedY: 0.81491 },
      { normalizedX: 0.61878, normalizedY: 0.81298 },
      { normalizedX: 0.58075, normalizedY: 0.81105 },
      { normalizedX: 0.54418, normalizedY: 0.78592 },
      { normalizedX: 0.51931, normalizedY: 0.74726 },
      { normalizedX: 0.51492, normalizedY: 0.69894 },
      { normalizedX: 0.54564, normalizedY: 0.66802 },
      { normalizedX: 0.58514, normalizedY: 0.66802 },
      { normalizedX: 0.62025, normalizedY: 0.68155 },
      { normalizedX: 0.65682, normalizedY: 0.70281 },
      { normalizedX: 0.68461, normalizedY: 0.72794 },
      { normalizedX: 0.72703, normalizedY: 0.7492 },
      { normalizedX: 0.7636, normalizedY: 0.76079 },
      { normalizedX: 0.79871, normalizedY: 0.75886 },
      { normalizedX: 0.83528, normalizedY: 0.73373 },
      { normalizedX: 0.8543, normalizedY: 0.68348 },
      { normalizedX: 0.85723, normalizedY: 0.64096 },
      { normalizedX: 0.83675, normalizedY: 0.58878 },
      { normalizedX: 0.80164, normalizedY: 0.57331 },
      { normalizedX: 0.76507, normalizedY: 0.57138 },
      { normalizedX: 0.72996, normalizedY: 0.58491 },
      { normalizedX: 0.689, normalizedY: 0.6023 },
      { normalizedX: 0.65389, normalizedY: 0.6023 },
      { normalizedX: 0.61586, normalizedY: 0.58104 },
      { normalizedX: 0.59099, normalizedY: 0.55012 },
      { normalizedX: 0.55588, normalizedY: 0.52306 },
      { normalizedX: 0.51638, normalizedY: 0.50953 },
      { normalizedX: 0.47981, normalizedY: 0.49987 },
      { normalizedX: 0.44178, normalizedY: 0.50373 },
      { normalizedX: 0.39789, normalizedY: 0.52499 },
      { normalizedX: 0.37449, normalizedY: 0.55785 },
      { normalizedX: 0.35108, normalizedY: 0.58491 },
      { normalizedX: 0.32329, normalizedY: 0.62357 },
      { normalizedX: 0.30427, normalizedY: 0.66995 },
      { normalizedX: 0.27501, normalizedY: 0.70474 },
      { normalizedX: 0.24283, normalizedY: 0.73567 },
      { normalizedX: 0.2048, normalizedY: 0.7492 },
      { normalizedX: 0.16676, normalizedY: 0.75693 },
      { normalizedX: 0.12727, normalizedY: 0.755 },
      { normalizedX: 0.09216, normalizedY: 0.7376 },
      { normalizedX: 0.06144, normalizedY: 0.70281 },
      { normalizedX: 0.03657, normalizedY: 0.65836 },
      { normalizedX: 0.04242, normalizedY: 0.61004 },
      { normalizedX: 0.06144, normalizedY: 0.56751 },
      { normalizedX: 0.1024, normalizedY: 0.55205 },
      { normalizedX: 0.13897, normalizedY: 0.55785 },
      { normalizedX: 0.17408, normalizedY: 0.56558 },
      { normalizedX: 0.2165, normalizedY: 0.58104 },
      { normalizedX: 0.25453, normalizedY: 0.58684 },
      { normalizedX: 0.28525, normalizedY: 0.56558 },
      { normalizedX: 0.28672, normalizedY: 0.52306 },
      { normalizedX: 0.27063, normalizedY: 0.48247 },
      { normalizedX: 0.23405, normalizedY: 0.45735 },
      { normalizedX: 0.21065, normalizedY: 0.41869 },
      { normalizedX: 0.2048, normalizedY: 0.36457 },
      { normalizedX: 0.23991, normalizedY: 0.33558 },
      { normalizedX: 0.27501, normalizedY: 0.32205 },
      { normalizedX: 0.31159, normalizedY: 0.32398 },
      { normalizedX: 0.34669, normalizedY: 0.34138 },
      { normalizedX: 0.38473, normalizedY: 0.35684 },
      { normalizedX: 0.42861, normalizedY: 0.3839 },
      { normalizedX: 0.45348, normalizedY: 0.40516 },
      { normalizedX: 0.49005, normalizedY: 0.43029 },
      { normalizedX: 0.52077, normalizedY: 0.44382 },
      { normalizedX: 0.56319, normalizedY: 0.45928 },
      { normalizedX: 0.60269, normalizedY: 0.47281 },
      { normalizedX: 0.64073, normalizedY: 0.47861 },
      { normalizedX: 0.67876, normalizedY: 0.4902 },
      { normalizedX: 0.71679, normalizedY: 0.4902 },
      { normalizedX: 0.75483, normalizedY: 0.48827 },
      { normalizedX: 0.7914, normalizedY: 0.47281 },
      { normalizedX: 0.82797, normalizedY: 0.45348 },
      { normalizedX: 0.84991, normalizedY: 0.41869 },
      { normalizedX: 0.85723, normalizedY: 0.3665 },
      { normalizedX: 0.84845, normalizedY: 0.31819 },
      { normalizedX: 0.81334, normalizedY: 0.29306 },
      { normalizedX: 0.78262, normalizedY: 0.266 },
      { normalizedX: 0.76946, normalizedY: 0.20995 },
      { normalizedX: 0.75044, normalizedY: 0.16743 },
      { normalizedX: 0.7124, normalizedY: 0.15583 },
      { normalizedX: 0.68022, normalizedY: 0.16743 },
      { normalizedX: 0.65682, normalizedY: 0.19255 },
      { normalizedX: 0.63341, normalizedY: 0.2486 },
      { normalizedX: 0.61732, normalizedY: 0.29499 },
      { normalizedX: 0.59684, normalizedY: 0.33365 },
      { normalizedX: 0.56173, normalizedY: 0.36457 },
      { normalizedX: 0.52662, normalizedY: 0.3723 },
      { normalizedX: 0.49152, normalizedY: 0.36071 },
      { normalizedX: 0.45641, normalizedY: 0.32785 },
      { normalizedX: 0.42861, normalizedY: 0.30659 },
      { normalizedX: 0.39058, normalizedY: 0.28146 },
      { normalizedX: 0.35401, normalizedY: 0.26407 },
      { normalizedX: 0.31451, normalizedY: 0.25634 },
      { normalizedX: 0.27794, normalizedY: 0.25827 },
      { normalizedX: 0.24429, normalizedY: 0.26407 },
      { normalizedX: 0.20187, normalizedY: 0.2718 },
      { normalizedX: 0.15945, normalizedY: 0.27953 },
      { normalizedX: 0.12288, normalizedY: 0.26407 },
      { normalizedX: 0.09362, normalizedY: 0.23894 },
      { normalizedX: 0.07607, normalizedY: 0.19449 },
      { normalizedX: 0.06729, normalizedY: 0.1423 },
      { normalizedX: 0.07753, normalizedY: 0.10558 },
      { normalizedX: 0.11118, normalizedY: 0.06306 },
      { normalizedX: 0.14628, normalizedY: 0.04953 },
      { normalizedX: 0.18432, normalizedY: 0.04953 },
      { normalizedX: 0.2282, normalizedY: 0.06112 },
      { normalizedX: 0.25307, normalizedY: 0.07852 },
      { normalizedX: 0.28818, normalizedY: 0.11524 },
      { normalizedX: 0.31597, normalizedY: 0.1365 },
      { normalizedX: 0.3584, normalizedY: 0.17323 },
      { normalizedX: 0.39204, normalizedY: 0.18869 },
      { normalizedX: 0.05163, normalizedY: 0.94302 },
      { normalizedX: 0.05045, normalizedY: 0.83819 },
      { normalizedX: 0.11795, normalizedY: 0.85071 },
      { normalizedX: 0.12743, normalizedY: 0.93989 },
    ];
    //the coordinates are off because they change depending on the size of the screen. Still need to debug
    let colors = ["Red", "Purple", "Yellow", "Blue", "Orange", "Green"];
    let colorItr = 0;
    for (let i = 0; i < 133; i++) {
      //square (1 based) 5,9,20,35,42,46,69,86,92,102,117
      if (i == 4) {
        this.squares.push(new Square(colors[colorItr], boardCoords[i], false, 58));
        colorItr = (colorItr + 1) % colors.length;
      } else if (i == 8) {
        this.squares.push(new Square("Gingerbread", boardCoords[i]));
      } else if (i == 19) {
        this.squares.push(new Square("CandyCane", boardCoords[i]));
      } else if (i == 34) {
        this.squares.push(new Square(colors[colorItr], boardCoords[i], false, 44));
        colorItr = (colorItr + 1) % colors.length;
      } else if (i == 41) {
        this.squares.push(new Square("Gumdrop", boardCoords[i]));
      } else if (i == 45) {
        this.squares.push(new Square(colors[colorItr], boardCoords[i], true));
        colorItr = (colorItr + 1) % colors.length;
      } else if (i == 68) {
        this.squares.push(new Square("Peanut", boardCoords[i]));
      } else if (i == 85) {
        this.squares.push(new Square(colors[colorItr], boardCoords[i], true));
        colorItr = (colorItr + 1) % colors.length;
      } else if (i == 91) {
        this.squares.push(new Square("Lollipop", boardCoords[i]));
      } else if (i == 101) {
        this.squares.push(new Square("IceCream", boardCoords[i]));
      } else if (i == 116) {
        this.squares.push(new Square(colors[colorItr], boardCoords[i], true));
        colorItr = (colorItr + 1) % colors.length;
      } else {
        this.squares.push(new Square(colors[colorItr], boardCoords[i]));
        colorItr = (colorItr + 1) % colors.length;
      }
    }
    for (let i = 0; i < 4; i++) {
      this.squares.push(new Square(`Start${i + 1}`, boardCoords[133 + i + 1]));
    }
  }

  addSquare(square) {
    this.squares.push(square);
  }

  getSquares() {
    return this.squares;
  }

  getSquare(index) {
    return this.squares[index];
  }

  getBoardCoords() {
    return this.squares.map((square) => square.getCoords());
  }
}
