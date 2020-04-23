import React from "react";

export enum ECellValue {
  none,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  bomb,
}

export enum ECellState {
  notvisible,
  visible,
  flagged,
}

export type TCell = {
  value: ECellValue;
  state: ECellState;
};

export interface ICellProps extends TCell {
  rowIndex: number;
  colIndex: number;
}

export enum EFace {
  default = "😀",
  worried = "😨",
  lost = "😱",
  won = "😁",
}

export interface ICtx {
  face: EFace;
  setFace: React.Dispatch<React.SetStateAction<EFace>>;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  live: boolean;
  setLive: React.Dispatch<React.SetStateAction<boolean>>;
  cells: TCell[][];
  setCells: React.Dispatch<React.SetStateAction<TCell[][]>>;
  endGame: boolean;
  setEndGame: React.Dispatch<React.SetStateAction<boolean>>;
  reset: () => void;
}

export interface IProviderProps {
  children?: React.ReactNode;
}

export interface IUseCell {
  handleClick: () => void;
}
