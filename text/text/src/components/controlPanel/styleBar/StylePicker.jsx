import "../../../style/StylePicker.css";

function StylePicker({ label, options, value, onChange, variant = "select" }) {
  if (variant === "swatch") {
    return (
      <div className="style-picker style-picker--swatch">
        <span className="style-picker__label">{label}</span>
        <div className="style-picker__options">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className={`style-picker__swatch ${value === option ? "is-selected" : ""}`}
              style={{ "--swatch-color": option }}
              aria-label={`${label} ${option}`}
              aria-pressed={value === option}
              title={option}
              onClick={() => onChange(option)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <label className="style-picker">
      {label}
      <select
        value={value}
        onChange={(e) =>
          onChange(options.find((o) => String(o) === e.target.value))
        }
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default StylePicker;