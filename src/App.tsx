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

  return (
    <div>
      {paletteState == null ?
        <div>
          <button onClick={() =>
            setPaletteState(PaletteState.create(preview.width, preview.height, preview.colors))
          }>開始</button>

          <PalettePreview />
        </div>
        :
        <div>
          <Palette paletteState={paletteState} />
        </div>

      }

      <Options />
    </div >
  );
}

export default App;
