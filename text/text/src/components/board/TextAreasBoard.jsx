import "./TextAreasBoard.css";
import TextArea from "./TextArea";
import Icon from "../common/Icon";
import { getSheetName, isSheetDirty } from "../../utils/sheetUtils";

function TextAreasBoard({
  sheets,
  focusedId,
  renaming,
  onFocus,
  onClose,
  onNew,
  onRenameStart,
  onRenameChange,
  onRenameCommit,
  onRenameCancel,
}) {
  const focusedSheet = sheets.find((t) => t.id === focusedId) || null;

  function handleRenameKeyDown(e) {
    if (e.key === "Enter") {
      onRenameCommit();
    } else if (e.key === "Escape") {
      onRenameCancel();
    }
  }

  return (
    <div className="text-areas-board">
      {/* שורת הלשוניות */}
      <div className="tabs-bar">
        {sheets.map((t) => {
          const name = getSheetName(t) || "ללא שם";
          const isRenaming = renaming !== null && renaming.id === t.id;

          let tabClass = "sheet-tab";
          if (t.id === focusedId) {
            tabClass = "sheet-tab sheet-tab--active";
          }

          return (
            <div
              key={t.id}
              className={tabClass}
              onDoubleClick={() => onRenameStart(t.id)}
            >
              {isRenaming ? (
                <input
                  className="sheet-tab__input"
                  dir="auto"
                  autoFocus
                  value={renaming.value}
                  onChange={(e) => onRenameChange(e.target.value)}
                  onFocus={(e) => e.target.select()}
                  onBlur={() => onRenameCommit()}
                  onKeyDown={handleRenameKeyDown}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <button
                  className="sheet-tab__name"
                  dir="auto"
                  title={name}
                  onClick={() => onFocus(t.id)}
                >
                  {name}
                </button>
              )}

              {/* נקודה = יש שינויים שלא נשמרו */}
              {isSheetDirty(t) && (
                <span
                  className="sheet-tab__dot"
                  title="יש שינויים שלא נשמרו"
                />
              )}

              <button
                className="sheet-tab__close"
                aria-label={"סגור " + name}
                onClick={() => onClose(t.id)}
              >
                <Icon name="close" size={12} strokeWidth={2} />
              </button>
            </div>
          );
        })}

        {/* כפתור גליון חדש - מיד אחרי הלשונית האחרונה */}
        <button
          className="tabs-bar__add"
          aria-label="גליון חדש"
          title="גליון חדש"
          onClick={onNew}
        />
      </div>

      {/* הגליון הנוכחי בלבד */}
      <div className="sheet-frame">
        {focusedSheet && (
          <TextArea
            key={focusedSheet.id}
            chars={focusedSheet.chars}
            style={focusedSheet.style}
          />
        )}

        {!focusedSheet && (
          <button className="empty-add" aria-label="גליון חדש" onClick={onNew} />
        )}
      </div>
    </div>
  );
}

export default TextAreasBoard;