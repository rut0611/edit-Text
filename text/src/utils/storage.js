/*
  storage.js - כל הגישה ל-localStorage. רק כאן נוגעים בו, אף רכיב אחר לא.

  מה צריך לעשות בקובץ הזה:

  חלק ב - קבצים
  1. [ ] saveFile(userName, fileName, chars) - הופכת ל-JSON.stringify ושומרת.
  2. [ ] loadFile(userName, fileName) - קוראת ומחזירה JSON.parse (או null אם אין).
  3. [ ] listFiles(userName) - מחזירה רשימת שמות הקבצים של המשתמש.
  4. [ ] deleteFile(userName, fileName) - אופציונלי.

  חלק ד - משתמשים
  5. [ ] מפתח לכל קובץ שכולל את שם המשתמש, למשל "editor:user:קובץ".
  6. [ ] registerUser(userName, password) ו-checkUser(userName, password).
  7. [ ] לעטוף קריאות ב-try/catch (JSON.parse יכול להיכשל).
*/

export function saveFile(userName, fileName, chars) {}
export function loadFile(userName, fileName) {}
export function listFiles(userName) {}
export function registerUser(userName, password) {}
export function checkUser(userName, password) {}
