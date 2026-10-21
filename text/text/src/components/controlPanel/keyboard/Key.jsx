import "./Key.css";

function Key({ value, label, ariaLabel, onPress, special = false, className = "" }) {
  const isSpace = value === " ";
  const base = special ? "keyboard-special-key" : "key";

  return (
    <button
      type="button"
      className={`${base}${isSpace ? " key--space" : ""} ${className}`.trim()}
      onClick={() => onPress(value)}
      aria-label={ariaLabel ?? (isSpace ? "רווח" : value)}
    >
      {label ?? (isSpace ? "" : value)}
    </button>
  );
}

export default Key;