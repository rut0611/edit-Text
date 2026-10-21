import "./StylePicker.css";

function StylePicker({ label, options, value, onChange }) {
  return (
    <label className="style-picker">
      {label}
      <select value={value} onChange={(e) => onChange(e.target.value)}>
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