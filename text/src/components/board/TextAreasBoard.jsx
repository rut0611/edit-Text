import "./TextAreasBoard.css";
import TextArea from "./TextArea";

/*
  TextAreasBoard - האזור העליון: מציג את רשימת כל אזורי הטקסט.

  מקבל (props):   texts, focusedId
  מדווח למעלה:    onFocus(id)  - לחצו על אזור מסוים
                  onClose(id)  - ביקשו לסגור אזור מסוים

  מה צריך לעשות בקובץ הזה:
  1. [ ] לקבל את ה-props בסוגריים מסולסלים בראש הפונקציה.
  2. [ ] לעבור על texts עם map ולצייר TextArea לכל אזור.
  3. [ ] לתת לכל TextArea key={t.id} (חובה!).
  4. [ ] להעביר לכל TextArea: id, chars, isFocused (האם id === focusedId), onFocus, onClose.
  5. [ ] לא להחזיק שום state ולא לשנות שום נתון.
*/

function TextAreasBoard() {
  return (
    <div className="text-areas-board">
      <TextArea />
    </div>
  );
}

export default TextAreasBoard;
