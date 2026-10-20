// src/EditorScreen.jsx
import { useState, useRef } from "react";
import "./App.css";
import TextAreasBoard from "./components/board/TextAreasBoard";
import ControlPanel from "./components/controlPanel/ControlPanel";
import FileMenu from "./components/controlPanel/fileMenu/FileMenu";
import SaveOnCloseDialog from "./components/dialogs/SaveOnCloseDialog";
import UserBar from "./components/user/UserBar";
import useSheets from "./hooks/useSheets";
import useFiles from "./hooks/useFiles";
import { defaultStyle } from "./data/styleOptions";
import { isSheetDirty } from "./utils/sheetUtils";
import ExportButton from "./components/controlPanel/fileMenu/ExportButton";

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
    renameSheet,
    focusSheet,
    closeSheet,
  } = useSheets();

  const { fileNames, save, open, rename } = useFiles(userName);

  const [closingId, setClosingId] = useState(null);
  const closingSheet = sheets.find((s) => s.id === closingId) || null;

  // ---------- שינוי שם של לשונית ----------
  // renaming = { id, value, fresh } או null.
  // fresh = true כל עוד לא נגעו בשם: האות הראשונה מחליפה את כל השם (כמו טקסט מסומן).
  // ה-ref תמיד מחזיק את הערך העדכני, כדי שלחיצות מהירות וקריאות כפולות לא יתבלבלו.
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
    setRenaming({
      id: id,
      value: sheet.fileName || sheet.draftName || "",
      fresh: true,
    });
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
    let base = current.value;
    if (current.fresh) {
      base = "";
    }
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
    const currentName = sheet.fileName || sheet.draftName || "";
    if (name === "" || name === currentName) {
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
      const ok = rename(sheet.fileName, name);
      if (!ok) {
        window.alert("שינוי השם נכשל");
        return;
      }
    }

    renameSheet(id, name);
  }

  // ---------- שמירה ופתיחה ----------
  let currentStyle = defaultStyle;
  let currentFileName = null;
  if (focusedSheet) {
    currentStyle = focusedSheet.style;
    currentFileName = focusedSheet.fileName || focusedSheet.draftName || null;
  }

  function handleSave() {
    if (!focusedSheet) {
      return false;
    }
    const name = focusedSheet.fileName || focusedSheet.draftName;
    if (!name) {
      return false;
    }
    const ok = save(name, focusedSheet.chars);
    if (ok) {
      markSheetSaved(name);
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
    <div className="app" onMouseDown={handleAppMouseDown}>
            <aside className="side-panel">
        <FileMenu
          fileNames={fileNames}
          currentFileName={currentFileName}
          onSave={handleSave}
          onSaveAs={handleSaveAs}
          onOpen={handleOpen}
        >
          <ExportButton
            chars={focusedSheet ? focusedSheet.chars : []}
            fileName={currentFileName}
          />
        </FileMenu>

        <UserBar userName={userName} onLogout={handleLogout} />
      </aside>

      <TextAreasBoard
        texts={sheets}
        focusedId={focusedId}
        renaming={renaming}
        onFocus={focusSheet}
        onClose={handleClose}
        onNew={addNewSheet}
        onRenameStart={startRename}
        onRenameChange={changeRenameValue}
        onRenameCommit={commitRename}
        onRenameCancel={cancelRename}
      />

      <div className="image-area">{/* תמונה - בהמשך */}</div>

      <ControlPanel
        style={currentStyle}
        scope={scope}
        canUndo={canUndo}
        searchCount={searchCount}
        onTypeLetter={handleTypeLetter}
        onStyleChange={changeStyle}
        onScopeChange={setScope}
        onDelete={handleDelete}
        onUndo={undo}
        onSearch={search}
        onReplace={replace}
      />

      {closingSheet && (
        <SaveOnCloseDialog
          key={closingSheet.id}
          currentFileName={closingSheet.fileName || closingSheet.draftName || null}
          fileNames={fileNames}
          onSave={handleSaveAndClose}
          onDontSave={handleCloseWithoutSaving}
          onCancel={handleCancelClose}
        />
      )}
    </div>
  );
}

export default EditorScreen;