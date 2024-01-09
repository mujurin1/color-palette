import { useEffect, useState } from "react";
import { PalettePreview, palettePreviewState } from "./PalettePreview";
import { Palette, paletteState } from "./Palette";
import { PaletteState } from "./PaletteState";
import { useRecoilState, useRecoilValue } from "recoil";
import { Options } from "./Options";
import "./App.css";
import { formatTime } from "./lib";

interface PlayState {
  startTime: number;
  cleared: boolean;
}

function App() {
  const [palette, setPalette] = useRecoilState(paletteState);
  const [state, setState] = useState<PlayState | undefined>(undefined);
  const preview = useRecoilValue(palettePreviewState);

  const start = () => {
    const newState = PaletteState.create(preview.width, preview.height, preview.colors);
    setPalette(newState);
    setState({ startTime: Date.now(), cleared: false });
  };

  if (state?.cleared === false) {
    if (PaletteState.isClear(palette))
      setState(({ ...state, cleared: true }));
  }

  return (
    <div>
      {state == null
        ? <Setup start={start} />
        : <Play state={state} finish={() => setState(undefined)} />
      }
      <Options />
    </div >
  );
}

function Setup({ start }: { start: () => void; }) {
  return (
    <div>
      <button onClick={start}>
        開始
      </button>
      <PalettePreview />
    </div>
  );
}

interface PlayParam {
  state: PlayState;
  finish: () => void;
}

function Play({ state, finish }: PlayParam) {
  const { startTime } = state;

  // 1秒に1回時間を更新するため
  const [, update] = useState(0);
  useEffect(() => {
    if (state.cleared) return;

    const timer = setInterval(() => update(s => ~s), 1000);
    return () => clearInterval(timer);
  }, [state.cleared]);

  const timeSeconds = Math.floor((Date.now() - startTime) / 1000);

  return (
    <div>
      <div>
        {!state.cleared ? undefined : "クリア！！！  "}

        経過時間 {formatTime(timeSeconds)}

      </div>

      <Palette />
      <button onClick={finish}>
        パレット設定に戻る (プレイ中のデータは消えます)
      </button>
    </div>
  );
}

export default App;
