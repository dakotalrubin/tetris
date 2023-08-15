import "../styles/styles.css";
import Game from "./components/game.js";

export default function App() {
  return (
    <div className="App">
      <Game rows={20} columns={10} />
    </div>
  );
}
