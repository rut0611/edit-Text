import { useState, useRef, useEffect } from "react";
import "./FileMenu.css";
import Icon from "../common/Icon";
import FileNameDialog from "../dialogs/FileNameDialog";
import { exportTextFile } from "../../utils/exportUtils";

// כפתור בתפריט: אייקון + טקסט (משמש רק כאן)
function MenuItem({ icon, active = false, children, ...props }) {
  return (
    <button
      type="button"
      className={`menu-item${active ? " menu-item--active" : ""}`}
      {...props}
    >
      <Icon name={icon} />
      <span className="menu-item__text">{children}</span>
    </button>
  );
}

/*
  FileMenu - הקבצים של המשתמש: שמירה, שמירה בשם, ייצוא לקובץ טקסט,
  ורשימת הקבצים לפתיחה.

  chars - מערך התווים של הגליון הממוקד (לייצוא)
*/
function FileMenu({
  fileNames,
  currentFileName,
  chars,
  onSave,
  onSaveAs,
  onOpen,
}) {
  const [dialog, setDialog] = useState(null); // null, "save" או "saveAs"
  const [message, setMessage] = useState(null); // { text, ok, id } או null
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  // הודעה קצרה שנעלמת לבד אחרי כמה שניות
  function showMessage(text, ok = false) {
    setMessage({ text, ok, id: Date.now() });
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

  // נקראת מהחלונית. מחזירה true אם השמירה הצליחה.
  function handleDialogSubmit(name) {
    const ok = onSaveAs(name);
    if (ok) {
      setDialog(null);
      showMessage(`נשמר בשם "${name}"`, true);
    }
    return ok;
  }

  // ייצוא לקובץ טקסט במחשב (נפתח חלון לבחירת שם ותיקייה)
  async function handleExport() {
    try {
      await exportTextFile(chars, currentFileName);
    } catch {
      window.alert("הייצוא נכשל");
    }
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
        <MenuItem icon="save" onClick={handleSaveClick}>
          שמירה
        </MenuItem>
        <MenuItem icon="saveAs" onClick={() => setDialog("saveAs")}>
          שמירה בשם...
        </MenuItem>
        <MenuItem
          icon="download"
          onClick={handleExport}
          disabled={chars.length === 0}
          title={chars.length === 0 ? "אין טקסט לייצוא" : ""}
        >
          ייצוא לקובץ טקסט
        </MenuItem>
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

        {fileNames.map((name) => (
          <li key={name} className="file-list__row">
            <MenuItem
              icon="file"
              active={name === currentFileName}
              title={name}
              onClick={() => onOpen(name)}
            >
              {name}
            </MenuItem>
          </li>
        ))}
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