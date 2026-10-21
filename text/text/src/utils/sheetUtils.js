import { defaultStyle } from "../data/styleOptions";
import { pushSnapshot, popSnapshot } from "./historyUtils";

export function createSheet(id, chars = [], fileName = null) {
  return {
    id: id,
    chars: chars,
    history: [],
    style: { ...defaultStyle },
    fileName: fileName, // שם הקובץ השמור (null = עוד לא נשמר)
    draftName: null, // שם שהמשתמש נתן ללשונית לפני שנשמרה
    savedChars: chars,
  };
}

// השם להצגה: שם הקובץ, או שם הטיוטה, או null אם אין שם
export function getSheetName(sheet) {
  return sheet.fileName || sheet.draftName || null;
}

// האם יש בגיליון שינויים שלא נשמרו
export function isSheetDirty(sheet) {
  if (sheet.chars === sheet.savedChars) {
    return false;
  }

  // גיליון ריק שמעולם לא נשמר - אין מה לשמור
  if (sheet.fileName === null && sheet.chars.length === 0) {
    return false;
  }

  return true;
}

export function getFocusAfterClose(sheets, closedId) {
  const index = sheets.findIndex((s) => s.id === closedId);
  const remaining = sheets.filter((s) => s.id !== closedId);

  if (remaining.length === 0) {
    return null;
  }

  if (index <= 0) {
    return remaining[0].id;
  }

  return remaining[index - 1].id;
}

// מחליפה את התוכן של גיליון ושומרת את התוכן הישן בהיסטוריה
export function updateChars(sheet, newChars) {
  return {
    ...sheet,
    chars: newChars,
    history: pushSnapshot(sheet.history, sheet.chars),
  };
}

// מחזירה את הגיליון למצב הקודם (אם אין היסטוריה - לא משנה כלום)
export function undoSheet(sheet) {
  const { snapshot, history } = popSnapshot(sheet.history);

  if (snapshot === null) {
    return sheet;
  }

  return { ...sheet, chars: snapshot, history: history };
}