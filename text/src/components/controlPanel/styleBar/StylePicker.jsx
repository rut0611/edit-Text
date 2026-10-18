import "./StylePicker.css";

/*
  StylePicker - בורר כללי אחד. משמש לצבע, גודל וגופן (ההבדל רק ב-props). רכיב ניד.

  מקבל (props):   label, options (מערך), value
  מדווח למעלה:    onChange(newValue)

  מה צריך לעשות בקובץ הזה:
  1. [ ] לקבל את ה-props.
  2. [ ] להציג label (למשל "צבע").
  3. [ ] לצייר select (או שורת כפתורים) עם option לכל פריט ב-options (עם key).
  4. [ ] value של ה-select = value שהתקבל.
  5. [ ] ב-onChange: לקרוא ל-onChange עם e.target.value.
  6. [ ] לשים לב: size מגיע כמספר, בעוד ש-e.target.value מחרוזת - להמיר עם Number אם צריך.
*/

function StylePicker() {
  return (
    <label className="style-picker">
      <select></select>
    </label>
  );
}

export default StylePicker;
