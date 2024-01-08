import { COLOR } from "./lib";

export interface TileState {
  color: COLOR;
  x: number;
  y: number;
}

export const TileState = {
  create: (color: COLOR, x: number, y: number): TileState => {
    return { color, x, y };
  }
} as const;