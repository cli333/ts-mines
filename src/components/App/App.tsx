import React from "react";
import "./App.scss";
import NumberDisplay from "../NumberDisplay/NumberDisplay";
import { TCell } from "../../types";
import { generateCells } from "../../utils/utils";
import Cell from "../Cell/Cell";

const App: React.FC = () => {
  const [cells, setCells] = React.useState<TCell[][]>(generateCells(9, 9));

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => <Cell key={`${rowIndex}-${colIndex}`} />)
    );
  };

  return (
    <div className="App">
      <div className="Header">
        <NumberDisplay value={0} />
        <div className="Face">
          <span role="img" aria-label="face">
            😁
          </span>
        </div>
        <NumberDisplay value={0} />
      </div>
      <div className="Body">{renderCells()}</div>
    </div>
  );
};

export default App;
