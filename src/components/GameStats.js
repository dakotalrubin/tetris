import "../../styles/GameStats.css";

import React from "react";

const GameStats = ({ gameStats }) => {
  // Extract different attributes from gameStats
  const { level, points, linesCompleted, linesPerLevel } = gameStats;

  // Calculate the number of lines remaining in the current level
  const linesToNextLevel = linesPerLevel - linesCompleted;

  // Display game stats on-screen
  return (
    <ul className="GameStats GameStats_right">
      <li>Level:</li>
      <li className="Value">{level}</li>
      <li>Lines to Next Level:</li>
      <li className="Value">{linesToNextLevel}</li>
      <li>Points:</li>
      <li className="Value">{points}</li>
    </ul>
  );
};

// Only render when GameStats changes
export default React.memo(GameStats);
