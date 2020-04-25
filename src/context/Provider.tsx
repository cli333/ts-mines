import React, { useEffect } from "react";
import { EFace, ICtx, IProviderProps, TCell } from "../types";
import { generateCells } from "../utils/utils";
import { hasPlayerWon } from "../utils/utils";

export const Ctx = React.createContext<ICtx | null>(null);

const Provider = ({ children }: IProviderProps) => {
  const [rows, setRows] = React.useState<number>(9);
  const [cols, setCols] = React.useState<number>(9);
  const [face, setFace] = React.useState<EFace>(EFace.default);
  const [time, setTime] = React.useState<number>(0);
  const [live, setLive] = React.useState<boolean>(false);
  const [bombs, setBombs] = React.useState<number>(9);
  const [flags, setFlags] = React.useState<number>(bombs);
  const [cells, setCells] = React.useState<TCell[][]>(
    generateCells(rows, cols, bombs)
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

  useEffect(() => {
    if (!live && !endGame) {
      setCells(generateCells(rows, cols, bombs));
      setBombs(bombs);
      setFlags(bombs);
    }
  }, [live, endGame, rows, cols, bombs]);

  const reset = (): void => {
    setFace(EFace.default);
    setTime(0);
    setLive(false);
    setBombs(bombs);
    setFlags(bombs);
    setCells(generateCells(rows, cols, bombs));
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
        rows,
        setRows,
        cols,
        setCols,
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
