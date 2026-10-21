import { useState, useRef } from "react";
import "./FileMenu.css";
import Icon from "../common/Icon";
import FileNameDialog from "../dialogs/FileNameDialog";

/*
  FileMenu - הקבצים של המשתמש: שמירה, שמירה בשם, ורשימת הקבצים לפתיחה.
  ה-children (כפתור הייצוא) מוצג יחד עם שאר הפעולות.
*/

function FileMenu({
  fileNames,
  currentFileName,
  onSave,
  onSaveAs,
  onOpen,
  children,
}) {
  const [dialog, setDialog] = useState(null); // null, "save" או "saveAs"
  const [message, setMessage] = useState(null); // { text, ok, id } או null
  const timerRef = useRef(null);

  // הודעה קצרה שנעלמת לבד אחרי כמה שניות
  function showMessage(text, ok = false) {
    setMessage({ text: text, ok: ok, id: Date.now() });
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setMessage(null), 3000);
  }

  // "שמירה": יש שם - שומרים. אין שם - פותחים חלונית לבחירת שם.
  function handleSaveClick() {
    if (!currentFileName) {
      setDialog("save");
      return;
    }
    const ok = onSave();
    showMessage(ok ? "נשמר" : "השמירה נכשלה", ok);
  }

  function handleSaveAsClick() {
    setDialog("saveAs");
  }

  // נקראת מהחלונית. מחזירה true אם השמירה הצליחה.
  function handleDialogSubmit(name) {
    const ok = onSaveAs(name);
    if (ok) {
      setDialog(null);
      showMessage('נשמר בשם "' + name + '"', true);
    }
    return ok;
  }

  return (
    <div className="file-menu">
      <div className="file-menu__current">
        <span className="file-menu__label">הגליון הנוכחי</span>
        <span className="file-menu__name" title={currentFileName || ""}>
          {currentFileName || "ללא שם"}
        </span>
      </div>

      <div className="file-menu__actions">
        <button className="menu-item" onClick={handleSaveClick}>
          <Icon name="save" />
          <span>שמירה</span>
        </button>

        <button className="menu-item" onClick={handleSaveAsClick}>
          <Icon name="saveAs" />
          <span>שמירה בשם...</span>
        </button>

        {children}
      </div>

      <p className="file-menu__message" role="status">
        {message && (
          <span key={message.id} className="file-menu__msg">
            {message.ok && <Icon name="check" size={15} strokeWidth={2} draw />}
            {message.text}
          </span>
        )}
      </p>

      <div className="file-menu__divider" />

      <span className="file-menu__label">הקבצים שלי</span>

      <ul className="file-list">
        {fileNames.length === 0 && (
          <li className="file-list__empty">עדיין אין קבצים שמורים</li>
        )}

        {fileNames.map((name) => {
          let itemClass = "menu-item";
          if (name === currentFileName) {
            itemClass = "menu-item menu-item--active";
          }
          return (
            <li key={name} className="file-list__row">
              <button
                className={itemClass}
                title={name}
                onClick={() => onOpen(name)}
              >
                <Icon name="file" />
                <span className="menu-item__text">{name}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {dialog && (
        <FileNameDialog
          key={dialog}
          mode={dialog}
          initialName={dialog === "saveAs" ? currentFileName || "" : ""}
          currentFileName={currentFileName}
          fileNames={fileNames}
          onSubmit={handleDialogSubmit}
          onCancel={() => setDialog(null)}
        />
      )}
    </div>
  );
}

export default FileMenu;