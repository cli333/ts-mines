import React from "react";
import "./Cell.scss";
import { ICellProps, ECellState, ECellValue } from "../../types";

const Cell: React.FC<ICellProps> = ({ value, state, rowIndex, colIndex }) => {
  console.log({ state, value });

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
    <div className={`Cell ${state === ECellState.visible ? "visible" : ""}`}>
      {renderCell()}
    </div>
  );
};

export default Cell;
