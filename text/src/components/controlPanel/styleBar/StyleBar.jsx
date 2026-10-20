
import "./StyleBar.css";
import StylePicker from "./StylePicker";
import ScopeToggle from "./ScopeToggle";
import { colors, sizes, fonts } from "../../../data/styleOptions";

function StyleBar({ style, scope, onStyleChange, onScopeChange }) {
  return (
    <div className="style-bar">
      <div className="color-picker">
        <span className="color-picker__label">צבע</span>

        <div className="color-picker__options">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              className={`color-picker__swatch ${
                style.color === color ? "is-selected" : ""
              }`}
              style={{ "--swatch-color": color }}
              aria-label={`צבע ${color}`}
              aria-pressed={style.color === color}
              title={color}
              onClick={() => onStyleChange("color", color)}
            />
          ))}
        </div>
      </div>

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

      <ScopeToggle
        scope={scope}
        onChange={onScopeChange}
      />
    </div>
  );
}

export default StyleBar;
