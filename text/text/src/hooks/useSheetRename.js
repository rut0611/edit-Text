import { useState, useRef } from "react";
import { getSheetName } from "../utils/sheetUtils";

/*
  useSheetRename - שינוי שם של לשונית (לחיצה כפולה על הלשונית).

  מדוע hook נפרד: זו לוגיקה עצמאית עם state משלה, ורק היא יודעת
  שבזמן שינוי שם המקלדת שעל המסך מקלידה לתוך השם ולא לתוך הגליון.

  renaming = { id, value, fresh } או null.
  fresh = true כל עוד לא נגעו בשם: האות הראשונה מחליפה את כל השם.
  ה-ref תמיד מחזיק את הערך העדכני, כדי שלחיצות מהירות לא יתבלבלו.
*/
function useSheetRename({
  sheets,
  fileNames,
  renameFile, // משנה שם של קובץ שמור (מ-useFiles)
  renameSheet, // משנה שם ללשונית (מ-useSheets)
  typeLetter,
  deleteText,
}) {
  const [renaming, setRenamingState] = useState(null);
  const renamingRef = useRef(null);

  function setRenaming(next) {
    renamingRef.current = next;
    setRenamingState(next);
  }

  function startRename(id) {
    if (renamingRef.current) {
      commitRename();
    }
    const sheet = sheets.find((s) => s.id === id);
    if (!sheet) {
      return;
    }
    setRenaming({ id: id, value: getSheetName(sheet) || "", fresh: true });
  }

  // הקלדה במקלדת הפיזית
  function changeRenameValue(value) {
    if (!renamingRef.current) {
      return;
    }
    setRenaming({ ...renamingRef.current, value: value, fresh: false });
  }

  function cancelRename() {
    setRenaming(null);
  }

  function commitRename() {
    const current = renamingRef.current;
    if (!current) {
      return;
    }
    setRenaming(null);
    applyRename(current.id, current.value);
  }

  // המקלדת שעל המסך: בזמן שינוי שם האותיות נכנסות לשם ולא לגליון
  function handleTypeLetter(letter) {
    const current = renamingRef.current;
    if (!current) {
      typeLetter(letter);
      return;
    }
    const base = current.fresh ? "" : current.value;
    setRenaming({ ...current, value: base + letter, fresh: false });
  }

  // כפתורי המחיקה: בזמן שינוי שם הם מוחקים מהשם ולא מהגליון
  function handleDelete(type) {
    const current = renamingRef.current;
    if (!current) {
      deleteText(type);
      return;
    }

    let value = current.value;
    if (current.fresh || type === "all") {
      value = "";
    } else if (type === "char") {
      value = Array.from(value).slice(0, -1).join("");
    } else if (type === "word") {
      value = value.replace(/\s+$/, "").replace(/\S+$/, "");
    }
    setRenaming({ ...current, value: value, fresh: false });
  }

  // לחיצה על מקשי המקלדת / כפתורי המחיקה לא "גונבת" את הפוקוס משדה השם
  function handleAppMouseDown(e) {
    if (
      renamingRef.current &&
      e.target.closest(".keyboard button, .delete-buttons button")
    ) {
      e.preventDefault();
    }
  }

  // השינוי עצמו: שם הלשונית, ואם הגליון שמור - גם הקובץ
  function applyRename(id, newName) {
    const sheet = sheets.find((s) => s.id === id);
    if (!sheet) {
      return;
    }

    const name = newName.trim();
    if (name === "" || name === getSheetName(sheet)) {
      return;
    }

    // הקובץ הזה פתוח כרגע בגליון אחר
    if (sheets.some((s) => s.id !== id && s.fileName === name)) {
      window.alert('הקובץ "' + name + '" פתוח בגליון אחר. יש לסגור אותו קודם.');
      return;
    }

    if (fileNames.includes(name)) {
      const confirmed = window.confirm(
        'הקובץ "' + name + '" כבר קיים. להחליף אותו?'
      );
      if (!confirmed) {
        return;
      }
    }

    // גליון ששמור כקובץ - משנים גם את הקובץ עצמו
    if (sheet.fileName !== null) {
      if (!renameFile(sheet.fileName, name)) {
        window.alert("שינוי השם נכשל");
        return;
      }
    }

    renameSheet(id, name);
  }

  return {
    renaming,
    startRename,
    changeRenameValue,
    commitRename,
    cancelRename,
    handleTypeLetter,
    handleDelete,
    handleAppMouseDown,
  };
}

export default useSheetRename;
