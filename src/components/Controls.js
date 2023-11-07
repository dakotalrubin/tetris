import "../../styles/Controls.css";

export default function Controls() {
  // Display game controls on-screen
  return (
    <div>
      <div className="Controls Controls-Text">Controls:</div>
      <ul className="Controls">
        <li>← &nbsp; Move Left</li>
        <li>→ &nbsp; Move Right</li>
        <br></br>
        <li>↑ &nbsp; &#8202; Rotate</li>
        <li>↓ &nbsp; &#8202; Slow Drop</li>
        <li>␣ &#8202; &#8202; Fast Drop</li>
        <br></br>
        <li>P &nbsp; &#8202; Pause</li>
        <li>Q &#8201; &#8202; Quit</li>
      </ul>
    </div>
  );
}
