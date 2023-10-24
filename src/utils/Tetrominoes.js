const className = "Tetromino";

// Enumerate each tetromino shape
export const TETROMINOES = {
  I: {
    shape: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    ],
    className: `${className} ${className}_i`
  },
  J: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0]
    ],
    className: `${className} ${className}_j`
  },
  L: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1]
    ],
    className: `${className} ${className}_l`
  },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    className: `${className} ${className}_o`
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    className: `${className} ${className}_s`
  },
  T: {
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0]
    ],
    className: `${className} ${className}_t`
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    className: `${className} ${className}_z`
  }
};

// Transfer a tetromino from the preview board to the game board
export const transferToBoard = ({
  className,
  isOccupied,
  position,
  rows,
  shape
}) => {
  // Iterate through each cell in each row
  shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      // Track each occupied cell's position in the preview board
      if (cell) {
        const occupied = isOccupied;
        const new_y = y + position.row;
        const new_x = x + position.column;
        rows[new_y][new_x] = { occupied, className };
      }
    });
  });

  // Return all transferred cell information from preview board to game board
  return rows;
};

// Return a randomly-selected tetromino
export const randomTetromino = () => {
  const keys = Object.keys(TETROMINOES);
  const index = Math.floor(Math.random() * keys.length);
  const key = keys[index];
  return TETROMINOES[key];
};

// Rotate the current game piece
export const rotate = ({ piece, direction }) => {
  // Transpose rows and columns
  const newPiece = piece.map((_, index) =>
    piece.map((column) => column[index])
  );

  // Reverse rows to get a rotated matrix
  if (direction > 0) {
    return newPiece.map((row) => row.reverse());
  }

  return newPiece.reverse();
};
