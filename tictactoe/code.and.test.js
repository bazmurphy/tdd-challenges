class TicTacToe {
  constructor() {
    this._grid = {
      top_left: null,
      top_middle: null,
      top_right: null,
      centre_left: null,
      centre_middle: null,
      centre_right: null,
      bottom_left: null,
      bottom_middle: null,
      bottom_right: null,
    };
  }

  get grid() {
    return this._grid;
  }

  set grid(grid) {
    this._grid = grid;
  }

  getWinner() {
    // specify all the possible winning combinations
    const winningCombinations = [
      ["top_left", "top_middle", "top_right"], // horizontal top
      ["centre_left", "centre_middle", "centre_right"], // horizontal middle
      ["bottom_left", "bottom_middle", "bottom_right"], // horizontal bottom
      ["top_left", "centre_left", "bottom_left"], // vertical left
      ["top_middle", "centre_middle", "bottom_middle"], // vertical middle
      ["top_right", "centre_right", "bottom_right"], // vertical right
      ["top_left", "centre_middle", "bottom_right"], // diagonal left
      ["top_right", "centre_middle", "bottom_left"], // diagonal right
    ];

    // initialise the winner as null (for the default return)
    let winner = null;

    // iterate through the winning combinations
    for (const combination of winningCombinations) {
      // create a temporary array to store the current values
      const currentCheck = [];

      // iterate through the combination and use the value as the key to access the value on the grid object
      // eg. this_grid["top_left"]
      for (const cell of combination) {
        // push the value to the temporary array;
        currentCheck.push(this._grid[cell]);
      }

      // sanity check:
      console.log("currentCheck:", currentCheck);

      // if every value in the temporary array is equal, we have a winner, so break out of the loop
      if (
        currentCheck.every(
          (cell, _, array) => cell !== null && cell === array[0]
        )
      ) {
        winner = currentCheck[0];
        break; // (in order to use "break" i can't use "forEach" hence the "for of" above^)
      }
    }

    // finally return the winner, either default null, or "X" or "O"
    return winner;
  }

  playTurn(position, result) {
    if (this.grid[position] === null) {
      this.grid[position] = result;
      return true;
    }
    return false;
  }
}

test("grid", () => {
  expect(new TicTacToe().grid).toStrictEqual({
    top_left: null,
    top_middle: null,
    top_right: null,
    centre_left: null,
    centre_middle: null,
    centre_right: null,
    bottom_left: null,
    bottom_middle: null,
    bottom_right: null,
  });
});

test("play_turn 1", () => {
  let game = new TicTacToe();
  let result = game.playTurn("top_left", "X");
  expect(result).toBe(true);
  expect(game.grid).toStrictEqual({
    top_left: "X",
    top_middle: null,
    top_right: null,
    centre_left: null,
    centre_middle: null,
    centre_right: null,
    bottom_left: null,
    bottom_middle: null,
    bottom_right: null,
  });
});

test("play_turn 2", () => {
  let game = new TicTacToe();
  let result = game.playTurn("top_left", "O");
  expect(result).toBe(true);
  expect(game.grid).toStrictEqual({
    top_left: "O",
    top_middle: null,
    top_right: null,
    centre_left: null,
    centre_middle: null,
    centre_right: null,
    bottom_left: null,
    bottom_middle: null,
    bottom_right: null,
  });
});

test("play_turn 3", () => {
  let game = new TicTacToe();
  let result = game.playTurn("centre_middle", "O");
  expect(result).toBe(true);
  expect(game.grid).toStrictEqual({
    top_left: null,
    top_middle: null,
    top_right: null,
    centre_left: null,
    centre_middle: "O",
    centre_right: null,
    bottom_left: null,
    bottom_middle: null,
    bottom_right: null,
  });
});

test("play_turn 4, cannot play on a square already filled", () => {
  let game = new TicTacToe();
  let result = game.playTurn("centre_middle", "O");
  expect(result).toBe(true);

  result = game.playTurn("centre_middle", "X");
  // trying to play on a square already played; that is cheating
  expect(result).toBe(false);

  // we do not update the grid
  expect(game.grid).toStrictEqual({
    top_left: null,
    top_middle: null,
    top_right: null,
    centre_left: null,
    centre_middle: "O",
    centre_right: null,
    bottom_left: null,
    bottom_middle: null,
    bottom_right: null,
  });
});

test("play_turn 5, cannot play on a square that does not exist", () => {
  let game = new TicTacToe();
  let result = game.playTurn("somewhere_else", "O");
  expect(result).toBe(false);

  expect(game.grid).toStrictEqual({
    top_left: null,
    top_middle: null,
    top_right: null,
    centre_left: null,
    centre_middle: null,
    centre_right: null,
    bottom_left: null,
    bottom_middle: null,
    bottom_right: null,
  });
});

test("play_turn 1", () => {
  let game = new TicTacToe();
  let result = game.playTurn("centre_right", "X");
  expect(result).toBe(true);
  expect(game.grid).toStrictEqual({
    top_left: null,
    top_middle: null,
    top_right: null,
    centre_left: null,
    centre_middle: null,
    centre_right: "X",
    bottom_left: null,
    bottom_middle: null,
    bottom_right: null,
  });
});

test("get Winner: No Winner", () => {
  let game = new TicTacToe();
  game.playTurn("centre_middle", "O");
  expect(game.getWinner()).toBe(null);
});

test('get Winner: Horizontal Centre (as "O")', () => {
  let game = new TicTacToe();
  game.playTurn("centre_left", "O");
  game.playTurn("centre_middle", "O");
  game.playTurn("centre_right", "O");
  expect(game.getWinner()).toBe("O");
});

test("get Winner: Horizontal Top", () => {
  let game = new TicTacToe();
  game.playTurn("top_left", "X");
  game.playTurn("top_middle", "X");
  game.playTurn("top_right", "X");
  expect(game.getWinner()).toBe("X");
});

test('get Winner: Horizontal Centre (as "X")', () => {
  let game = new TicTacToe();
  game.playTurn("centre_left", "X");
  game.playTurn("centre_middle", "X");
  game.playTurn("centre_right", "X");
  expect(game.getWinner()).toBe("X");
});

test("get Winner: Horizontal Bottom", () => {
  let game = new TicTacToe();
  game.playTurn("bottom_left", "X");
  game.playTurn("bottom_middle", "X");
  game.playTurn("bottom_right", "X");
  expect(game.getWinner()).toBe("X");
});

test("get Winner: Vertical Left", () => {
  let game = new TicTacToe();
  game.playTurn("bottom_left", "X");
  game.playTurn("centre_left", "X");
  game.playTurn("top_left", "X");
  expect(game.getWinner()).toBe("X");
});

test("get Winner: Vertical Middle", () => {
  let game = new TicTacToe();
  game.playTurn("top_middle", "X");
  game.playTurn("centre_middle", "X");
  game.playTurn("bottom_middle", "X");
  expect(game.getWinner()).toBe("X");
});

test("get Winner: Vertical Right", () => {
  let game = new TicTacToe();
  game.playTurn("top_right", "X");
  game.playTurn("centre_right", "X");
  game.playTurn("bottom_right", "X");
  expect(game.getWinner()).toBe("X");
});

test("get Winner: Diagonal Left", () => {
  let game = new TicTacToe();
  game.playTurn("top_left", "X");
  game.playTurn("centre_middle", "X");
  game.playTurn("bottom_right", "X");
  expect(game.getWinner()).toBe("X");
});

test("get Winner: Diagonal Right", () => {
  let game = new TicTacToe();
  game.playTurn("top_right", "O");
  game.playTurn("centre_middle", "O");
  game.playTurn("bottom_left", "O");
  expect(game.getWinner()).toBe("O");
});
