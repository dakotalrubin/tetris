import "../../styles/Tetris.css";

import Board from "./Board.js";
import GameStats from "./GameStats.js";
import Previews from "./Previews.js";

import { useBoard } from "../hooks/useBoard.js";
import { useGameStats } from "../hooks/useGameStats.js";
import { usePlayer } from "../hooks/usePlayer.js";

export default function Tetris({ rows, columns, setGameOver }) {
  // Initialize state variables and setters
  const [board, setBoard] = useBoard({ rows, columns });
  const [gameStats, addLinesCleared] = useGameStats();
  const [player, setPlayer, resetPlayer] = usePlayer();

  // Return Board component and pass size info (rows and columns)
  // Also return GameStats component showing info during gameplay
  // and a Previews component that shows a sneak-peek at upcoming tetrominoes
  return (
    <div className="Tetris">
      <Board board={board} />
      <GameStats gameStats={gameStats} />
      <Previews tetrominoes={player.tetrominoes} />
    </div>
  );
}
