import { COLOR } from "./lib";

export interface TileState {
  color: COLOR;
  x: number;
  y: number;

  answerX: number;
  answerY: number;
}

export const TileState = {
  create: (color: COLOR, x: number, y: number): TileState => {
    return { color, x, y, answerX: x, answerY: y };
  }
} as const;