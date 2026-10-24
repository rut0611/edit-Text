import { useState } from "react";
import "../../style/TextAreasBoard.css";
import TextArea from "./TextArea";
import Icon from "../common/Icon";
import { getSheetName, isSheetDirty, findSheet } from "../../utils/sheetUtils";

function TextAreasBoard({ sheets, focusedId, onFocus, onClose, onNew, onRename }) {
  const [editingId, setEditingId] = useState(null); // הלשונית שנמצאת בשינוי שם
  const focusedSheet = findSheet(sheets, focusedId);

  function finishRename(id, value) {
    setEditingId(null);
    onRename(id, value);
  }

  return (
    <div className="text-areas-board">
      {/* שורת הלשוניות */}
      <div className="tabs-bar">
        {sheets.map((sheet) => {
          const name = getSheetName(sheet) || "ללא שם";

          return (
            <div
              key={sheet.id}
              className={`sheet-tab${sheet.id === focusedId ? " sheet-tab--active" : ""}`}
              onDoubleClick={() => setEditingId(sheet.id)}
            >
              {editingId === sheet.id ? (
                <input
                  className="sheet-tab__input"
                  dir="auto"
                  autoFocus
                  defaultValue={name}
                  onFocus={(e) => e.target.select()}
                  onBlur={(e) => finishRename(sheet.id, e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
                />
              ) : (
                <button
                  type="button"
                  className="sheet-tab__name"
                  dir="auto"
                  title={name}
                  onClick={() => onFocus(sheet.id)}
                >
                  {name}
                </button>
              )}

              {isSheetDirty(sheet) && (
                <span className="sheet-tab__dot" title="יש שינויים שלא נשמרו" />
              )}

              <button
                type="button"
                className="sheet-tab__close"
                aria-label={"סגור " + name}
                onClick={() => onClose(sheet.id)}
              >
                <Icon name="close" size={12} strokeWidth={2} />
              </button>
            </div>
          );
        })}

        <button
          type="button"
          className="tabs-bar__add"
          aria-label="גליון חדש"
          title="גליון חדש"
          onClick={onNew}
        />
      </div>

      <div className="sheet-frame">
        {focusedSheet ? (
          <TextArea
            key={focusedSheet.id}
            chars={focusedSheet.chars}
            style={focusedSheet.style}
          />
        ) : (
          <button
            type="button"
            className="empty-add"
            aria-label="גליון חדש"
            onClick={onNew}
          />
        )}
      </div>
    </div>
  );
}

export default TextAreasBoard;