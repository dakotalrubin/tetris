import { useState, useCallback } from "react";

// Build game stats info
const buildGameStats = () => ({
  level: 1,
  linesCompleted: 0,
  linesPerLevel: 10,
  points: 0
});

// Custom useGameStats hook
export const useGameStats = () => {
  // Initialize state variable and setter
  const [gameStats, setGameStats] = useState(buildGameStats());

  // Update number of board lines cleared, unused for now
  const addLinesCleared = useCallback(() => {}, []);

  // Return state variable and updated number of board lines cleared
  return [gameStats, addLinesCleared];
};
