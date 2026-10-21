import "./EditTools.css";
import SearchReplace from "./SearchReplace";
import UndoButton from "./UndoButton";

// כלי עריכה מתקדמים: חיפוש/החלפה וביטול פעולה אחרונה (undo)
function EditTools({ canUndo, onUndo, searchCount, onSearch, onReplace }) {
  return (
    <div className="edit-tools">
      <SearchReplace
        searchCount={searchCount}
        onSearch={onSearch}
        onReplace={onReplace}
      />
      <UndoButton
        canUndo={canUndo}
        onUndo={onUndo}
      />
    </div>
  );
}

export default EditTools;
