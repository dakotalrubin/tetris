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

  // Update game stats every time there's a new number of board lines cleared
  const addLinesCleared = useCallback((lines) => {
    setGameStats((previous) => {
      // Create a basic scoring formula
      const points = previous.points + lines * 100;

      // Store constant lines per level
      const { linesPerLevel } = previous;

      // Store updated total of lines cleared
      const newLinesCompleted = previous.linesCompleted + lines;

      // Determine whether to increase the game's level
      const level =
        newLinesCompleted >= linesPerLevel
          ? previous.level + 1
          : previous.level;

      // Make the number of lines completed reset after every 10 lines
      const linesCompleted = newLinesCompleted % linesPerLevel;

      // Return all game stats for display
      return {
        level,
        linesCompleted,
        linesPerLevel,
        points
      };
    }, []);
  }, []);

  // Return state variable and updated number of board lines cleared
  return [gameStats, addLinesCleared];
};
