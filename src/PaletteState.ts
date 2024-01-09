import { COLOR } from "./lib";

export interface PaletteState {
  width: number;
  height: number;
  tiles: number[];

  readonly colors: COLOR[];
  select: number | undefined;

  hold: undefined | {
    x: number,
    y: number,
    tile: number,
    mouseX: number,
    mouseY: number,
  };

  holdMatchedTile: boolean;
}

export const PaletteState = {
  isClear: (palette: PaletteState): boolean => {
    return palette.tiles.every((a, b) => a === b);
  },

  create: (
    width: number,
    height: number,
    colors: COLOR[],
  ): PaletteState => {
    let tiles: number[] = [];
    for (let i = 0; i < width * height; i++) tiles.push(i);
    do {
      tiles = tiles.sort(() => Math.random() - 0.5);
    } while (tiles.some((value, i) => value === i));

    return {
      width,
      height,
      tiles,
      colors: colors,

      select: undefined,
      hold: undefined,

      holdMatchedTile: false,
    };
  },
  selectTile: (palette: PaletteState, index: number): PaletteState => {
    if (palette.select != null) {
      return PaletteState.swapTile(palette, index, palette.select);
    }

    return {
      ...palette,
      select: index
    };
  },
  swapTile: (
    palette: PaletteState,
    pointA: number,
    pointB: number,
  ): PaletteState => {
    const tiles = [...palette.tiles];
    const temp = tiles[pointA];
    tiles[pointA] = tiles[pointB];
    tiles[pointB] = temp;

    return {
      ...palette,
      tiles: tiles,
      hold: undefined,
      select: undefined,
    };
  }
} as const;
