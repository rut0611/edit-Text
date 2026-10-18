import "./Char.css";

/*
  Char - תו אחד עם הסגנון שלו. רכיב תצוגה בלבד.

  מקבל (props):   letter, color, size, font
  מדווח למעלה:    כלום

  מה צריך לעשות בקובץ הזה:
  1. [ ] לקבל את ה-props.
  2. [ ] להחזיר span שמציג את letter.
  3. [ ] להוסיף style={{ color: ..., fontSize: ..., fontFamily: ... }}.
  4. [ ] לשים לב: רווח צריך להיראות כרווח (אפשר white-space: pre ב-CSS).
  5. [ ] לא להחזיק state ולא לדעת כלום על שאר האפליקציה.
*/

function Char() {
  return <span className="char">א</span>;
}

export default Char;
