import { rgbToCssString } from "./lib";
import { PaletteState } from "./PaletteState";
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

  const selectTile = (index: number) => {
    const newPalette = PaletteState.selectTile(palette, index);
    setPalette(newPalette);
    setClear(PaletteState.isClear(newPalette));
    console.log(newPalette.tiles);

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
          {tiles.map((_, i) => {
            const selected = palette.select === i;
            return <Tile key={i} palette={palette} index={i} select={selectTile} selected={selected} />;
          })}
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
  palette: PaletteState;
  index: number;
  selected: boolean;

  select: (index: number) => void;
}

function Tile({ palette, index, selected, select }: TileParam) {
  const value = palette.tiles[index];
  const color = palette.preview[value];
  const x = index % palette.width;
  const y = Math.floor(index / palette.width);

  return (
    <div
      className={selected ? "select-tile tile" : "tile"}
      style={{
        top: y * 80,
        left: x * 80,
        backgroundColor: rgbToCssString(color),
      }}
      onClick={_ => select(index)}
    />
  );
}
