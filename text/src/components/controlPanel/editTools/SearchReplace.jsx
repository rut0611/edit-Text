import { useState } from "react";
import "./SearchReplace.css";

/*
  SearchReplace - חיפוש והחלפה של תו או מילה.

  מקבל (props):   searchResults (אופציונלי - כמה נמצאו)
  מדווח למעלה:    onSearch(query), onReplace(from, to)

  מה צריך לעשות בקובץ הזה:
  1. [ ] להגדיר state מקומי: query (מה לחפש) ו-replacement (במה להחליף).
  2. [ ] להציג שני input מחוברים ל-state (value + onChange).
  3. [ ] כפתור "חפש": קורא ל-onSearch(query).
  4. [ ] כפתור "החלף": קורא ל-onReplace(query, replacement).
  5. [ ] להציג את תוצאת החיפוש (למשל "נמצאו 3").
  6. [ ] ה-state כאן מקומי בכוונה: App לא צריך לדעת מה נכתב באמצע ההקלדה.
*/

function SearchReplace() {
  return (
    <div className="search-replace">
      <input />
      <input />
      <button>חפש</button>
      <button>החלף</button>
    </div>
  );
}

export default SearchReplace;
