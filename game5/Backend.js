class BETriangle {
  constructor(direction, isRevealed) {
    this.direction = direction;
    this.isRevealed = isRevealed;
    if (direction == "up") this.color = getRandomPrimaryColor();
  }

  reveal() {
    this.isRevealed = true;
  }
}

// All backend functions return a game json (Game members)
class BEGame {
  rows = 6;
  cols = 7;

  constructor(seed) {
    this.board = [];
    this.turn = "up";
    this.startTime = new Date();

    isPrimary = true;
    for (let r of this.rows) {
      for (let c of this.cols) {
        isPrimary = !isPrimary;
        this.board.push(new BETriangle(isPrimary));
      }
    }

    // Determine colors for every triangle
    for (let r of this.rows) {
      for (let c of this.cols) {
        [above, left, right] = [];
      }
    }
  }
  static startGame() {
    const game = new BEGame();
    // will need some way to only send over colors that are revealed
  }
  reveal(x, y) {}
}
