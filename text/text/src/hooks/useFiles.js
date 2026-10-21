import { useState } from "react";
import { saveFile, loadFile, listFiles, renameFile } from "../utils/storage";
import { getSheetName, isSheetDirty } from "../utils/sheetUtils";

/*
  useFiles - כל מה שקשור לקבצים של המשתמש:
  רשימת קבצים, שמירה, שמירה בשם, פתיחה, שינוי שם וסגירת גליון עם הצעה לשמור.
  (מחבר בין הגליונות מ-useSheets לבין האחסון ב-LocalStorage)
*/
function useFiles(userName, sheetsApi) {
  const {
    sheets,
    focusedSheet,
    markSheetSaved,
    openSheetFromFile,
    focusSheet,
    closeSheet,
  } = sheetsApi;

  const [fileNames, setFileNames] = useState(() => listFiles(userName));

  // הגליון שממתין להחלטה "לשמור לפני סגירה?"
  const [closingId, setClosingId] = useState(null);
  const closingSheet = sheets.find((s) => s.id === closingId) || null;

  // ---------- אחסון ----------
  function refresh() {
    setFileNames(listFiles(userName));
  }

  // שומרת ומרעננת את הרשימה. מחזירה true/false
  function save(fileName, chars) {
    const ok = saveFile(userName, fileName, chars);
    if (ok) {
      refresh();
    }
    return ok;
  }

  // משנה שם של קובץ שמור ומרעננת את הרשימה. מחזירה true/false
  function rename(oldName, newName) {
    const ok = renameFile(userName, oldName, newName);
    if (ok) {
      refresh();
    }
    return ok;
  }

  // ---------- פעולות על הגליון הממוקד ----------
  // שומרת את הגליון הממוקד בקובץ בשם name. מחזירה true/false
  function handleSaveAs(name) {
    if (!focusedSheet) {
      return false;
    }
    const ok = save(name, focusedSheet.chars);
    if (ok) {
      markSheetSaved(name);
    }
    return ok;
  }

  // "שמירה": שומרת בשם הנוכחי. (אם אין שם - FileMenu מבקש שם קודם)
  function handleSave() {
    const name = focusedSheet ? getSheetName(focusedSheet) : null;
    return name ? handleSaveAs(name) : false;
  }

  function handleOpen(name) {
    // כבר פתוח בגליון - רק עוברים אליו
    const existing = sheets.find((s) => s.fileName === name);
    if (existing) {
      focusSheet(existing.id);
      return;
    }

    const chars = loadFile(userName, name);
    if (chars !== null) {
      openSheetFromFile(name, chars);
    }
  }

  // ---------- סגירה ----------
  // אם יש שינויים שלא נשמרו - פותחים חלונית, אחרת סוגרים מיד
  function handleClose(id) {
    const sheet = sheets.find((s) => s.id === id);
    if (sheet && isSheetDirty(sheet)) {
      setClosingId(id);
      return;
    }
    closeSheet(id);
  }

  function handleSaveAndClose(name) {
    if (!closingSheet || !save(name, closingSheet.chars)) {
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
    fileNames,
    rename,
    closingSheet,
    handleSave,
    handleSaveAs,
    handleOpen,
    handleClose,
    handleSaveAndClose,
    handleCloseWithoutSaving,
    handleCancelClose,
  };
}

export default useFiles;