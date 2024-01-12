import { useEffect, useState } from "react";
import { PalettePreview, palettePreviewState } from "./PalettePreview";
import { Palette, paletteState } from "./Palette";
import { PaletteState } from "./PaletteState";
import { useRecoilState, useRecoilValue } from "recoil";
import { Options } from "./Options";
import { formatTime } from "./lib";

import "./App.css";

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

      <Other />
    </div>
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

function Other() {
  return (
    <div style={{ marginTop: "50px" }}>
      <hr />
      <details>
        <summary>？</summary>

        制作者: むじゅりん<br />
        Twitter: <NewTab href="https://twitter.com/mujurin_2525">mujurin_2525</NewTab><br />
        Github: <NewTab href="https://github.com/mujurin1">https://github.com/mujurin1</NewTab><br />
        このサイトの Github: <NewTab href="https://github.com/mujurin1/color-palette">https://github.com/mujurin1/color-palette</NewTab>

        <br /><br />

        フォームを設置しました<br />
        要望・不具合その他あれば<NewTab href="https://forms.gle/3Ev6gDoAdEhT5sc66">こちら
        </NewTab>からお願いします

        <div style={{ marginBottom: "50px" }} />
      </details>
    </div>
  );
}

type NewTabParam = {
  href: string;
  children: React.ReactNode;
};

function NewTab(param: NewTabParam) {
  return (
    <a href={param.href} target="_blank">
      {param.children}
      {/* <span
        className="material-symbols-outlined"
        style={{ fontSize: "medium" }}
      >
        open_in_new
      </span> */}
    </a>
  );
}

export default App;
