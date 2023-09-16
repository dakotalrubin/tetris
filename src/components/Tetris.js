import "../../styles/Tetris.css";

import Board from "./Board.js";
import GameStats from "./GameStats.js";

import { useBoard } from "../hooks/useBoard.js";
import { useGameStats } from "../hooks/useGameStats.js";

export default function Tetris({ rows, columns, setGameOver }) {
  // Initialize state variables and setters
  const [board, setBoard] = useBoard({ rows, columns });
  const [gameStats, addLinesCleared] = useGameStats();

  // Return Board component and pass size info (rows and columns)
  return (
    <div className="Tetris">
      <Board board={board} />
      <GameStats gameStats={gameStats} />
    </div>
  );
}
