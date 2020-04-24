import React from "react";
import { Ctx } from "../context/Provider";
import { IUseCell, ICellProps, ECellValue, ECellState, EFace } from "../types";
import { flatten } from "../utils/utils";

export default ({ rowIndex, colIndex, state, value }: ICellProps): IUseCell => {
  const ctx = React.useContext(Ctx);

  const handleClick = (e: React.MouseEvent): void => {
    // not live, set live
    if (!ctx?.live) ctx?.setLive(true);

    // if flagged, return
    if (ctx?.cells[rowIndex][colIndex].state === ECellState.flagged) return;

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

  const handleMouseDown = (state: ECellState, e: React.MouseEvent): void => {
    if (e.nativeEvent.button === 2 && ctx?.live) {
      ctx?.setCells((prevCells) => {
        const newCells = JSON.parse(JSON.stringify(prevCells));
        if (newCells[rowIndex][colIndex].state !== ECellState.flagged) {
          newCells[rowIndex][colIndex].state = ECellState.flagged;
          ctx.setFlags((prevFlags) => prevFlags - 1);
        } else {
          newCells[rowIndex][colIndex].state = ECellState.notvisible;
          ctx.setFlags((prevFlags) => prevFlags + 1);
        }
        return newCells;
      });
      return;
    }
    if (state === ECellState.notvisible) ctx?.setFace(EFace.worried);
  };

  const handleMouseUp = (state: ECellState): void => {
    if (state === ECellState.notvisible) ctx?.setFace(EFace.default);
  };

  return {
    handleClick,
    handleMouseDown,
    handleMouseUp,
  };
};
