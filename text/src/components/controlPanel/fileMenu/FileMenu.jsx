import { useState, useRef } from "react";
import "./FileMenu.css";
import Icon from "../../common/Icon";

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
  const [saveAsOpen, setSaveAsOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState("");
  const timerRef = useRef(null);

  // הודעה קצרה שנעלמת לבד אחרי כמה שניות
  function showMessage(text) {
    setMessage(text);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setMessage(""), 3000);
  }

  function handleSave() {
    // אין עדיין שם לקובץ - צריך לבחור שם
    if (!currentFileName) {
      setSaveAsOpen(true);
      showMessage("בחרי שם לקובץ ולחצי Enter");
      return;
    }
    const ok = onSave();
    showMessage(ok ? "נשמר" : "השמירה נכשלה");
  }

  function handleSaveAs() {
    const name = fileName.trim();

    if (name === "") {
      showMessage("יש להקליד שם קובץ");
      return;
    }

    if (fileNames.includes(name) && name !== currentFileName) {
      const confirmed = window.confirm(
        'הקובץ "' + name + '" כבר קיים. להחליף אותו?'
      );
      if (!confirmed) {
        return;
      }
    }

    const ok = onSaveAs(name);
    if (ok) {
      showMessage('נשמר בשם "' + name + '"');
      setFileName("");
      setSaveAsOpen(false);
    } else {
      showMessage("השמירה נכשלה");
    }
  }

  function handleSaveAsKeyDown(e) {
    if (e.key === "Enter") {
      handleSaveAs();
    } else if (e.key === "Escape") {
      setSaveAsOpen(false);
      setFileName("");
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
        <button className="menu-item" onClick={handleSave}>
          <Icon name="save" />
          <span>שמירה</span>
        </button>

        <button
          className="menu-item"
          onClick={() => setSaveAsOpen(!saveAsOpen)}
        >
          <Icon name="saveAs" />
          <span>שמירה בשם...</span>
        </button>

        {saveAsOpen && (
          <div className="file-menu__saveas">
            <input
              autoFocus
              placeholder="שם הקובץ"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              onKeyDown={handleSaveAsKeyDown}
            />
            <button className="file-menu__confirm" onClick={handleSaveAs}>
              שמור
            </button>
          </div>
        )}

        {children}
      </div>

      <p className="file-menu__message" role="status">
        {message}
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
            <li key={name}>
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
    </div>
  );
}

export default FileMenu;