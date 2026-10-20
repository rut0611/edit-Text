import { useState } from "react";
import "./FileMenu.css";

function FileMenu({
  fileNames,
  currentFileName,
  onSave,
  onSaveAs,
  onOpen,
}) {
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState("");

  function handleSave() {
    const ok = onSave();
    setMessage(ok ? "נשמר" : "השמירה נכשלה");
  }

  function handleSaveAs() {
    const name = fileName.trim();

    if (name === "") {
      setMessage("יש להקליד שם קובץ");
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
    setMessage(ok ? "נשמר" : "השמירה נכשלה");
    if (ok) {
      setFileName("");
    }
  }

  function handleOpen(e) {
    const name = e.target.value;
    if (name === "") {
      return;
    }
    onOpen(name);
    setMessage("");
  }

  return (
    <div className="file-menu">
      <span className="file-menu__current">
        {currentFileName ? "קובץ: " + currentFileName : "ללא שם"}
      </span>

      <button onClick={handleSave} disabled={!currentFileName}>
        שמור
      </button>

      <input
        className="file-menu__input"
        placeholder="שם קובץ"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />
      <button onClick={handleSaveAs}>שמור בשם</button>

      <select className="file-menu__list" value="" onChange={handleOpen}>
        <option value="">פתח קובץ...</option>
        {fileNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <span className="file-menu__message">{message}</span>
    </div>
  );
}

export default FileMenu;