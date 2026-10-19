import "./Key.css";

function Key({ char, onPress }) {
  return (
    <button className="key" onClick={() => onPress(char)}>
      {char}
    </button>
  );
}

export default Key;