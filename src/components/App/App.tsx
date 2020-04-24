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
      {/* <div className="Settings">
        <label htmlFor="rows">Rows</label>
        <input
          name="rows"
          type="number"
          min="9"
          max="25"
          disabled={ctx?.live}
          value={ctx?.rows!}
          onChange={(e) => ctx?.setRows(+e.target.value)}
          onKeyDown={(e) => e.preventDefault()}
        />
        <label htmlFor="rows">Columns</label>
        <input
          name="columns"
          type="number"
          min="9"
          max="45"
          disabled={ctx?.live}
          value={ctx?.cols!}
          onChange={(e) => ctx?.setCols(+e.target.value)}
          onKeyDown={(e) => e.preventDefault()}
        />
        <label htmlFor="rows"># Bombs</label>
        <input
          name="bombs"
          type="number"
          min="10"
          max={ctx?.rows! * ctx?.cols! - 10}
          disabled={ctx?.live}
          value={ctx?.bombs}
          onChange={(e) => ctx?.setBombs(+e.target.value)}
          onKeyDown={(e) => e.preventDefault()}
        />
      </div> */}

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
        <div
          className="Body"
          style={{
            gridTemplateColumns: `repeat(${ctx?.cols}, 1fr)`,
            gridTemplateRows: `repeat(${ctx?.rows}, 1fr)`,
          }}
        >
          {renderCells()}
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
