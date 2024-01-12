import { atom, useRecoilState } from "recoil";
import { COLOR, randomRgb, rgbGradation, rgbToCssString } from "./lib";

const defaultCorner: [COLOR, COLOR, COLOR] = [
  [240, 120, 120],
  [120, 240, 120],
  [120, 120, 240]
] as const;

export interface PalettePreview {
  width: number;
  height: number;
  cornerColor: [COLOR, COLOR, COLOR];
  colors: COLOR[];
}

export const palettePreviewState = atom<PalettePreview>({
  key: "palettePreviewState",
  default: {
    width: 10,
    height: 7,
    cornerColor: defaultCorner,
    colors: rgbGradation(10, 7, defaultCorner),
  }
});

export function PalettePreview() {
  const [palettePreview, setPalettePreview] = useRecoilState(palettePreviewState);

  const changeColor = (i: number, rgbIndex: number, color: number) => {
    const cornerColor: [COLOR, COLOR, COLOR] = [...palettePreview.cornerColor];

    cornerColor[i] = [...cornerColor[i]];
    cornerColor[i][rgbIndex] = color;

    setPalettePreview(v => ({ ...v, cornerColor, colors: rgbGradation(v.width, v.height, cornerColor) }));
  };

  const changeRandomColor = () => {
    const cornerColor: [COLOR, COLOR, COLOR] = [
      randomRgb(0, 255),
      randomRgb(0, 255),
      randomRgb(0, 255)
    ];

    setPalettePreview(v => ({
      ...v,
      cornerColor,
      colors: rgbGradation(v.width, v.height, cornerColor)
    }));
  };

  return (
    <>
      <fieldset style={{ margin: "10px 0px" }}>
        <legend>パレットの設定</legend>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex" }}>
            <div style={{ width: 125 }}>横の分割数: {palettePreview.width}</div>
            <input type="range" value={palettePreview.width}
              min={2}
              max={20}
              onChange={e => {
                const width = e.target.valueAsNumber;
                setPalettePreview(old => ({
                  ...old,
                  width,
                  colors: rgbGradation(width, old.height, palettePreview.cornerColor),
                }));
              }} />
          </div>

          <div style={{ display: "flex" }}>
            <div style={{ width: 125 }}>縦の分割数: {palettePreview.height}</div>
            <input type="range" value={palettePreview.height}
              min={2}
              max={20}
              onChange={e => {
                const height = e.target.valueAsNumber;
                setPalettePreview(old => ({
                  ...old,
                  height,
                  colors: rgbGradation(old.width, height, palettePreview.cornerColor),
                }));
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex" }}>
          {
            palettePreview.cornerColor.map((color, i) =>
              <div key={i} style={{ display: "flex", flexDirection: "column" }}>
                {i === 0 ? "左上の色" : i === 1 ? "右上の色" : "左下の色"}
                <div style={{ display: "flex" }}>
                  <div style={{ width: 60 }}>R: {color[0]}</div>
                  <input type="range" value={color[0]} max={255}
                    onChange={e => changeColor(i, 0, e.target.valueAsNumber)}
                  />
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ width: 60 }}>G: {color[1]}</div>
                  <input type="range" value={color[1]} max={255}
                    onChange={e => changeColor(i, 1, e.target.valueAsNumber)}
                  />
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ width: 60 }}>B: {color[2]}</div>
                  <input type="range" value={color[2]} max={255}
                    onChange={e => changeColor(i, 2, e.target.valueAsNumber)}
                  />
                </div>
              </div>
            )
          }

          <div style={{ marginLeft: 40 }}>
            <button onClick={changeRandomColor}>ランダムカラー</button>
          </div>

        </div>

      </fieldset>
      <ShowPalettePreview
        width={palettePreview.width}
        height={palettePreview.height}
        colors={palettePreview.colors}
      />
    </>
  );
}

export function ShowPalettePreview({ width, height, colors, scale }: { width: number, height: number, colors: COLOR[]; scale?: number; }) {
  const scale_ = scale ?? 1;

  return (
    <div className="palette"
      style={{ width: 80 * width * scale_, height: 80 * height * scale_ }}>
      {colors.map((color, i) => {
        const top = Math.floor(i / width);
        const left = i % width;
        return (
          <div
            key={i}
            className="tile"
            style={{
              top: `${top * 80 * scale_}px`,
              left: `${left * 80 * scale_}px`,
              width: `${80 * scale_}px`,
              height: `${80 * scale_}px`,
              backgroundColor: rgbToCssString(color),
            }}
          />
        );
      }
      )}
    </div>
  );
}
