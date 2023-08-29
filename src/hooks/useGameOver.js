import { useCallback, useState } from "react";

// Custom useGameOver hook
export const useGameOver = () => {
  // Initialize state variable
  const [gameOver, setGameOver] = useState(true);

  // Call useState() setter to declare custom setter
  const resetGameOver = useCallback(() => {
    setGameOver(false);
  }, []);

  // Return state variable and setters
  return [gameOver, setGameOver, resetGameOver];
};
