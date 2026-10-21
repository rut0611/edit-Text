import "./TextAreasBoard.css";
import TextArea from "./TextArea";
import Icon from "../common/Icon";
import { getSheetName, isSheetDirty } from "../../utils/sheetUtils";

/*
  SheetTab - לשונית אחת: שם (או שדה שינוי שם), נקודת "לא נשמר" וכפתור סגירה.
  renameValue - הטקסט בשדה שינוי השם, או null אם הלשונית לא בשינוי שם.
*/
function SheetTab({
  sheet,
  active,
  renameValue,
  onFocus,
  onClose,
  onRenameStart,
  onRenameChange,
  onRenameCommit,
  onRenameCancel,
}) {
  const name = getSheetName(sheet) || "ללא שם";
  const isRenaming = renameValue !== null;

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      onRenameCommit();
    } else if (e.key === "Escape") {
      onRenameCancel();
    }
  }

  return (
    <div
      className={`sheet-tab${active ? " sheet-tab--active" : ""}`}
      onDoubleClick={() => onRenameStart(sheet.id)}
    >
      {isRenaming ? (
        <input
          className="sheet-tab__input"
          dir="auto"
          autoFocus
          value={renameValue}
          onChange={(e) => onRenameChange(e.target.value)}
          onFocus={(e) => e.target.select()}
          onBlur={() => onRenameCommit()}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
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

      {/* נקודה = יש שינויים שלא נשמרו */}
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
}

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
  const focusedSheet = sheets.find((s) => s.id === focusedId) || null;

  return (
    <div className="text-areas-board">
      {/* שורת הלשוניות */}
      <div className="tabs-bar">
        {sheets.map((sheet) => (
          <SheetTab
            key={sheet.id}
            sheet={sheet}
            active={sheet.id === focusedId}
            renameValue={renaming?.id === sheet.id ? renaming.value : null}
            onFocus={onFocus}
            onClose={onClose}
            onRenameStart={onRenameStart}
            onRenameChange={onRenameChange}
            onRenameCommit={onRenameCommit}
            onRenameCancel={onRenameCancel}
          />
        ))}

        {/* כפתור גליון חדש - מיד אחרי הלשונית האחרונה */}
        <button
          type="button"
          className="tabs-bar__add"
          aria-label="גליון חדש"
          title="גליון חדש"
          onClick={onNew}
        />
      </div>

      {/* הגליון הנוכחי בלבד */}
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