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
          {tiles.map((v, i) => {
            const selected = palette.select === i;
            const fitted = v === i;

            return <Tile key={i} palette={palette} index={i} fitted={fitted} select={selectTile} selected={selected} />;
          })}
        </div>

        <ShowPalettePreview
          width={paletteState.width}
          height={paletteState.height}
          colors={paletteState.colors}
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
  fitted: boolean;

  select: (index: number) => void;
}

function Tile({ palette, index, selected, fitted, select }: TileParam) {
  const value = palette.tiles[index];
  const color = palette.colors[value];
  const x = index % palette.width;
  const y = Math.floor(index / palette.width);

  let className = "tile";
  if (selected) className += " tile-select";
  if (fitted) className += " tile-fitted";

  return (
    <div
      className={className}
      style={{
        top: y * 80,
        left: x * 80,
        backgroundColor: rgbToCssString(color),
      }}
      onClick={_ => select(index)}
    />
  );
}
