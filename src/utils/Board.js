import { defaultCell } from "./Cell.js";

// Build game board using size info (rows and columns)
export const buildBoard = ({ rows, columns }) => {
  const builtRows = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({ ...defaultCell }))
  );

  // Return board and size info (rows and columns)
  return {
    rows: builtRows,
    size: { rows, columns }
  };
};
