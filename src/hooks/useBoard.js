import { useState, useEffect } from "react";
import { buildBoard, nextBoard } from "../utils/Board.js";

import { hasCollision } from "../utils/Board.js";

// Custom useBoard hook
export const useBoard = ({
  rows,
  columns,
  player,
  resetPlayer,
  addLinesCleared,
  setIsOpen,
}) => {
  // Initialize state variable and setter
  const [board, setBoard] = useState(buildBoard({ rows, columns }));

  // Update game board any time player, resetPlayer or addLinesCleared changes
  useEffect(() => {
    // Check if a spawning tetromino instantly collides with anything
    let collided = hasCollision({
      board,
      position: player.position,
      shape: player.tetromino.shape,
    });

    // Only render the rows of the spawning tetromino that would fit on-screen
    if (collided) {
    }

    setBoard((previousBoard) =>
      nextBoard({
        board: previousBoard,
        player,
        resetPlayer,
        addLinesCleared,
      }),
    );

    // Render a ModalDialog box for a game over
    if (collided) {
      setIsOpen(true);
    }
  }, [player, resetPlayer, addLinesCleared]);

  // Return state variable and setter
  return [board];
};
