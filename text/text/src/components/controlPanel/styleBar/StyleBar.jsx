import "../../../style/StyleBar.css";
import StylePicker from "./StylePicker";
import ScopeToggle from "./ScopeToggle";
import { colors, sizes, fonts } from "../../../data/styleOptions";

const pickers = [
  { prop: "color", label: "צבע", options: colors, variant: "swatch" },
  { prop: "size", label: "גודל", options: sizes },
  { prop: "font", label: "גופן", options: fonts },
];

function StyleBar({ style, scope, onStyleChange, onScopeChange }) {
  return (
    <div className="style-bar">
      {pickers.map(({ prop, ...picker }) => (
        <StylePicker
          key={prop}
          {...picker}
          value={style[prop]}
          onChange={(value) => onStyleChange(prop, value)}
        />
      ))}

      <ScopeToggle scope={scope} onChange={onScopeChange} />
    </div>
  );
}

export default StyleBar;