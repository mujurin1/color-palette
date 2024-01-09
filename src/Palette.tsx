import { rgbToCssString } from "./lib";
import { PaletteState } from "./PaletteState";
import { useState } from "react";
import { ShowPalettePreview } from "./PalettePreview";
import { optionsState } from "./Options";
import { atom, useRecoilState, useRecoilValue } from "recoil";

export const paletteState = atom<PaletteState>({
  key: "paletteState",
  default: null!,
});

export function Palette() {
  const options = useRecoilValue(optionsState);

  const [palette, setPalette] = useRecoilState(paletteState);

  const selectTile = (index: number) => {
    const newPalette = PaletteState.selectTile(palette, index);
    setPalette(newPalette);
  };

  return (
    <div>

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
        <div className="palette" style={{ width: 80 * palette.width, height: 80 * palette.height }}>
          {palette.tiles.map((v, i) => {
            const selected = palette.select === i;
            const fitted = v === i;

            return <Tile key={i} palette={palette} index={i} fitted={fitted} select={selectTile} selected={selected} />;
          })}
        </div>

        {
          options.preview === "show" ?
            <ShowPalettePreview
              width={palette.width}
              height={palette.height}
              colors={palette.colors}
              scale={0.5}
            /> : undefined
        }
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
  const options = useRecoilValue(optionsState);

  const value = palette.tiles[index];
  const color = palette.colors[value];
  const x = index % palette.width;
  const y = Math.floor(index / palette.width);

  let className = "tile";
  if (selected) className += " tile-select";
  if (options.fittedTile !== "none" && fitted) className += " tile-fitted";

  return (
    <div
      className={className}
      style={{
        top: y * 80,
        left: x * 80,
        backgroundColor: rgbToCssString(color),
      }}
      onClick={_ => {
        if (options.fittedTile === "lock" && fitted) return;

        select(index);
      }}
    />
  );
}
