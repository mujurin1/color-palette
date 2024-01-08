import { rgbToCssString } from "./lib";
import { PaletteState } from "./PaletteState";
import { TileState } from "./TileState";
import { useState } from "react";
import { ShowPalettePreview } from "./PalettePreview";

// export const paletteState = atom<PaletteState>({
//   key: "paletteState",
//   default: PaletteState.create(
//     10,
//     10,
//     [
//       [240, 120, 120],
//       [120, 240, 120],
//       [120, 120, 240]
//     ])
// });


export function Palette({ paletteState }: { paletteState: PaletteState; }) {
  const [palette, setPalette] = useState(paletteState);
  const [clear, setClear] = useState(false);
  const { tiles } = palette;

  const selectTile = (tile: TileState) => {
    const newPalette = PaletteState.selectTile(palette, tile.x, tile.y);
    setPalette(newPalette);

    if (PaletteState.isClear(newPalette)) {
      setClear(true);
    } else {
      setClear(false);
    }
  };

  return (
    <div>
      {
        !clear ? undefined :
          <div>
            クリア
          </div>
      }

      <div style={{
        margin: 20,
        display: "grid",
        // gridTemplateColumns: "repeat(auto-fill, 1fr)",
        gridAutoFlow: "column",
        gap: 10,
        justifyContent: "left"
        // display: "flex",
        // flexWrap: "wrap",
      }}>
        <div className="palette" style={{ width: 80 * paletteState.width, height: 80 * paletteState.height }}>
          {tiles.map((tile, i) => {
            const selected = PaletteState.isSelect(palette, tile);
            return <Tile key={i} tile={tile} select={selectTile} selected={selected} />;
          }
          )}
        </div>

        <ShowPalettePreview
          width={paletteState.width}
          height={paletteState.height}
          colors={paletteState.preview}
          scale={0.5}
        />
      </div >
    </div>
  );
}

interface TileParam {
  tile: TileState;
  selected: boolean;

  select: (tile: TileState) => void;
}

function Tile({ tile, selected, select }: TileParam) {
  return (
    <div
      className={selected ? "select-tile tile" : "tile"}
      style={{
        top: `${tile.y * 80}px`,
        left: `${tile.x * 80}px`,
        backgroundColor: rgbToCssString(tile.color),
      }}
      onClick={_ => select(tile)}
    />
  );
}
