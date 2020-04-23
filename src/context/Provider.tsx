import React from "react";
import { EFace, ICtx, IProviderProps, TCell } from "../types";
import { generateCells } from "../utils/utils";

export const Ctx = React.createContext<ICtx | null>(null);

const Provider = ({ children }: IProviderProps) => {
  const [face, setFace] = React.useState<EFace>(EFace.default);
  const [time, setTime] = React.useState<number>(0);
  const [live, setLive] = React.useState<boolean>(false);
  const [cells, setCells] = React.useState<TCell[][]>(generateCells(9, 9));
  const [score, setScore] = React.useState<number>(0);
  const [endGame, setEndGame] = React.useState<boolean>(false);

  const reset = (): void => {
    setFace(EFace.default);
    setTime(0);
    setLive(false);
    setCells(generateCells(9, 9));
    setEndGame(false);
    setScore(0);
  };

  return (
    <Ctx.Provider
      value={{
        face,
        setFace,
        time,
        setTime,
        live,
        setLive,
        cells,
        setCells,
        score,
        setScore,
        endGame,
        setEndGame,
        reset,
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

export default Provider;
