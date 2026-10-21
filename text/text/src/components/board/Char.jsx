import "./Char.css";

function Char({ letter, color, size, font }) {
  return (
    <span
      className="char"
      style={{
        color: color,
        fontSize: size,
        fontFamily: font,
      }}
    >
      {letter}
    </span>
  );
}

export default Char;