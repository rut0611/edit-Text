
import "./Key.css";

function Key({ char, onPress }) {
  const isSpace = char === " ";

  return (
    <button
      type="button"
      className={`key${isSpace ? " key--space" : ""}`}
      onClick={() => onPress(char)}
      aria-label={isSpace ? "רווח" : char}
    >
      {isSpace ? "" : char}
    </button>
  );
}

export default Key;
