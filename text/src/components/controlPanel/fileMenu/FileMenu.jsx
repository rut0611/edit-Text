import { useState } from "react";
import "./FileMenu.css";

/*
  FileMenu - תפריט קבצים: חדש / שמור / שמור בשם / פתח. (חלקים ב + ג)

  מקבל (props):   fileNames  - רשימת שמות הקבצים השמורים של המשתמש הנוכחי
  מדווח למעלה:    onNew(), onSave(), onSaveAs(name), onOpen(name)

  מה צריך לעשות בקובץ הזה:
  1. [ ] להגדיר state מקומי: fileName (מה שנכתב בתיבת "שמור בשם").
  2. [ ] כפתור "חדש": קורא ל-onNew().
  3. [ ] כפתור "שמור": קורא ל-onSave().
  4. [ ] תיבת טקסט + כפתור "שמור בשם": קורא ל-onSaveAs(fileName) ואז מנקה את התיבה.
  5. [ ] רשימה (select או כפתורים) של fileNames. בבחירה: onOpen(name).
  6. [ ] אם fileName ריק - לא לשמור, ולהציג הודעה.
  7. [ ] לא לגעת ב-localStorage כאן. הכול דרך storage.js (שנקרא מ-App).
*/

function FileMenu() {
  return (
    <div className="file-menu">
      <button>חדש</button>
      <button>שמור</button>
      <input />
      <button>שמור בשם</button>
      <select></select>
    </div>
  );
}

export default FileMenu;
