import "./EditTools.css";
import DeleteButtons from "./DeleteButtons";
import SearchReplace from "./SearchReplace";
import UndoButton from "./UndoButton";

/*
  EditTools - עוטף את כלי העריכה: מחיקה, חיפוש והחלפה, ביטול.

  מקבל (props):   canUndo, searchResults
  מדווח למעלה:    onDelete(type), onSearch(query), onReplace(from, to), onUndo()

  מה צריך לעשות בקובץ הזה:
  1. [ ] לקבל את ה-props.
  2. [ ] להציג DeleteButtons ולהעביר לו onDelete.
  3. [ ] להציג SearchReplace ולהעביר לו searchResults, onSearch, onReplace.
  4. [ ] להציג UndoButton ולהעביר לו canUndo ו-onUndo.
  5. [ ] הרכיב רק מעביר הלאה - בלי לוגיקה משלו.
*/

function EditTools() {
  return (
    <div className="edit-tools">
      <DeleteButtons />
      <SearchReplace />
      <UndoButton />
    </div>
  );
}

export default EditTools;
