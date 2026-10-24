import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "../../style/FileNameDialog.css";
import Icon from "../common/Icon";

/*
  FileNameDialog - החלונית היחידה לשמירת קובץ.

  props:  mode - "save" (גליון בלי שם), "saveAs" (שמירה בשם)
                 או "close" (סגירת גליון עם שינויים שלא נשמרו)
          initialName - השם שמופיע בשדה בפתיחה
          currentFileName - שם הגליון הנוכחי (או null)
          fileNames - שמות הקבצים הקיימים
          onSubmit(name) - מחזירה true אם השמירה הצליחה
          onDontSave() - רק ב-"close": סגירה בלי לשמור
          onCancel()
*/

const TEXTS = {
  save: { icon: "save", title: "שמירת קובץ", sub: "איך לקרוא לקובץ?", ok: "שמירה" },
  saveAs: { icon: "saveAs", title: "שמירה בשם", sub: "איך לקרוא לקובץ?", ok: "שמירה" },
  close: {
    icon: "save",
    title: "לשמור לפני הסגירה?",
    sub: "הגליון עוד לא נשמר. איך לקרוא לקובץ?",
    ok: "שמירה וסגירה",
  },
};

function FileNameDialog({
  mode,
  initialName,
  currentFileName,
  fileNames,
  onSubmit,
  onDontSave,
  onCancel,
}) {
  const [name, setName] = useState(initialName);
  const [failed, setFailed] = useState(false);

  const isClose = mode === "close";
  const text = TEXTS[mode];

  // בסגירה של גליון שכבר יש לו שם - לא שואלים שם, שומרים באותו קובץ
  const hasInput = !(isClose && currentFileName);
  const finalName = hasInput ? name.trim() : currentFileName;
  const willReplace =
    hasInput && finalName !== currentFileName && fileNames.includes(finalName);

  // Esc סוגר את החלונית
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onCancel();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onCancel]);

  function handleSubmit() {
    if (finalName && !onSubmit(finalName)) {
      setFailed(true);
    }
  }

  // השורה מתחת לשדה: שגיאה, אזהרה או הסבר
  let note = hasInput
    ? "הקובץ יופיע ברשימת הקבצים שלך."
    : "השינויים יישמרו בקובץ הזה לפני הסגירה.";
  let noteClass = "fn-note";
  if (failed) {
    note = "השמירה נכשלה. ייתכן שנגמר המקום באחסון.";
    noteClass += " fn-note--error";
  } else if (willReplace) {
    note = "קובץ בשם הזה כבר קיים. השמירה תחליף אותו.";
    noteClass += " fn-note--warn";
  }

  return createPortal(
    <div
      className="fn-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="fn-dialog" role="dialog" aria-modal="true" aria-labelledby="fn-title">
        <div className="fn-head">
          <span className="fn-badge">
            <Icon name={text.icon} size={22} />
          </span>
          <div>
            <h2 id="fn-title" className="fn-title">
              {text.title}
            </h2>
            <p className="fn-sub">{hasInput ? text.sub : "יש שינויים שלא נשמרו"}</p>
          </div>
        </div>

        {hasInput ? (
          <>
            <label className="fn-label" htmlFor="fn-input">
              שם הקובץ
            </label>
            <input
              id="fn-input"
              className="fn-input"
              dir="auto"
              autoFocus
              maxLength={60}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setFailed(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              onFocus={(e) => e.target.select()}
            />
          </>
        ) : (
          <>
            <span className="fn-label">הקובץ</span>
            <div className="fn-file" title={currentFileName}>
              {currentFileName}
            </div>
          </>
        )}

        <p className={noteClass}>{note}</p>

        <div className={`fn-buttons${isClose ? " fn-buttons--close" : ""}`}>
          <button
            className="fn-ok"
            autoFocus={!hasInput}
            onClick={handleSubmit}
            disabled={!finalName}
          >
            {willReplace ? "החלפה ושמירה" : text.ok}
          </button>

          {isClose && (
            <button className="fn-dont" onClick={onDontSave}>
              סגירה בלי לשמור
            </button>
          )}

          <button className="fn-cancel" onClick={onCancel}>
            ביטול
          </button>
        </div>

        <p className="fn-keys">
          {hasInput ? "Enter לשמירה · Esc לביטול" : "Esc לביטול"}
        </p>
      </div>
    </div>,
    document.body
  );
}

export default FileNameDialog;