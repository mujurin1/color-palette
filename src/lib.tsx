import { useState } from "react";

export type COLOR = [number, number, number];

export function rgbToCssString([r, g, b]: COLOR): string {
  return `rgb(${r} ${g} ${b})`;
}

export function rgbGradation(
  width: number,
  height: number,
  [p1, p2, p3]: [COLOR, COLOR, COLOR],
): COLOR[] {
  // 横/下方向へ1マス進むたびに増減する COLOR の値
  const rightDir = colorDivideNum(colorMinusColor(p2, p1), width - 1);
  const bottomDir = colorDivideNum(colorMinusColor(p3, p1), height - 1);

  const result: COLOR[] = [];

  for (let y = 0; y < height; y++) {
    const bottom = colorPlusColor(
      p1,
      colorMultipleNum(bottomDir, y)
    );

    for (let x = 0; x < width; x++) {
      const right = colorMultipleNum(rightDir, x);
      result.push(colorPlusColor(bottom, right));
    }
  }

  return result;
  // return result.map(X);
}

export function X(x: COLOR): COLOR {
  return [
    (x[0] + 255) % 255,
    (x[1] + 255) % 255,
    (x[2] + 255) % 255,
  ];
}

export function colorPlusColor(p1: COLOR, p2: COLOR): COLOR {
  return [p1[0] + p2[0], p1[1] + p2[1], p1[2] + p2[2]];

}

export function colorMinusColor(p1: COLOR, p2: COLOR): COLOR {
  return [p1[0] - p2[0], p1[1] - p2[1], p1[2] - p2[2]];
}

export function colorMultipleNum(color: COLOR, num: number): COLOR {
  return [color[0] * num, color[1] * num, color[2] * num];
}

export function colorDivideNum(color: COLOR, num: number): COLOR {
  return [color[0] / num, color[1] / num, color[2] / num];
}



/**
 * @param h 0~360
 * @param s 0~1
 * @param v 0~1
 * @returns 
 */
export function hsvToRgb(h: number, s: number, v: number): COLOR {
  var c = v * s;
  var x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  var m = v - c;

  var rgb;

  if (h >= 0 && h < 60) {
    rgb = [c, x, 0];
  } else if (h >= 60 && h < 120) {
    rgb = [x, c, 0];
  } else if (h >= 120 && h < 180) {
    rgb = [0, c, x];
  } else if (h >= 180 && h < 240) {
    rgb = [0, x, c];
  } else if (h >= 240 && h < 300) {
    rgb = [x, 0, c];
  } else {
    rgb = [c, 0, x];
  }

  return [
    Math.round((rgb[0] + m) * 255),
    Math.round((rgb[1] + m) * 255),
    Math.round((rgb[2] + m) * 255)
  ];
}

export function randomRgb(min = 120, max = 240): COLOR {
  const sa = max - min;
  return [
    // Math.round()
    Math.floor(Math.random() * sa + min),
    Math.floor(Math.random() * sa + min),
    Math.floor(Math.random() * sa + min),
  ];
}


export function TestHsvToRgb() {
  const [h, setH] = useState(100);
  const [s, setS] = useState(1);
  const [v, setV] = useState(0.5);

  const rgb = hsvToRgb(h, s, v);

  return (
    <>
      <div>H: {h}</div><input type="range" value={h} max={360} onChange={e => setH(+e.target.value)} /><br />
      <div>S: {s}</div><input type="range" value={s} max={1} step={0.01} onChange={e => setS(+e.target.value)} /><br />
      <div>V: {v}</div><input type="range" value={v} max={1} step={0.01} onChange={e => setV(+e.target.value)} />

      <div>rgb: {rgb.join(",")}</div>

      <div style={{ backgroundColor: rgbToCssString(rgb), width: 100, height: 100 }} />
    </>
  );
}

export function assertNonNull<T>(value?: T): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error("Value is null or undefined");
  }
}


export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = [hours, minutes, remainingSeconds]
    .map((unit) => unit.toString().padStart(2, "0"))
    .join(":");

  return formattedTime;
}