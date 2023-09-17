import "../../styles/Preview.css";

import React from "react";

import { buildBoard } from "../utils/Board.js";
import { transferToBoard } from "../utils/Tetrominoes.js";

import BoardCell from "./BoardCell.js";

const Preview = ({ tetromino, index }) => {
  // Each tetromino has a specific shape and a className
  const { shape, className } = tetromino;

  // Build a 4x4 board to display a tetromino preview
  const board = buildBoard({ rows: 4, columns: 4 });

  // Add a style to increase the top of a tetromino preview
  // so that each preview doesn't overlap
  const style = { top: `${index * 12}%` };

  // Transfer a tetromino from the preview board to the game board
  board.rows = transferToBoard({
    className,
    isOccupied: false,
    position: { row: 0, column: 0 },
    rows: board.rows,
    shape
  });

  // Render a preview board made up of BoardCell components
  return (
    <div className="Preview" style={style}>
      <div className="Preview_Board">
        {board.rows.map((row, y) =>
          row.map((cell, x) => (
            <BoardCell key={x * board.size.columns + x} cell={cell} />
          ))
        )}
      </div>
    </div>
  );
};

// Only render when Preview changes
export default React.memo(Preview);
