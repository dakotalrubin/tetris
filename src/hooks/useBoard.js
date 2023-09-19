import { useState, useEffect } from "react";
import { buildBoard, nextBoard } from "../utils/Board.js";

// Custom useBoard hook
export const useBoard = ({
  rows,
  columns,
  player,
  resetPlayer,
  addLinesCleared
}) => {
  // Initialize state variable and setter
  const [board, setBoard] = useState(buildBoard({ rows, columns }));

  // Update game board any time player, resetPlayer or addLinesCleared changes
  useEffect(() => {
    setBoard((previousBoard) =>
      nextBoard({
        board: previousBoard,
        player,
        resetPlayer,
        addLinesCleared
      })
    );
  }, [player, resetPlayer, addLinesCleared]);

  // Return state variable and setter
  return [board];
};
