import "./EditTools.css";
import DeleteButtons from "./DeleteButtons";
import SearchReplace from "./SearchReplace";
import UndoButton from "./UndoButton";

/*
  EditTools - עוטף את כלי העריכה: מחיקה, חיפוש והחלפה, ביטול.

  מקבל (props):   canUndo, searchResults
  מדווח למעלה:    onDelete(type), onSearch(query), onReplace(from, to), onUndo()

  הרכיב רק מעביר הלאה - בלי לוגיקה משלו.
*/

function EditTools({
  onDelete,
  canUndo,
  onUndo,
  searchCount,
  onSearch,
  onReplace,
}) {
  return (
    <div className="edit-tools">
      <DeleteButtons onDelete={onDelete} />
      <SearchReplace
        searchCount={searchCount}
        onSearch={onSearch}
        onReplace={onReplace}
      />
      <UndoButton canUndo={canUndo} onUndo={onUndo} />
    </div>
  );
}

export default EditTools;