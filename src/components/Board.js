import "../styles/Board.css";

import BoardCell from "./BoardCell.js";

export default function Board({ board }) {
  // Set up dynamic CSS grid based on rows and columns of specific board
  const boardStyles = {
    gridTemplateRows: `repeat(${board.size.rows}, 1fr)`,
    gridTemplateColumns: `repeat(${board.size.columns}, 1fr)`
  };

  // Return a board composed of unique cells
  return (
    <div className="Board" style={boardStyles}>
      {board.rows.map((row, y) =>
        row.map((cell, x) => (
          <BoardCell key={x * board.size.columns + x} cell={cell} />
        ))
      )}
    </div>
  );
}
