import { ECellValue, ECellState, TCell } from "../types";

export const generateCells = (width: number, height: number): TCell[][] => {
  const cells: TCell[][] = [...Array(height)].map((row) =>
    Array(width).fill({
      value: ECellValue.none,
      state: ECellState.notvisible,
    })
  );
  return cells;
};
