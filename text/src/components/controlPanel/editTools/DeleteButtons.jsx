import "./DeleteButtons.css";

function DeleteButtons({ onDelete }) {
  return (
    <div className="delete-buttons">
      <button onClick={() => onDelete("char")}>מחק תו</button>
      <button onClick={() => onDelete("word")}>מחק מילה</button>
      <button onClick={() => onDelete("all")}>מחק הכול</button>
    </div>

  );
}

export default DeleteButtons;