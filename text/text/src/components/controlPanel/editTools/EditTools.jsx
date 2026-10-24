import "../../../style/EditTools.css";
import SearchReplace from "./SearchReplace";

function EditTools({ canUndo, onUndo, searchCount, onSearch, onReplace }) {
  return (
    <div className="edit-tools">
      <SearchReplace
        searchCount={searchCount}
        onSearch={onSearch}
        onReplace={onReplace}
      />
      <button
        type="button"
        className="edit-tools__btn edit-tools__btn--wide"
        disabled={!canUndo}
        onClick={onUndo}
      >
        בטל
      </button>
    </div>
  );
}

export default EditTools;