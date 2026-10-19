import "./StyleBar.css";
import StylePicker from "./StylePicker";
import ScopeToggle from "./ScopeToggle";
import { colors, sizes, fonts } from "../../../data/styleOptions";

function StyleBar({ style, scope, onStyleChange, onScopeChange }) {
  return (
    <div className="style-bar">
      <StylePicker
        label="צבע"
        options={colors}
        value={style.color}
        onChange={(value) => onStyleChange("color", value)}
      />
      <StylePicker
        label="גודל"
        options={sizes}
        value={style.size}
        onChange={(value) => onStyleChange("size", Number(value))}
      />
      <StylePicker
        label="גופן"
        options={fonts}
        value={style.font}
        onChange={(value) => onStyleChange("font", value)}
      />
      <ScopeToggle scope={scope} onChange={onScopeChange} />
    </div>
  );
}

export default StyleBar;