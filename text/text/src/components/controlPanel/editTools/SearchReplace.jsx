import { useState } from "react";
import "../../../style/SearchReplace.css";

function getResultText(count) {
  if (count === null) return "";
  return count === 0 ? "לא נמצא" : `נמצאו ${count}`;
}

function SearchReplace({ searchCount, onSearch, onReplace }) {
  const [query, setQuery] = useState("");
  const [replacement, setReplacement] = useState("");

  return (
    <div className="search-replace">
      <input
        className="search-replace__input"
        placeholder="חפש"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch(query)}
      />
      <input
        className="search-replace__input"
        placeholder="החלף ב..."
        value={replacement}
        onChange={(e) => setReplacement(e.target.value)}
      />

      <button
        type="button"
        className="edit-tools__btn"
        onClick={() => onSearch(query)}
      >
        חפש
      </button>
      <button
        type="button"
        className="edit-tools__btn"
        disabled={!query}
        onClick={() => onReplace(query, replacement)}
      >
        החלף
      </button>

      <span className="search-replace__result">{getResultText(searchCount)}</span>
    </div>
  );
}

export default SearchReplace;