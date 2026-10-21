import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./FileNameDialog.css";
import Icon from "../common/Icon";

/*
  FileNameDialog - החלונית היחידה לשמירת קובץ.

  מקבל (props):   mode - "save" (גליון בלי שם), "saveAs" (שמירה בשם)
                         או "close" (סגירת גליון עם שינויים שלא נשמרו)
                  initialName - השם שמופיע בשדה בפתיחה
                  currentFileName - שם הגליון הנוכחי (או null)
                  fileNames - שמות הקבצים הקיימים
  מדווח למעלה:    onSubmit(name) - מחזירה true אם השמירה הצליחה
                  onDontSave() - רק ב-"close": סגירה בלי לשמור
                  onCancel()
*/

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
  const [error, setError] = useState("");

  const isClose = mode === "close";

  // בסגירה של גליון שכבר יש לו שם - לא צריך לשאול שם, שומרים באותו קובץ
  const hasInput = !(isClose && currentFileName);

  let finalName = currentFileName;
  if (hasInput) {
    finalName = name.trim();
  }

  const willReplace =
    hasInput &&
    finalName !== "" &&
    finalName !== currentFileName &&
    fileNames.includes(finalName);

  // Esc סוגר את החלונית
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") {
        onCancel();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onCancel]);

  function handleSubmit() {
    if (finalName === "") {
      setError("יש להקליד שם לקובץ");
      return;
    }
    const ok = onSubmit(finalName);
    if (!ok) {
      setError("השמירה נכשלה. ייתכן שנגמר המקום באחסון.");
    }
  }

  function handleChange(e) {
    setName(e.target.value);
    setError("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }

  // לחיצה על הרקע המוחשך סוגרת
  function handleBackdropMouseDown(e) {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  }

  let title = "שמירת קובץ";
  let subtitle = "איך לקרוא לקובץ?";
  let iconName = "save";
  let okText = "שמירה";

  if (mode === "saveAs") {
    title = "שמירה בשם";
    iconName = "saveAs";
  } else if (isClose) {
    title = "לשמור לפני הסגירה?";
    okText = "שמירה וסגירה";
    if (currentFileName) {
      subtitle = "יש שינויים שלא נשמרו";
    } else {
      subtitle = "הגליון עוד לא נשמר. איך לקרוא לקובץ?";
    }
  }

  if (willReplace) {
    okText = "החלפה ושמירה";
  }

  // השורה מתחת לשדה: שגיאה, אזהרה או הסבר
  let noteText = "הקובץ יופיע ברשימת הקבצים שלך.";
  let noteClass = "fn-note";
  if (error !== "") {
    noteText = error;
    noteClass = "fn-note fn-note--error";
  } else if (willReplace) {
    noteText = "קובץ בשם הזה כבר קיים. השמירה תחליף אותו.";
    noteClass = "fn-note fn-note--warn";
  } else if (!hasInput) {
    noteText = "השינויים יישמרו בקובץ הזה לפני הסגירה.";
  }

  let buttonsClass = "fn-buttons";
  if (isClose) {
    buttonsClass = "fn-buttons fn-buttons--close";
  }

  return createPortal(
    <div className="fn-backdrop" onMouseDown={handleBackdropMouseDown}>
      <div
        className="fn-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="fn-title"
      >
        <div className="fn-head">
          <span className="fn-badge">
            <Icon name={iconName} size={22} />
          </span>
          <div>
            <h2 id="fn-title" className="fn-title">
              {title}
            </h2>
            <p className="fn-sub">{subtitle}</p>
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
              onChange={handleChange}
              onKeyDown={handleKeyDown}
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

        <p className={noteClass}>{noteText}</p>

        <div className={buttonsClass}>
          <button
            className="fn-ok"
            autoFocus={!hasInput}
            onClick={handleSubmit}
            disabled={finalName === ""}
          >
            {okText}
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