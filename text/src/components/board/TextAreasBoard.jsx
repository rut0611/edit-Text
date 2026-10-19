import "./TextAreasBoard.css";
import TextArea from "./TextArea";

function TextAreasBoard({ texts, focusedId, onFocus, onClose }) {
  return (
    <div className="text-areas-board">
      {texts.map((t) => (
        <TextArea
          key={t.id}
          id={t.id}
          chars={t.chars}
          isFocused={t.id === focusedId}
          onFocus={onFocus}
          onClose={onClose}
        />
      ))}
    </div>
  );
}

export default TextAreasBoard;