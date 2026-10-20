import "./EditTools.css";
import SearchReplace from "./SearchReplace";
import UndoButton from "./UndoButton";



function EditTools({
  canUndo,
  onUndo,
  searchCount,
  onSearch,
  onReplace,
}) {
  return (
    <div className="edit-tools">
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