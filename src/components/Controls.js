import "../styles/Controls.css";

// Display game controls on-screen
export default function Controls() {
  return (
    <div>
      <div className="Controls Controls-Text">Controls:</div>
      <ul className="Controls">
        <li>← &nbsp; &nbsp; &nbsp; Move Left</li>
        <li>→ &nbsp; &nbsp; &nbsp; Move Right</li>
        <br></br>
        <li>↑ &nbsp; &nbsp; &nbsp; &#8201; Rotate</li>
        <li>↓ &nbsp; &nbsp; &nbsp; &#8201; Slow Drop</li>
        <li>
          <span style={{ fontSize: "10px" }}>SPACE</span>&nbsp; &#8202; Fast
          Drop
        </li>
        <br></br>
        <li>P &nbsp; &nbsp; &nbsp; &#8202; Pause</li>
        <li>Q &nbsp; &nbsp; &#8201; &#8202; Quit</li>
      </ul>
    </div>
  );
}
