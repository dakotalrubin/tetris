import { useState } from "react";
import { buildBoard } from "../utils/Board.js";

// Custom useBoard hook
export const useBoard = ({ rows, columns }) => {
  // Initialize state variable
  const [board] = useState(buildBoard({ rows, columns }));

  // Return state variable and setter
  return [board];
};
