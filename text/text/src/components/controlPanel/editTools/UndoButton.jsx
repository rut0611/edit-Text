import "./UndoButton.css";

function UndoButton({ canUndo, onUndo }) {
  return (
    <button
      className="undo-button"
      disabled={!canUndo}
      onClick={() => onUndo()}
    >
      בטל
    </button>
  );
}

export default UndoButton;