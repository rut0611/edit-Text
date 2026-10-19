import "./TextArea.css";
import Char from "./Char";

function TextArea({ id, chars, isFocused, onFocus, onClose }) {
  let className = "text-area";
  if (isFocused) {
    className = "text-area text-area--focused";
  }

  return (
    <div className={className} onClick={() => onFocus(id)}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose(id);
        }}
      >
        ✕
      </button>

      {chars.length === 0 && <span>אין עדיין טקסט</span>}

      {chars.map((c, index) => (
        <Char
          key={index}
          letter={c.letter}
          color={c.color}
          size={c.size}
          font={c.font}
        />
      ))}
    </div>
  );
}

export default TextArea;