// src/EditorScreen.jsx
import { useState } from "react";
import "./App.css";
import TextAreasBoard from "./components/board/TextAreasBoard";
import ControlPanel from "./components/controlPanel/ControlPanel";
import FileMenu from "./components/controlPanel/fileMenu/FileMenu";
import SaveOnCloseDialog from "./components/dialogs/SaveOnCloseDialog";
import UserBar from "./components/user/UserBar"; // חדש
import useSheets from "./hooks/useSheets";
import useFiles from "./hooks/useFiles";
import { defaultStyle } from "./data/styleOptions";
import { isSheetDirty } from "./utils/sheetUtils";

// שונה: הפונקציה מקבלת את שם המשתמש ופונקציית ההתנתקות
function EditorScreen({ userName, onLogout }) {
  const {
    sheets,
    focusedSheet,
    focusedId,
    scope,
    setScope,
    typeLetter,
    deleteText,
    changeStyle,
    undo,
    canUndo,
    searchCount,
    search,
    replace,
    markSheetSaved,
    openSheetFromFile,
    addNewSheet,
    focusSheet,
    closeSheet,
  } = useSheets();

  // שונה: במקום "guest" שולחים את המשתמש האמיתי
  const { fileNames, save, open } = useFiles(userName);

  const [closingId, setClosingId] = useState(null);
  const closingSheet = sheets.find((s) => s.id === closingId) || null;

  let currentStyle = defaultStyle;
  let currentFileName = null;
  if (focusedSheet) {
    currentStyle = focusedSheet.style;
    currentFileName = focusedSheet.fileName;
  }

  function handleSave() {
    if (!focusedSheet || !focusedSheet.fileName) {
      return false;
    }
    const ok = save(focusedSheet.fileName, focusedSheet.chars);
    if (ok) {
      markSheetSaved(focusedSheet.fileName);
    }
    return ok;
  }

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

  function handleOpen(name) {
    const existing = sheets.find((s) => s.fileName === name);
    if (existing) {
      focusSheet(existing.id);
      return;
    }

    const chars = open(name);
    if (chars === null) {
      return;
    }
    openSheetFromFile(name, chars);
  }

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
    const ok = save(name, closingSheet.chars);
    if (!ok) {
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

  // חדש: התנתקות, עם אזהרה אם יש שינויים שלא נשמרו
  function handleLogout() {
    const hasUnsaved = sheets.some(isSheetDirty);
    if (hasUnsaved) {
      const ok = window.confirm("יש שינויים שלא נשמרו. להתנתק בכל זאת?");
      if (!ok) {
        return;
      }
    }
    onLogout();
  }

  return (
    <div className="app">
      {/* שונה: במקום <h1>העורך שלי</h1> */}
      <UserBar userName={userName} onLogout={handleLogout} />

      <TextAreasBoard
        texts={sheets}
        focusedId={focusedId}
        onFocus={focusSheet}
        onClose={handleClose}
      />

      {closingSheet && (
        <SaveOnCloseDialog
          key={closingSheet.id}
          currentFileName={closingSheet.fileName}
          fileNames={fileNames}
          onSave={handleSaveAndClose}
          onDontSave={handleCloseWithoutSaving}
          onCancel={handleCancelClose}
        />
      )}

      <FileMenu
        fileNames={fileNames}
        currentFileName={currentFileName}
        onNew={addNewSheet}
        onSave={handleSave}
        onSaveAs={handleSaveAs}
        onOpen={handleOpen}
      />

      <ControlPanel
        style={currentStyle}
        scope={scope}
        canUndo={canUndo}
        searchCount={searchCount}
        onTypeLetter={typeLetter}
        onStyleChange={changeStyle}
        onScopeChange={setScope}
        onDelete={deleteText}
        onUndo={undo}
        onSearch={search}
        onReplace={replace}
      />
    </div>
  );
}

// שונה: שם הייצוא
export default EditorScreen;