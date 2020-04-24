import React, { useEffect } from "react";
import { EFace, ICtx, IProviderProps, TCell } from "../types";
import { generateCells } from "../utils/utils";
import { hasPlayerWon } from "../utils/utils";

export const Ctx = React.createContext<ICtx | null>(null);

const Provider = ({ children }: IProviderProps) => {
  const [face, setFace] = React.useState<EFace>(EFace.default);
  const [time, setTime] = React.useState<number>(0);
  const [live, setLive] = React.useState<boolean>(false);
  const [bombs, setBombs] = React.useState<number>(10);
  const [flags, setFlags] = React.useState<number>(bombs);
  const [cells, setCells] = React.useState<TCell[][]>(
    generateCells(9, 9, bombs)
  );
  const [endGame, setEndGame] = React.useState<boolean>(false);

  useEffect(() => {
    if (live) {
      const timer = setInterval(
        () => setTime((prevTime) => prevTime + 1),
        1000
      );
      return () => clearInterval(timer);
    }
  }, [live]);

  useEffect(() => {
    if (live && hasPlayerWon(cells, bombs)) won();
  }, [live, bombs, cells]);

  const reset = (): void => {
    setFace(EFace.default);
    setTime(0);
    setLive(false);
    setBombs(10);
    setFlags(bombs);
    setCells(generateCells(9, 9, bombs));
    setEndGame(false);
  };

  const won = (): void => {
    setFace(EFace.won);
    setLive(false);
    setEndGame(true);
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
        endGame,
        setEndGame,
        reset,
        bombs,
        setBombs,
        flags,
        setFlags,
        won,
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

export default Provider;
