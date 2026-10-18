import "./DeleteButtons.css";

/*
  DeleteButtons - שלושה כפתורי מחיקה: תו, מילה, הכול. רכיב ניד.

  מקבל (props):   disabled (אופציונלי - אם אין טקסט)
  מדווח למעלה:    onDelete("char" | "word" | "all")

  מה צריך לעשות בקובץ הזה:
  1. [ ] לקבל את ה-props.
  2. [ ] להציג שלושה כפתורים: "מחק תו", "מחק מילה", "מחק הכול".
  3. [ ] ב-onClick של כל אחד: לקרוא ל-onDelete עם הסוג המתאים.
  4. [ ] אם disabled - להשבית את הכפתורים.
  5. [ ] הלוגיקה של המחיקה עצמה לא כאן (היא ב-textUtils.js).
*/

function DeleteButtons() {
  return (
    <div className="delete-buttons">
      <button>מחק תו</button>
      <button>מחק מילה</button>
      <button>מחק הכול</button>
    </div>
  );
}

export default DeleteButtons;
