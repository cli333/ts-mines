import React from "react";
import { Ctx } from "../context/Provider";
import { IUseCell, ICellProps, ECellValue, ECellState, EFace } from "../types";
import { flatten } from "../utils/utils";

export default ({ rowIndex, colIndex, state, value }: ICellProps): IUseCell => {
  const ctx = React.useContext(Ctx);

  const handleClick = () => {
    // not live, set live
    if (!ctx?.live) ctx?.setLive(true);

    // if visible, click does nothing
    if (state === ECellState.visible) return;

    // if not visible, set visible
    if (state === ECellState.notvisible) {
      ctx?.setCells((prevCells) => {
        const newCells = JSON.parse(JSON.stringify(prevCells));
        const currentCell = newCells[rowIndex][colIndex];
        currentCell.state = ECellState.visible;
        // flatten surrounding cells
        flatten(currentCell.value, rowIndex + 1, colIndex, newCells);
        flatten(currentCell.value, rowIndex - 1, colIndex, newCells);
        flatten(currentCell.value, rowIndex, colIndex + 1, newCells);
        flatten(currentCell.value, rowIndex, colIndex - 1, newCells);
        return newCells;
      });
    }

    // if bomb, set face, set to lose
    if (value === ECellValue.bomb) {
      ctx?.setLive(false);
      ctx?.setFace(EFace.lost);
      ctx?.setEndGame(true);
    }
  };

  return {
    handleClick,
  };
};
