import { useState } from "react";
import "./ControlPanel.css";
import Keyboard from "./keyboard/Keyboard";
import StyleBar from "./styleBar/StyleBar";
import EditTools from "./editTools/EditTools";
import FileMenu from "./fileMenu/FileMenu";

/*
  ControlPanel - רכיב ביניים: האזור התחתון כולו.
  מחזיק את מה שרק הלוח צריך: שפה נוכחית וסגנון נוכחי.

  מקבל (props):   onChangeText(changeFn)  - הפונקציה מ-App ששינה את הטקסט הממוקד
                  (בהמשך גם: undo, canUndo, פעולות קבצים, שמות קבצים)

  מה צריך לעשות בקובץ הזה:
  1. [ ] להגדיר state בשם language (למשל "he") ו-state בשם style
         (למשל { color: "black", size: 16, font: "Arial", scope: "fromNowOn" }).
  2. [ ] לכתוב handleKeyPress(letter): קורא ל-onChangeText ומוסיף לסוף chars אובייקט תו
         חדש { letter, ...style } (בלי push - ליצור מערך חדש).
  3. [ ] לכתוב handleDelete(type): type הוא "char" / "word" / "all". הלוגיקה עצמה
         נמצאת ב-textUtils.js, כאן רק קוראים לה דרך onChangeText.
  4. [ ] לכתוב handleStyleChange(key, value): מעדכן את style, ואם scope הוא "all" -
         מעדכן גם את כל התווים הקיימים בטקסט הממוקד.
  5. [ ] לכתוב handleSearch ו-handleReplace (דרך textUtils.js).
  6. [ ] להציג את Keyboard, StyleBar, EditTools, FileMenu ולהעביר לכל אחד את מה שהוא צריך.
*/

function ControlPanel() {
  return (
    <div className="control-panel">
      <Keyboard />
      <StyleBar />
      <EditTools />
      <FileMenu />
    </div>
  );
}

export default ControlPanel;
