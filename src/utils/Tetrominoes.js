const className = "Tetromino";

// Enumerate each tetromino shape
export const TETROMINOES = {
  I: {
    shape: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
    className: `${className} ${className}_i`,
  },
  J: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    className: `${className} ${className}_j`,
  },
  L: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    className: `${className} ${className}_l`,
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    className: `${className} ${className}_o`,
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    className: `${className} ${className}_s`,
  },
  T: {
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    className: `${className} ${className}_t`,
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    className: `${className} ${className}_z`,
  },
};

// Transfer a tetromino from the preview board to the game board
export const transferToBoard = ({
  className,
  isOccupied,
  position,
  rows,
  shape,
}) => {
  // Track when and where collision will occur when transferring a tetromino to the game board
  let futureCollision = false;
  let collisionRow = null;

  // Check each cell in each row of the preview board
  shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      // Check each occupied cell's position in the preview board
      // for potential collision in the game board
      if (cell) {
        const new_y = y + position.row;
        const new_x = x + position.column;

        if (rows[new_y][new_x].occupied) {
          futureCollision = true;
          if (collisionRow === null) {
            collisionRow = new_y;
          }
        }
      }
    });
  });

  // Shift the entire tetromino up to the first unoccupied row
  if (futureCollision) {
    // Find the first unoccupied row
    let spawnRow = collisionRow - 1;

    // Iterate through each cell in each row of the preview board
    shape
      .slice()
      .reverse()
      .forEach((row, y) => {
        row.forEach((cell, x) => {
          // Track each occupied cell's position in the preview board
          // for placement in the game board
          // Set the spawn row upper bound as row 0
          if (cell && spawnRow >= 0) {
            const occupied = isOccupied;
            const new_y = spawnRow;
            const new_x = x + position.column;
            rows[new_y][new_x] = { occupied, className };
          }
        });
        // Ignore empty rows in the preview board
        // Set the new spawn row as one row higher than the current spawn point
        if (y !== 0) {
          spawnRow--;
        }
      });
  } else {
    // Iterate through each cell in each row of the preview board
    shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        // Track each occupied cell's position in the preview board
        // for placement in the game board
        if (cell) {
          const occupied = isOccupied;
          const new_y = y + position.row;
          const new_x = x + position.column;
          rows[new_y][new_x] = { occupied, className };
        }
      });
    });
  }

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
    piece.map((column) => column[index]),
  );

  // Reverse rows to get a rotated matrix
  if (direction > 0) {
    return newPiece.map((row) => row.reverse());
  }

  return newPiece.reverse();
};
