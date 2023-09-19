import { defaultCell } from "./Cell.js";
import { transferToBoard } from "./Tetrominoes.js";

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

  // Update the rows in the game board to accomodate this tetromino
  rows = transferToBoard({
    className: tetromino.className,
    isOccupied: player.collided,
    position,
    rows,
    shape: tetromino.shape
  });

  // Return the updated game board
  return {
    rows,
    size: { ...board.size }
  };
};
