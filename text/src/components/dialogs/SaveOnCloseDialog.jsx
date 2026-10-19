import { useState } from "react";
import "./SaveOnCloseDialog.css";

/*
  SaveOnCloseDialog - שאלה בסגירת גיליון עם שינויים שלא נשמרו.

  מקבל (props):   currentFileName - שם הקובץ של הגיליון (או null אם לא נשמר מעולם)
                  fileNames - שמות הקבצים הקיימים
  מדווח למעלה:    onSave(name) - מחזירה true/false, onDontSave(), onCancel()
*/

function SaveOnCloseDialog({
  currentFileName,
  fileNames,
  onSave,
  onDontSave,
  onCancel,
}) {
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState("");

  function handleSave() {
    let name = currentFileName;

    // גיליון שלא נשמר מעולם - צריך שם
    if (!name) {
      name = fileName.trim();

      if (name === "") {
        setMessage("יש להקליד שם קובץ");
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
    }

    const ok = onSave(name);
    if (!ok) {
      setMessage("השמירה נכשלה");
    }
  }

  return (
    <div className="save-dialog">
      <p>לשמור את השינויים לפני הסגירה?</p>

      {currentFileName ? (
        <p>קובץ: {currentFileName}</p>
      ) : (
        <input
          placeholder="שם קובץ"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
      )}

      <button onClick={handleSave}>שמור וסגור</button>
      <button onClick={onDontSave}>סגור בלי לשמור</button>
      <button onClick={onCancel}>ביטול</button>

      <span className="save-dialog__message">{message}</span>
    </div>
  );
}

export default SaveOnCloseDialog;