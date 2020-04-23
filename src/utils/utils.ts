import { ECellValue, ECellState, TCell } from "../types";

export const generateCells = (
  cols: number,
  rows: number,
  bombs = 10
): TCell[][] => {
  const cells: TCell[][] = [];
  for (let row = 0; row < rows; row++) {
    cells.push([]);
    for (let col = 0; col < cols; col++) {
      cells[row].push({
        value: ECellValue.none,
        state: ECellState.visible,
      });
    }
  }

  let bombsPlaced = 0;
  while (bombsPlaced < bombs) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    const currentCell = cells[row][col];
    if (currentCell.value !== ECellValue.bomb) {
      currentCell.value = ECellValue.bomb;
      bombsPlaced++;
    }
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (cells[row][col].value === ECellValue.bomb) {
        increment(row + 1, col, cells);
        increment(row - 1, col, cells);
        increment(row, col + 1, cells);
        increment(row, col - 1, cells);
        increment(row - 1, col - 1, cells);
        increment(row - 1, col + 1, cells);
        increment(row + 1, col - 1, cells);
        increment(row + 1, col + 1, cells);
      }
    }
  }

  return cells;
};

function increment(row: number, col: number, cells: TCell[][]): void {
  if (
    cells[row] &&
    cells[row][col] &&
    cells[row][col].value !== ECellValue.bomb
  ) {
    cells[row][col].value++;
  }
}
