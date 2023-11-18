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

  // Update the game board any time player, resetPlayer or addLinesCleared changes
  useEffect(() => {
    // Check if a spawning tetromino instantly collides with anything
    let collided = hasCollision({
      board,
      position: player.position,
      shape: player.tetromino.shape,
    });

    // Update the game board
    setBoard((previousBoard) =>
      nextBoard({
        board: previousBoard,
        player,
        resetPlayer,
        addLinesCleared,
      }),
    );

    // Allow a ModalDialog box to be rendered for a game over
    if (collided) {
      setIsOpen(true);
    }
  }, [player, resetPlayer, addLinesCleared]);

  // Return state variable and setter
  return [board];
};
