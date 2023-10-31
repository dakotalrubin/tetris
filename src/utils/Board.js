import { defaultCell } from "./Cell.js";
import { transferToBoard } from "./Tetrominoes.js";
import { movePlayer } from "./PlayerController.js";

// Build game board using size info (rows and columns)
export const buildBoard = ({ rows, columns }) => {
  const builtRows = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({ ...defaultCell }))
  );

  // Return board and size info (rows and columns)
  return {
    rows: builtRows,
    size: { rows, columns }
  };
};

// Locate final tetromino drop position by looking ahead through all rows
const findDropPosition = ({ board, position, shape }) => {
  // Initial row position
  let row = 0;

  // Total number of board rows + 1 minus current row position
  let max = board.size.rows - position.row + 1;

  // Keep trying to place the tetromino and check for collision
  for (let i = 0; i < max; i++) {
    // Looking ahead a certain number of rows; the column stays constant
    const change = { row: i, column: 0 };

    // Store the result from attempting to move the current tetromino
    const result = movePlayer({ change, position, shape, board });

    // Check for collision
    const { collided } = result;

    // Exit loop if collision occurs
    if (collided) {
      break;
    }

    // Increment row if no collision occurs
    row = position.row + i;
  }

  // Return tetromino position with the same column, but update the row
  return { ...position, row };
};

// Update game board using player info
export const nextBoard = ({ board, player, resetPlayer, addLinesCleared }) => {
  // Extract a specific tetromino and its position from player info
  const { tetromino, position } = player;

  // For each cell in each row, if that cell is occupied,
  // keep the cell's value in the updated game board
  // Else if the cell is unoccupied, clear the cell
  let rows = board.rows.map((row) =>
    row.map((cell) => (cell.occupied ? cell : { ...defaultCell }))
  );

  // Store final tetromino drop position
  const dropPosition = findDropPosition({
    board,
    position,
    shape: tetromino.shape
  });

  // Place ghost tetromino where fast-drop collision would occur
  const className = `${tetromino.className} ${
    player.isFastDropping ? "" : "Ghost"
  }`;

  // Update the rows in the game board to show this ghost tetromino
  rows = transferToBoard({
    className,
    isOccupied: player.isFastDropping,
    position: dropPosition,
    rows,
    shape: tetromino.shape
  });

  // Update the rows in the game board to show this tetromino if the player
  // isn't fast-dropping
  if (!player.isFastDropping) {
    // If collision occurs, mark the board cells as collided
    rows = transferToBoard({
      className: tetromino.className,
      isOccupied: player.collided,
      position,
      rows,
      shape: tetromino.shape
    });
  }

  // Reset the player's game piece at the top of the board
  // after a collision or when fast-dropping
  if (player.collided || player.isFastDropping) {
    resetPlayer();
  }

  // Return the updated game board
  return {
    rows,
    size: { ...board.size }
  };
};

// Check whether a game piece fits within the game board
export const isWithinBoard = ({ board, position, shape }) => {
  // Traverse through each row of the shape
  for (let y = 0; y < shape.length; y++) {
    // Check current vertical position
    const row = y + position.row;

    // Traverse through each column of the shape
    for (let x = 0; x < shape[y].length; x++) {
      // Check the given row and column of the shape for a tetromino piece
      if (shape[y][x]) {
        // Check current horizontal position
        const column = x + position.column;

        // Check the given row and column of the board for a tetromino piece
        const isValidPosition = board.rows[row] && board.rows[row][column];

        // Make sure the game piece fits inside the board
        if (!isValidPosition) {
          return false;
        }
      }
    }
  }

  return true;
};

// Check whether a game piece can collide with other game objects
export const hasCollision = ({ board, position, shape }) => {
  // Traverse through each row of the shape
  for (let y = 0; y < shape.length; y++) {
    // Check current vertical position
    const row = y + position.row;

    // Traverse through each column of the shape
    for (let x = 0; x < shape[y].length; x++) {
      // Check the given row and column of the shape for a tetromino piece
      if (shape[y][x]) {
        // Check current horizontal position
        const column = x + position.column;

        // Check whether the given row and column of the board is occupied
        if (
          board.rows[row] &&
          board.rows[row][column] &&
          board.rows[row][column].occupied
        ) {
          return true;
        }
      }
    }
  }

  return false;
};
