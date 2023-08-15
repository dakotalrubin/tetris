import Menu from "./menu.js";
import { useGameOver } from "../hooks/useGameOver.js";

const Game = ({ rows, columns }) => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();

  const start = () => {
    resetGameOver();
    console.log(`Start! gameOver is ${gameOver}.`);
  };

  return (
    <div className="game">
      <Menu onClick={start} />
    </div>
  );
};

export default Game;
