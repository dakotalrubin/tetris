import { createRoot } from "react-dom/client";

import App from "./App.js";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// Prevent loss-of-focus on the invisible text field so inputs always register
rootElement.addEventListener("mousedown", (event) => {
  event.preventDefault();
  event.stopPropagation();
});

root.render(<App />);
