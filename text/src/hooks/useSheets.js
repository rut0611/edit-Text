import { useState } from "react";
import {
  createSheet,
  getFocusAfterClose,
  updateChars,
  undoSheet,
} from "../utils/sheetUtils";
import { canUndo } from "../utils/historyUtils";
import {
  addChar,
  deleteLastChar,
  deleteLastWord,
  deleteAll,
  applyStyleToAll,
  countMatches,
  replaceMatches,
} from "../utils/textUtils";
import { defaultScope } from "../data/styleOptions";

function useSheets() {
  const [sheets, setSheets] = useState([createSheet(Date.now())]);
  const [focusedId, setFocusedId] = useState(() => sheets[0].id);
  const [scope, setScope] = useState(defaultScope);
  const [searchQuery, setSearchQuery] = useState("");

  const focusedSheet = sheets.find((s) => s.id === focusedId) || null;
  let searchCount = null;
if (focusedSheet && searchQuery !== "") {searchCount = countMatches(focusedSheet.chars, searchQuery);}

  // מחליפה את הגיליון הממוקד בתוצאה של changeFn.
  // משתמשים בצורה הפונקציונלית של setSheets כדי לעבוד תמיד על הרשימה העדכנית.
  function updateFocusedSheet(changeFn) {
    setSheets((prevSheets) =>
      prevSheets.map((sheet) => {
        if (sheet.id === focusedId) {
          return changeFn(sheet);
        }
        return sheet;
      })
    );
  }

  function typeLetter(letter) {
    updateFocusedSheet((sheet) => {
      const newChar = { letter: letter, ...sheet.style };
      return updateChars(sheet, addChar(sheet.chars, newChar));
    });
  }

  function deleteText(type) {
    updateFocusedSheet((sheet) => {
      // אין מה למחוק - לא שומרים היסטוריה סתם
      if (sheet.chars.length === 0) {
        return sheet;
      }

      let newChars = sheet.chars;

      if (type === "char") {
        newChars = deleteLastChar(sheet.chars);
      } else if (type === "word") {
        newChars = deleteLastWord(sheet.chars);
      } else if (type === "all") {
        newChars = deleteAll();
      }

      return updateChars(sheet, newChars);
    });
  }

  function changeStyle(key, value) {
    updateFocusedSheet((sheet) => {
      const newStyle = { ...sheet.style, [key]: value };
      let newSheet = { ...sheet, style: newStyle };

      // רק שינוי "על כל הטקסט" משנה תוכן, ולכן רק הוא נכנס להיסטוריה
      if (scope === "all") {
        newSheet = updateChars(
          newSheet,
          applyStyleToAll(sheet.chars, key, value)
        );
      }

      return newSheet;
    });
  }

  function undo() {
    updateFocusedSheet(undoSheet);
  }

  function search(query) {
  setSearchQuery(query);
}

function replace(from, to) {
  updateFocusedSheet((sheet) => {
    // אין מה להחליף - לא שומרים היסטוריה סתם
    if (countMatches(sheet.chars, from) === 0) {
      return sheet;
    }
    return updateChars(sheet, replaceMatches(sheet.chars, from, to));
  });
}

  function addNewSheet() {
    const newSheet = createSheet(Date.now());
    setSheets([...sheets, newSheet]);
    setFocusedId(newSheet.id);
    setScope(defaultScope);
  }

  function focusSheet(id) {
    if (id === focusedId) {
      return;
    }
    setFocusedId(id);
    setScope(defaultScope);
  }

  function closeSheet(id) {
    const remainingSheets = sheets.filter((s) => s.id !== id);
    setSheets(remainingSheets);

    if (id !== focusedId) {
      return;
    }

    setFocusedId(getFocusAfterClose(sheets, id));
    setScope(defaultScope);
  }

// מסמנת שהמצב הנוכחי של הגיליון הממוקד נשמר בקובץ בשם הזה
function markSheetSaved(fileName) {
  updateFocusedSheet((sheet) => ({
    ...sheet,
    fileName: fileName,
    savedChars: sheet.chars,
  }));
}

// פותחת גיליון חדש עם תוכן שנטען מקובץ
function openSheetFromFile(fileName, chars) {
  const newSheet = createSheet(Date.now(), chars, fileName);
  setSheets([...sheets, newSheet]);
  setFocusedId(newSheet.id);
  setScope(defaultScope);
}

  return {
    sheets,
    focusedSheet,
    focusedId,
    scope,
    setScope,
    typeLetter,
    deleteText,
    changeStyle,
    undo,
    canUndo: focusedSheet ? canUndo(focusedSheet.history) : false,
    addNewSheet,
    focusSheet,
    closeSheet,
    searchCount,
    search,
    replace,
    markSheetSaved,
openSheetFromFile,
  };
}

export default useSheets;