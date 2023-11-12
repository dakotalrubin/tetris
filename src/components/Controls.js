import "../styles/Controls.css";

// Display game controls on-screen
export default function Controls() {
  return (
    <div>
      <div className="Controls Controls-Text">Controls:</div>
      <ul className="Controls">
        <li>← &nbsp; Move Left</li>
        <li>→ &nbsp; Move Right</li>
        <br></br>
        <li>↑ &nbsp; &#8202; Rotate</li>
        <li>↓ &nbsp; &#8202; Slow Drop</li>
        <li>__ &#8201; Fast Drop</li>
        <br></br>
        <li>P &nbsp; &#8202; Pause</li>
        <li>Q &#8201; &#8202; Quit</li>
      </ul>
    </div>
  );
}
