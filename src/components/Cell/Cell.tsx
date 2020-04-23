import React from "react";
import "./Cell.scss";
import { ICellProps, ECellState, ECellValue, EFace } from "../../types";
import { Ctx } from "../../context/Provider";
import useCell from "../../hooks/useCell";

const Cell: React.FC<ICellProps> = ({ value, state, rowIndex, colIndex }) => {
  const ctx = React.useContext(Ctx);
  const { handleClick } = useCell({ rowIndex, colIndex, state, value });

  const renderCell = (): React.ReactNode => {
    switch (state) {
      case ECellState.visible:
        switch (value) {
          case ECellValue.bomb:
            return (
              <span role="img" aria-label="bomb">
                💣
              </span>
            );
          case ECellValue.none:
            return <span></span>;
          default:
            return <span>{value}</span>;
        }
      case ECellState.flagged:
        return (
          <span role="img" aria-label="flag">
            🚩
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <button
      className={`Cell ${
        state === ECellState.visible ? "visible" : ""
      } value-${value}`}
      disabled={ctx?.endGame}
      onMouseDown={() =>
        state === ECellState.notvisible && ctx?.setFace(EFace.worried)
      }
      onMouseUp={() =>
        state === ECellState.notvisible && ctx?.setFace(EFace.default)
      }
      onClick={() => handleClick()}
    >
      {renderCell()}
    </button>
  );
};

export default Cell;
