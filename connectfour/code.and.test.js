class ConnectFour {
  constructor() {
    // build an array of arrays
    // coins are inserted vertically, so it makes sense to make the arrays vertical
    // 7 vertical arrays of 6 in height
    this._grid = Array.from({ length: 7 }, () =>
      Array.from({ length: 6 }).fill(null)
    );
  }

  playTurn(column, colour) {
    // guard clause
    if ((colour !== "red" || colour !== "blue") && (column < 1 || column > 6)) {
      console.log(
        `Error: either column ${column} is not valid, or colour ${colour} is not valid`
      );
      return false;
    }

    // (!) adjust column to match index
    column = column - 1;

    // work out where to place the next coin
    const nextFreeSlot = this._grid[column].indexOf(null);
    // console.log(nextFreeSlot);

    // if there is a free slot in the column
    if (nextFreeSlot !== -1) {
      // add the colour to that column at that index
      this._grid[column][nextFreeSlot] = colour;
      console.log(
        `Succcess: Inserted ${colour} in Column ${column + 1} at Position ${
          nextFreeSlot + 1
        }`
      );
      // console.log(this._grid);
      return true;
    } else {
      // otherwise do not add the colour
      console.log(`Error: Column ${column + 1} is full`);
      // console.log(this._grid);
      return false;
    }
  }

  getWinner() {
    // Check each Column (Vertically)

    // this._grid[0][0]
    // this._grid[0][1]
    // this._grid[0][2]
    // this._grid[0][3]
    // this._grid[0][4]
    // this._grid[0][5]
    // this._grid[1][0]
    // this._grid[1][1]
    // this._grid[1][2]
    // this._grid[1][3]

    // i is the vertical columns
    for (let i = 0; i < this._grid.length; ++i) {
      let verticalContinousCoinCount = 0;
      let previousCoin = undefined;

      for (let j = 0; j < this._grid[0].length; ++j) {
        // console.log(this._grid[i][j]);
        if (
          (previousCoin === undefined || previousCoin === this._grid[i][j]) &&
          previousCoin !== null
        ) {
          // console.log(
          //   `currentSlot = ${this._grid[i][j]}, previousCoin = ${previousCoin}`
          // );
          verticalContinousCoinCount++;
          // this might break things
          previousCoin = this._grid[i][j];
          // console.log("previousCoin:", previousCoin);
        } else {
          verticalContinousCoinCount = 0;
        }

        if (verticalContinousCoinCount === 4) {
          console.log(`Winner (vertical)! ${previousCoin}`);
          return previousCoin;
        }
      }
    }

    // Check each Row (Horizontally)

    // this._grid[0][0]
    // this._grid[1][0]
    // this._grid[2][0]
    // this._grid[3][0]
    // this._grid[4][0]
    // this._grid[5][0]
    // this._grid[6][0]
    // this._grid[1][1]
    // this._grid[2][1]
    // this._grid[3][1]

    // (!) j must be the outer loop (for the horizontal rows)
    for (let j = 0; j < this._grid[0].length; ++j) {
      let horizontalContinousCoinCount = 0;
      let previousCoin = undefined;

      // (!) i must be the inner loop (for the vertical columns)
      for (let i = 0; i < this._grid.length; ++i) {
        // console.log(this._grid[i][j]);

        if (
          (previousCoin === undefined || previousCoin === this._grid[i][j]) &&
          previousCoin !== null
        ) {
          // console.log(
          //   `currentSlot = ${this._grid[i][j]}, previousCoin = ${previousCoin}`
          // );
          horizontalContinousCoinCount++;
          // this might break things
          previousCoin = this._grid[i][j];
          // console.log("previousCoin:", previousCoin);
        } else {
          horizontalContinousCoinCount = 0;
        }

        if (horizontalContinousCoinCount === 4) {
          console.log(`Winner (horizontal)! ${previousCoin}`);
          return previousCoin;
        }
      }
    }

    console.log(this._grid);
    console.log("There was no Winner");
  }
}

const newGame1 = new ConnectFour();

newGame1.playTurn(2, "red");
newGame1.playTurn(2, "red");
newGame1.playTurn(2, "red");
newGame1.playTurn(2, "red");

newGame1.getWinner();

const newGame2 = new ConnectFour();

newGame2.playTurn(1, "blue");
newGame2.playTurn(2, "blue");
newGame2.playTurn(3, "blue");
newGame2.playTurn(4, "blue");

newGame2.getWinner();

const newGame3 = new ConnectFour();

newGame3.playTurn(2, "red");
newGame3.playTurn(2, "red");
newGame3.playTurn(2, "blue");
newGame3.playTurn(2, "red");
newGame3.playTurn(2, "red");
newGame3.playTurn(2, "red");

const newGame4 = new ConnectFour();

newGame4.playTurn(1, "blue");
newGame4.playTurn(2, "blue");
newGame4.playTurn(3, "red");
newGame4.playTurn(4, "blue");
newGame4.playTurn(5, "blue");
newGame4.playTurn(4, "blue");
newGame4.playTurn(5, "red");
