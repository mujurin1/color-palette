import { TileState } from "./TileState";
import { COLOR } from "./lib";

export interface PaletteState {
  width: number;
  height: number;
  tiles: TileState[];

  readonly preview: COLOR[];

  select: undefined | { x: number, y: number; };

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
  isSelect: (palette: PaletteState, tile: TileState): boolean => {
    const select = palette.select;
    if (select == null) return false;

    return select.x === tile.x && select.y === tile.y;
  },
  isClear: (palette: PaletteState): boolean => {
    return palette.tiles.every(tile => tile.x === tile.answerX && tile.y === tile.answerY);
  },

  create: (
    width: number,
    height: number,
    colors: COLOR[],
  ): PaletteState => {
    const tiles: TileState[] = [];

    const shuffledColor = [...colors];
    shuffledColor.sort(() => Math.random() - 0.5);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const color = shuffledColor[y * width + x];
        tiles.push(TileState.create(color, x, y));
      }
    }

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
  selectTile: (palette: PaletteState, x: number, y: number): PaletteState => {
    if (palette.select != null) {
      return PaletteState.swapTile(palette, { x, y }, palette.select);
    }

    return {
      ...palette,
      select: { x, y }
    };
  },
  swapTile: (
    palette: PaletteState,
    pointA: { x: number, y: number; },
    pointB: { x: number, y: number; },
  ): PaletteState => {
    const tiles = [...palette.tiles];
    const posA = pointA.y * palette.width + pointA.x;
    const posB = pointB.y * palette.width + pointB.x;
    const tileA = tiles[posA];
    const tileB = tiles[posB];

    tiles[posA] = {
      ...tileB,
      x: pointA.x,
      y: pointA.y,
    };
    tiles[posB] = {
      ...tileA,
      x: pointB.x,
      y: pointB.y,
    };

    return {
      ...palette,
      tiles,
      hold: undefined,
      select: undefined,
    };
  }
} as const;
