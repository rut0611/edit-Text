import { useState } from "react";
import "./SearchReplace.css";

function SearchReplace({ searchCount, onSearch, onReplace }) {
  const [query, setQuery] = useState("");
  const [replacement, setReplacement] = useState("");

  function handleSearch() {
    onSearch(query);
  }

  function handleReplace() {
    if (query === "") {
      return;
    }
    onReplace(query, replacement);
  }

  let resultText = "";
  if (searchCount === 0) {
    resultText = "לא נמצא";
  } else if (searchCount !== null) {
    resultText = "נמצאו " + searchCount;
  }

  return (
    <div className="search-replace">
      <input
        className="search-replace__input"
        placeholder="חפש"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <input
        className="search-replace__input"
        placeholder="החלף ב..."
        value={replacement}
        onChange={(e) => setReplacement(e.target.value)}
      />
      <button onClick={handleSearch}>חפש</button>
      <button onClick={handleReplace}>החלף</button>
      <span className="search-replace__result">{resultText}</span>
    </div>
  );
}

export default SearchReplace;