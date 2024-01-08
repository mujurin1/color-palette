import { COLOR } from "./lib";

export interface PaletteState {
  width: number;
  height: number;
  tiles: number[];

  readonly preview: COLOR[];
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
  // isSelect: (palette: PaletteState, tile: TileState): boolean => {
  //   const select = palette.select;
  //   if (select == null) return false;

  //   return select.x === tile.x && select.y === tile.y;
  // },
  isClear: (palette: PaletteState): boolean => {
    return palette.tiles.every((a, b) => a === b);
    // return palette.tiles.every(tile => tile.x === tile.answerX && tile.y === tile.answerY);
  },

  create: (
    width: number,
    height: number,
    colors: COLOR[],
  ): PaletteState => {
    let tiles: number[] = [];
    for (let i = 0; i < width * height; i++) tiles.push(i);
    tiles = tiles.sort(() => Math.random() - 0.5);

    return {
      width,
      height,
      tiles,
      preview: colors,

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
