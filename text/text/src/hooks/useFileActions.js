import { useState } from "react";
import { getSheetName, isSheetDirty } from "../utils/sheetUtils";

/*
  useFileActions - החיבור בין הגליונות (useSheets) לקבצים (useFiles):
  שמירה, שמירה בשם, פתיחה, וסגירת גליון עם הצעה לשמור.

  מדוע hook נפרד: כל הפעולות כאן צריכות גם גליון וגם קובץ,
  ולכן הן לא שייכות לאף אחד משני ה-hooks האחרים.
*/
function useFileActions({
  sheets,
  focusedSheet,
  files, // { save, open } מ-useFiles
  markSheetSaved,
  openSheetFromFile,
  focusSheet,
  closeSheet,
}) {
  // הגליון שממתין להחלטה "לשמור לפני סגירה?"
  const [closingId, setClosingId] = useState(null);
  const closingSheet = sheets.find((s) => s.id === closingId) || null;

  // שומרת את הגליון הממוקד בקובץ בשם name. מחזירה true/false
  function saveFocusedAs(name) {
    if (!focusedSheet) {
      return false;
    }
    const ok = files.save(name, focusedSheet.chars);
    if (ok) {
      markSheetSaved(name);
    }
    return ok;
  }

  // "שמירה": שומרת בשם הנוכחי. (אם אין שם - FileMenu מבקש שם קודם)
  function handleSave() {
    const name = focusedSheet ? getSheetName(focusedSheet) : null;
    if (!name) {
      return false;
    }
    return saveFocusedAs(name);
  }

  function handleOpen(name) {
    // כבר פתוח בגליון - רק עוברים אליו
    const existing = sheets.find((s) => s.fileName === name);
    if (existing) {
      focusSheet(existing.id);
      return;
    }

    const chars = files.open(name);
    if (chars === null) {
      return;
    }
    openSheetFromFile(name, chars);
  }

  // סגירה: אם יש שינויים שלא נשמרו - פותחים חלונית, אחרת סוגרים מיד
  function handleClose(id) {
    const sheet = sheets.find((s) => s.id === id);
    if (sheet && isSheetDirty(sheet)) {
      setClosingId(id);
      return;
    }
    closeSheet(id);
  }

  function handleSaveAndClose(name) {
    if (!closingSheet) {
      return false;
    }
    if (!files.save(name, closingSheet.chars)) {
      return false;
    }
    closeSheet(closingSheet.id);
    setClosingId(null);
    return true;
  }

  function handleCloseWithoutSaving() {
    closeSheet(closingId);
    setClosingId(null);
  }

  function handleCancelClose() {
    setClosingId(null);
  }

  return {
    closingSheet,
    handleSave,
    handleSaveAs: saveFocusedAs,
    handleOpen,
    handleClose,
    handleSaveAndClose,
    handleCloseWithoutSaving,
    handleCancelClose,
  };
}

export default useFileActions;
