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
