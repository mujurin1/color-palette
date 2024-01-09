import { useState } from "react";
import { PalettePreview, palettePreviewState } from "./PalettePreview";
import { Palette } from "./Palette";
import { PaletteState } from "./PaletteState";
import { useRecoilValue } from "recoil";
import { Options } from "./Options";
import "./App.css";

function App() {
  const [paletteState, setPaletteState] = useState<PaletteState | undefined>(undefined);
  const preview = useRecoilValue(palettePreviewState);

  const start = () => {
    setPaletteState(PaletteState.create(preview.width, preview.height, preview.colors));
  };

  return (
    <div>
      {paletteState == null
        ? <Setup start={start} />
        : <Play paletteState={paletteState} finish={() => setPaletteState(undefined)} />}
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

function Play({ paletteState, finish }: { paletteState: PaletteState; finish: () => void; }) {
  return (
    <div>
      <Palette paletteState={paletteState} />
      <button onClick={finish}>
        パレット設定に戻る (プレイ中のデータは消えます)
      </button>
    </div>
  );
}

export default App;
