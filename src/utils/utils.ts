import { ECellValue, ECellState, TCell } from "../types";

export const generateCells = (
  cols: number,
  rows: number,
  bombs: number
): TCell[][] => {
  const cells: TCell[][] = [];
  for (let row = 0; row < rows; row++) {
    cells.push([]);
    for (let col = 0; col < cols; col++) {
      cells[row].push({
        value: ECellValue.none,
        state: ECellState.notvisible,
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

export const flatten = (
  value: ECellValue,
  rowIndex: number,
  colIndex: number,
  cells: TCell[][]
): void => {
  if (
    !cells[rowIndex] ||
    !cells[rowIndex][colIndex] ||
    cells[rowIndex][colIndex].state === ECellState.visible ||
    cells[rowIndex][colIndex].state === ECellState.flagged ||
    cells[rowIndex][colIndex].value === ECellValue.bomb ||
    cells[rowIndex][colIndex].value !== value
  ) {
    return;
  } else {
    const currentCell = cells[rowIndex][colIndex];
    currentCell.state = ECellState.visible;
    flatten(value, rowIndex + 1, colIndex, cells);
    flatten(value, rowIndex - 1, colIndex, cells);
    flatten(value, rowIndex, colIndex + 1, cells);
    flatten(value, rowIndex, colIndex - 1, cells);
  }
};

export const hasPlayerWon = (cells: TCell[][], bombs: number): boolean => {
  // check if unopened cells = number of bombs
  let numberUnopenedCells = 0;
  for (let row = 0; row < cells.length; row++) {
    for (let col = 0; col < cells[0].length; col++) {
      if (
        cells[row][col].state === ECellState.flagged ||
        cells[row][col].state === ECellState.notvisible
      ) {
        numberUnopenedCells++;
      }
    }
  }
  console.log(numberUnopenedCells, 96);
  return numberUnopenedCells === bombs;
};
