import Menu from "./Menu.js";
import Tetris from "./Tetris.js";

import { useGameOver } from "../hooks/useGameOver.js";

export default function Game({ rows, columns }) {
  // Initialize state variable and setters
  const [gameOver, setGameOver, resetGameOver] = useGameOver();

  // Reset gameOver state to false
  function startGame() {
    resetGameOver();
  }

  // Return Menu component and pass startGame() if gameOver == true
  // Otherwise return Tetris component to play the game
  return (
    <div className="Game">
      {gameOver ? (
        <Menu onClick={() => startGame()} />
      ) : (
        <Tetris rows={rows} columns={columns} setGameOver={setGameOver} />
      )}
    </div>
  );
}
