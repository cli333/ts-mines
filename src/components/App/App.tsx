import React, { useEffect } from "react";
import "./App.scss";
import NumberDisplay from "../NumberDisplay/NumberDisplay";
import Cell from "../Cell/Cell";
import { Ctx } from "../../context/Provider";

const App: React.FC = () => {
  const ctx = React.useContext(Ctx);

  useEffect(() => {
    // if (ctx?.live) {
    //   setInterval(
    //     ctx.setTime((prevTime) => prevTime + 1),
    //     1000
    //   );
    // }
  });

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
    <div className="App">
      <div className="Header">
        <NumberDisplay value={0} />
        <div className="Face">
          <span role="img" aria-label="face">
            {ctx?.face}
          </span>
        </div>
        <NumberDisplay value={ctx?.time!} />
      </div>
      <div className="Body">{renderCells()}</div>
    </div>
  );
};

export default App;
