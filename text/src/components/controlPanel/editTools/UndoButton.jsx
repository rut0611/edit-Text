import "./UndoButton.css";

/*
  UndoButton - כפתור ביטול הפעולה האחרונה. רכיב ניד.

  מקבל (props):   canUndo  - true/false האם יש מה לבטל
  מדווח למעלה:    onUndo()

  מה צריך לעשות בקובץ הזה:
  1. [ ] לקבל את ה-props.
  2. [ ] להחזיר button עם הטקסט "בטל".
  3. [ ] disabled={!canUndo}.
  4. [ ] ב-onClick: לקרוא ל-onUndo().
*/

function UndoButton() {
  return <button className="undo-button">בטל</button>;
}

export default UndoButton;
