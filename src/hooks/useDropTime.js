import { useState, useCallback, useEffect } from "react";

// Set default values in ms for auto-drop time stats
const defaultDropTime = 1000;
const minimumDropTime = 100;
const speedIncrement = 50;

// Custom useDropTime hook
export const useDropTime = ({ gameStats }) => {
  // Initialize state variables and setters
  const [dropTime, setDropTime] = useState(defaultDropTime);
  const [previousDropTime, setPreviousDropTime] = useState();

  // Unpause the game by starting the tetromino auto-drop timer
  const resumeDropTime = useCallback(() => {
    // Return if the game hasn't been paused
    if (!previousDropTime) {
      return;
    }

    // Set current dropTime to previousDropTime to unpause the auto-drop time
    setDropTime(previousDropTime);

    // Erase the stored previousDropTime
    setPreviousDropTime(null);
  }, [previousDropTime]);

  // Pause the game by stopping the tetromino auto-drop timer
  const pauseDropTime = useCallback(() => {
    // Store current dropTime as previousDropTime
    if (dropTime) {
      setPreviousDropTime(dropTime);
    }

    // Erase the current dropTime to pause the auto-drop timer
    setDropTime(null);
  }, [dropTime, setPreviousDropTime]);

  // Call useEffect every time the game's level or auto-drop time changes
  useEffect(() => {
    // Update game speed for every level after the first
    const speed = speedIncrement * (gameStats.level - 1);

    // Update auto-drop time using calculated speed and minimum auto-drop time
    const newDropTime = Math.max(defaultDropTime - speed, minimumDropTime);

    // Implement new auto-drop time whenever the game's level gets updated
    setDropTime(newDropTime);
  }, [gameStats.level, setDropTime]);

  // Return state variable and setters
  return [dropTime, pauseDropTime, resumeDropTime];
};
