import { useState } from "react";
import "./App.css";
import TextAreasBoard from "./components/board/TextAreasBoard";
import ControlPanel from "./components/controlPanel/ControlPanel";

/*
  App - הרכיב הראשי. מחזיק רק מצב שמשותף לאזור העליון ולאזור התחתון.

  מה צריך לעשות בקובץ הזה:

  שלב א - בסיס
  1. [ ] להגדיר state בשם texts: מערך של אזורי טקסט. כל אזור: { id, chars: [] }.
  2. [ ] להגדיר state בשם focusedId: מזהה האזור שעליו מקלידים כרגע.
  3. [ ] לכתוב פונקציה updateFocusedText(changeFn):
         היא מוצאת את האזור הממוקד ומחליפה אותו בתוצאה של changeFn (בלי לשנות את המערך הישן).
  4. [ ] להציג TextAreasBoard ולהעביר לו: texts, focusedId, והפונקציה שמשנה focusedId.
  5. [ ] להציג ControlPanel ולהעביר לו: updateFocusedText.

  שלב א - undo
  6. [ ] להחליט איפה נשמרת ההיסטוריה (state בשם history) ולהוסיף לפני כל שינוי תמונת מצב.
  7. [ ] לכתוב פונקציית undo ולהעביר אותה הלאה.

  שלב ב - קבצים
  8. [ ] לכתוב פונקציות save, saveAs, open שמשתמשות ב-storage.js.

  שלב ג - כמה אזורים
  9.  [ ] לכתוב addText (אזור חדש) עם id ייחודי.
  10. [ ] לכתוב handleClose(id): לשאול עם window.confirm אם לשמור, ואז להסיר את האזור עם filter.

  שלב ד - משתמשים
  11. [ ] להוסיף state בשם currentUser, ולהציג LoginScreen אם אין משתמש.
*/

function App() {
  return (
    <div className="app">
      <h1>העורך שלי</h1>
      <TextAreasBoard />
      <ControlPanel />
    </div>
  );
}

export default App;
