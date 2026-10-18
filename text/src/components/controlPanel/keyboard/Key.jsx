import "./Key.css";

/*
  Key - מקש אחד. רכיב ניד: אפשר להעתיק אותו (עם Key.css) לכל פרויקט.

  מקבל (props):   char  - התו שמוצג על המקש
  מדווח למעלה:    onPress(char)

  מה צריך לעשות בקובץ הזה:
  1. [ ] לקבל את ה-props.
  2. [ ] להחזיר button שמציג את char.
  3. [ ] ב-onClick: לקרוא ל-onPress(char).
  4. [ ] (אופציונלי) state מקומי pressed לאפקט לחיצה קצר.
  5. [ ] לא לדעת כלום על מה שקורה אחרי הלחיצה.
*/

function Key() {
  return <button className="key">א</button>;
}

export default Key;
