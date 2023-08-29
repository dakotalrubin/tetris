import "../styles/App.css";

import Game from "./components/Game.js";

export default function App() {
  // Return Game component with given rows and columns
  return (
    <div className="App">
      <Game rows={20} columns={10} />
    </div>
  );
}
