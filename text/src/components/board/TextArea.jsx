import "./TextArea.css";
import Char from "./Char";

/*
  TextArea - אזור טקסט אחד, עם כפתור סגירה.

  מקבל (props):   id, chars, isFocused
  מדווח למעלה:    onFocus(id), onClose(id)

  מה צריך לעשות בקובץ הזה:
  1. [ ] לקבל את ה-props.
  2. [ ] לצייר div חיצוני עם className שמשתנה לפי isFocused (למשל "text-area text-area--focused").
  3. [ ] ב-onClick של ה-div: לקרוא ל-onFocus(id).
  4. [ ] להוסיף button עם ✕. ב-onClick שלו: לקרוא ל-onClose(id).
         חשוב: להוסיף e.stopPropagation() כדי שהלחיצה לא תפעיל גם את onFocus.
  5. [ ] לעבור על chars עם map ולצייר Char לכל תו (עם key - אפשר להשתמש באינדקס בשלב ראשון).
  6. [ ] להעביר ל-Char: letter, color, size, font.
  7. [ ] אם chars ריק - להציג הודעה כמו "אין עדיין טקסט".
*/

function TextArea() {
  return (
    <div className="text-area">
      <button>✕</button>
      <Char />
    </div>
  );
}

export default TextArea;
