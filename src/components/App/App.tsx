import React from "react";
import "./App.scss";
import NumberDisplay from "../NumberDisplay/NumberDisplay";
import Cell from "../Cell/Cell";
import { Ctx } from "../../context/Provider";

const App: React.FC = () => {
  const ctx = React.useContext(Ctx);

  const renderCells = (): React.ReactNode => {
    return ctx?.cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Cell
          key={`${rowIndex}-${colIndex}`}
          {...cell}
          rowIndex={rowIndex}
          colIndex={colIndex}
        />
      ))
    );
  };

  return (
    <React.Fragment>
      <div className="Settings">
        <label htmlFor="rows">Rows</label>
        <input
          name="rows"
          type="number"
          placeholder="9"
          min="9"
          max="30"
          disabled={ctx?.live}
        />
        <label htmlFor="rows">Columns</label>
        <input
          name="columns"
          type="number"
          placeholder="9"
          min="9"
          max="30"
          disabled={ctx?.live}
        />
        <label htmlFor="rows"># Bombs</label>
        <input
          name="bombs"
          type="number"
          placeholder="10"
          min="10"
          max="30"
          disabled={ctx?.live}
        />
      </div>

      <div className="App">
        <div className="Header">
          <NumberDisplay value={ctx?.flags!} />
          <div className="Face">
            <span
              role="img"
              aria-label="face"
              onClick={() => ctx?.reset()}
              onContextMenu={(e) => e.preventDefault()}
            >
              {ctx?.face}
            </span>
          </div>
          <NumberDisplay value={ctx?.time!} />
        </div>
        <div className="Body">{renderCells()}</div>
      </div>
    </React.Fragment>
  );
};

export default App;
