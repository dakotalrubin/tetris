import "../../styles/Tetris.css";

import Controls from "./Controls.js";
import Board from "./Board.js";
import GameStats from "./GameStats.js";
import Previews from "./Previews.js";
import GameController from "./GameController.js";

import { useBoard } from "../hooks/useBoard.js";
import { useGameStats } from "../hooks/useGameStats.js";
import { usePlayer } from "../hooks/usePlayer.js";

export default function Tetris({ rows, columns, setGameOver }) {
  // Initialize state variables and setters
  const [gameStats, addLinesCleared] = useGameStats();
  const [player, setPlayer, resetPlayer] = usePlayer();
  const [board, setBoard] = useBoard({
    rows,
    columns,
    player,
    resetPlayer,
    addLinesCleared
  });

  // Return a Controls component showing relevant inputs for the player
  // Also return Board component and pass size info (rows and columns)
  // The GameStats component shows info during gameplay
  // and a Previews component that shows a sneak-peek at upcoming tetrominoes
  // The GameController component drives all player interaction with the game
  return (
    <div className="Tetris">
      <Controls />
      <Board board={board} />
      <GameStats gameStats={gameStats} />
      <Previews tetrominoes={player.tetrominoes} />
      <GameController
        board={board}
        gameStats={gameStats}
        player={player}
        setGameOver={setGameOver}
        setPlayer={setPlayer}
      />
    </div>
  );
}
