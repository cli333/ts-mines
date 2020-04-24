import React from "react";
import "./Cell.scss";
import { ICellProps, ECellState, ECellValue } from "../../types";
import { Ctx } from "../../context/Provider";
import useCell from "../../hooks/useCell";

const Cell: React.FC<ICellProps> = ({
  value,
  state,
  rowIndex,
  colIndex,
  triggered,
}) => {
  const ctx = React.useContext(Ctx);

  const { handleClick, handleMouseDown, handleMouseUp } = useCell({
    rowIndex,
    colIndex,
    state,
    value,
  });

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
      } value-${value} ${triggered ? "triggered" : ""}`}
      disabled={ctx?.endGame}
      onMouseDown={(e) => handleMouseDown(state, e)}
      onMouseUp={() => handleMouseUp(state)}
      onClick={(e) => handleClick(e)}
      onContextMenu={(e) => e.preventDefault()}
    >
      {renderCell()}
    </button>
  );
};

export default Cell;
