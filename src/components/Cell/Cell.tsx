import React from "react";
import "./Cell.scss";
import { ICellProps, ECellState, ECellValue, EFace } from "../../types";
import { Ctx } from "../../context/Provider";

const Cell: React.FC<ICellProps> = ({ value, state, rowIndex, colIndex }) => {
  const ctx = React.useContext(Ctx);

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
    <div
      className={`Cell ${
        state === ECellState.visible ? "visible" : ""
      } value-${value}`}
      onMouseDown={() => ctx?.setFace(EFace.worried)}
      onMouseUp={() => ctx?.setFace(EFace.default)}
      onClick={() => ctx?.setLive(true)}
    >
      {renderCell()}
    </div>
  );
};

export default Cell;
