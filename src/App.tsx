import { useState } from "react";
import "./App.css";
import { PalettePreview, palettePreviewState } from "./PalettePreview";
import { Palette } from "./Palette";
import { PaletteState } from "./PaletteState";
import { useRecoilValue } from "recoil";

function App() {
  const [paletteState, setPaletteState] = useState<PaletteState | undefined>(undefined);
  const preview = useRecoilValue(palettePreviewState);

  return (
    <div>

      {paletteState == null ?
        <div>
          <div>
            TODO: ハマったマスを固定するかの選択肢を付ける（プレイ中に切り替えられる予定）<br />
            現在は固定なし（クリアしたらクリアと出ます）
          </div>

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
    </div >
  );
}

export default App;
