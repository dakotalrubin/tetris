import { useState, useCallback } from "react";

import { randomTetromino } from "../utils/Tetrominoes.js";

// Build player info
const buildPlayer = (previous) => {
  let tetrominoes;

  // If previous tetromino array exists, insert a random tetromino at the front
  // Else create a tetromino array of 5 random tetrominoes
  if (previous) {
    tetrominoes = [...previous.tetrominoes];
    tetrominoes.unshift(randomTetromino());
  } else {
    tetrominoes = Array(5)
      .fill(0)
      .map((_) => randomTetromino());
  }

  // Return default player data
  return {
    collided: false,
    isFastDropping: false,
    position: { row: 0, column: 4 },
    tetrominoes,
    tetromino: tetrominoes.pop()
  };
};

// Custom usePlayer hook
export const usePlayer = () => {
  // Initialize state variable and setter
  const [player, setPlayer] = useState(buildPlayer());

  // Call useState() setter to declare custom setter
  const resetPlayer = useCallback(() => {
    setPlayer((prev) => buildPlayer(prev));
  }, []);

  // Return state variable and setters
  return [player, setPlayer, resetPlayer];
};
