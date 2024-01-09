import { useState } from "react";
import { atom, useRecoilState } from "recoil";

export interface Options {
  fittedTile: "none" | "mark" | "lock";
  preview: "show" | "hide";
}

export const optionsState = atom<Options>({
  key: "optionsState",
  default: {
    fittedTile: "lock",
    preview: "show",
  }
});

export function Options() {
  const [options, setOptions] = useRecoilState(optionsState);

  function setOption<K extends keyof Options>(key: K, value: Options[K]): void {
    setOptions(oldState => ({ ...oldState, [key]: value }));
  }

  return (
    <div className="options">

      <fieldset>
        <legend>オプション</legend>
        <RadioButtonGroup
          title="正しい位置のタイル: "
          options={[{ value: "none", label: "何もなし" }, { value: "mark", label: "★表示" }, { value: "lock", label: "固定" }]}
          defaultValue={options.fittedTile}
          onChange={value => setOption("fittedTile", value)}
        />
        <RadioButtonGroup
          title="プレビュー: "
          options={[{ value: "show", label: "表示" }, { value: "hide", label: "非表示" }]}
          defaultValue={options.preview}
          onChange={value => setOption("preview", value)}
        />
      </fieldset>

    </div>
  );
}

export interface RadioButtonGroupParam<VALUE extends string> {
  title: string;
  options: readonly { value: VALUE, label: string; }[];
  defaultValue: VALUE;
  onChange: (v: VALUE) => void;
}

const RadioButtonGroup = <VALUE extends string>(param: RadioButtonGroupParam<VALUE>) => {
  const { title, options, defaultValue, onChange } = param;
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleRadioChange = (value: VALUE) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div>
      {title}
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => handleRadioChange(option.value)}
          />
          {option.label}
        </label>
      ))
      }
    </div >
  );
};;;