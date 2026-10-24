import { useState } from "react";
import "../style/EditorScreen.css";
import TextAreasBoard from "../components/board/TextAreasBoard";
import ControlPanel from "../components/controlPanel/ControlPanel";
import FileMenu from "../components/sidePanel/FileMenu";
import UserBar from "../components/sidePanel/UserBar";
import FileNameDialog from "../components/dialogs/FileNameDialog";
import { defaultStyle, defaultScope } from "../data/styleOptions";
import {
  createSheet, getSheetName, isSheetDirty, undoSheet,
  findSheet, updateSheetById, typeChar, deleteChars, changeSheetStyle,
  replaceInSheet, renameSheet, markSaved, getNextFocusId,
} from "../utils/sheetUtils";
import { countMatches } from "../utils/textUtils";

import { saveFile, loadFile, listFiles, renameFile } from "../utils/storage";

function EditorScreen({ userName, onLogout }) {
  const [sheets, setSheets] = useState(() => [createSheet(Date.now())]);
  const [focusedId, setFocusedId] = useState(() => sheets[0].id);
  const [scope, setScope] = useState(defaultScope);
  const [searchQuery, setSearchQuery] = useState("");
  const [fileNames, setFileNames] = useState(() => listFiles(userName));
  const [closingId, setClosingId] = useState(null); // גליון שממתין ל"לשמור לפני סגירה?"

  const focusedSheet = findSheet(sheets, focusedId);
  const closingSheet = findSheet(sheets, closingId);
  const currentStyle = focusedSheet ? focusedSheet.style : defaultStyle;
  const currentFileName = focusedSheet ? getSheetName(focusedSheet) : null;
  const searchCount =
    focusedSheet && searchQuery !== ""
      ? countMatches(focusedSheet.chars, searchQuery)
      : null;

  // ---------- עזרים ----------

  // מעדכנת גליון לפי id (ברירת מחדל: הגליון הממוקד)
  function updateSheet(change, id = focusedId) {
    setSheets((prev) => updateSheetById(prev, id, change));
  }

  function focusSheet(id) {
    setFocusedId(id);
    setScope(defaultScope);
  }

  function addSheet(sheet) {
    setSheets([...sheets, sheet]);
    focusSheet(sheet.id);
  }

  const refreshFiles = () => setFileNames(listFiles(userName));

  // ---------- עריכת טקסט ----------

  const typeLetter = (letter) => updateSheet((s) => typeChar(s, letter));
  const deleteText = (type) => updateSheet((s) => deleteChars(s, type));
  const changeStyle = (key, value) => updateSheet((s) => changeSheetStyle(s, key, value, scope));
  const replace = (from, to) => updateSheet((s) => replaceInSheet(s, from, to));

  // ---------- גליונות ----------

  function closeSheet(id) {
    if (id === focusedId) focusSheet(getNextFocusId(sheets, id));
    setSheets(sheets.filter((s) => s.id !== id));
    setClosingId(null);
  }

  // אם יש שינויים שלא נשמרו - פותחים חלונית, אחרת סוגרים מיד
  function handleClose(id) {
    const sheet = findSheet(sheets, id);
    if (sheet && isSheetDirty(sheet)) {
      setClosingId(id);
    } else {
      closeSheet(id);
    }
  }

  // שינוי שם לשונית (ואם הגליון שמור - גם הקובץ)
  function handleRename(id, newName) {
    const sheet = findSheet(sheets, id);
    const name = newName.trim();
    if (!name || name === getSheetName(sheet)) {
      return;
    }
    if (
      fileNames.includes(name) &&
      !window.confirm(`הקובץ "${name}" כבר קיים. להחליף אותו?`)
    ) {
      return;
    }
    if (sheet.fileName !== null) {
      renameFile(userName, sheet.fileName, name);
      refreshFiles();
    }
    updateSheet((s) => renameSheet(s, name), id);
  }

  // ---------- קבצים ----------

  // שומרת ומרעננת את רשימת הקבצים. מחזירה true/false
  function save(fileName, chars) {
    const ok = saveFile(userName, fileName, chars);
    if (ok) refreshFiles();
    return ok;
  }

  // שומרת את הגליון הממוקד בקובץ בשם name
  function handleSaveAs(name) {
    if (!focusedSheet) {
      return false;
    }
    const ok = save(name, focusedSheet.chars);
    if (ok) {
      updateSheet((sheet) => markSaved(sheet, name));
    }
    return ok;
  }

  // "שמירה": שומרת בשם הנוכחי (אם אין שם - FileMenu מבקש שם קודם)
  function handleSave() {
    return currentFileName ? handleSaveAs(currentFileName) : false;
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
      addSheet(createSheet(Date.now(), chars, name));
    }
  }

  function handleSaveAndClose(name) {
    if (!closingSheet || !save(name, closingSheet.chars)) {
      return false;
    }
    closeSheet(closingSheet.id);
    return true;
  }

  function handleCloseWithoutSaving() {
    closeSheet(closingId);
  }

  function handleLogout() {
    if (sheets.some(isSheetDirty) && !window.confirm("יש שינויים שלא נשמרו. להתנתק בכל זאת?")) {
      return;
    }
    onLogout();
  }

  return (
    <div className="app">
      <aside className="side-panel">
        <FileMenu
          fileNames={fileNames}
          currentFileName={currentFileName}
          chars={focusedSheet ? focusedSheet.chars : []}
          onSave={handleSave}
          onSaveAs={handleSaveAs}
          onOpen={handleOpen}
        />

        <UserBar userName={userName} onLogout={handleLogout} />
      </aside>

      <TextAreasBoard
        sheets={sheets}
        focusedId={focusedId}
        onFocus={focusSheet}
        onClose={handleClose}
        onNew={() => addSheet(createSheet(Date.now()))}
        onRename={handleRename}
      />


      <ControlPanel
        style={currentStyle}
        scope={scope}
        canUndo={focusedSheet?.history.length > 0}
        searchCount={searchCount}
        onTypeLetter={typeLetter}
        onStyleChange={changeStyle}
        onScopeChange={setScope}
        onDelete={deleteText}
        onUndo={() => updateSheet(undoSheet)}
        onSearch={setSearchQuery}
        onReplace={replace}
            >
        <div className="image-area" />
      </ControlPanel>

      {closingSheet && (
        <FileNameDialog
          key={closingSheet.id}
          mode="close"
          initialName=""
          currentFileName={getSheetName(closingSheet)}
          fileNames={fileNames}
          onSubmit={handleSaveAndClose}
          onDontSave={handleCloseWithoutSaving}
          onCancel={() => setClosingId(null)}
        />
      )}
    </div>
  );
}

export default EditorScreen;