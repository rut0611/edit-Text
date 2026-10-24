import { defaultStyle } from "../data/styleOptions";
import { deleteLastWord, replaceMatches } from "./textUtils";

export function createSheet(id, chars = [], fileName = null) {
  return {
    id: id,
    chars: chars,
    history: [],
    style: { ...defaultStyle },
    fileName: fileName,
    draftName: null,
    savedChars: chars,
  };
}

export function getSheetName(sheet) {
  return sheet.fileName || sheet.draftName || null;
}

export function isSheetDirty(sheet) {
  return (
    sheet.chars !== sheet.savedChars &&
    (sheet.fileName !== null || sheet.chars.length > 0)
  );
}

export function updateChars(sheet, newChars) {
  return {
    ...sheet,
    chars: newChars,
    history: [...sheet.history, sheet.chars].slice(-50),
  };
}

export function undoSheet(sheet) {
  if (sheet.history.length === 0) {
    return sheet;
  }
  return {
    ...sheet,
    chars: sheet.history[sheet.history.length - 1],
    history: sheet.history.slice(0, -1),
  };
}

export function findSheet(sheets, id) {
  return sheets.find((s) => s.id === id) || null;
}

export function updateSheetById(sheets, id, change) {
  return sheets.map((s) => (s.id === id ? change(s) : s));
}

export function typeChar(sheet, letter) {
  return updateChars(sheet, [...sheet.chars, { letter, ...sheet.style }]);
}

export function deleteChars(sheet, type) {
  if (type === "char") return updateChars(sheet, sheet.chars.slice(0, -1));
  if (type === "word") return updateChars(sheet, deleteLastWord(sheet.chars));
  return updateChars(sheet, []);
}

export function changeSheetStyle(sheet, key, value, scope) {
  const newSheet = { ...sheet, style: { ...sheet.style, [key]: value } };
  return scope === "all"
    ? updateChars(newSheet, sheet.chars.map((c) => ({ ...c, [key]: value })))
    : newSheet;
}

export function replaceInSheet(sheet, from, to) {
  return updateChars(sheet, replaceMatches(sheet.chars, from, to));
}

export function renameSheet(sheet, name) {
  return sheet.fileName !== null
    ? { ...sheet, fileName: name }
    : { ...sheet, draftName: name };
}

export function markSaved(sheet, name) {
  return { ...sheet, fileName: name, savedChars: sheet.chars };
}

export function getNextFocusId(sheets, closedId) {
  const index = sheets.findIndex((s) => s.id === closedId);
  const remaining = sheets.filter((s) => s.id !== closedId);
  const next = remaining[Math.max(index - 1, 0)];
  return next ? next.id : null;
}