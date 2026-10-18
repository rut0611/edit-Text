import "./ScopeToggle.css";

/*
  ScopeToggle - בחירה אם שינוי הסגנון חל "מכאן והלאה" או "על כל הטקסט".

  מקבל (props):   scope  - "fromNowOn" או "all"
  מדווח למעלה:    onChange(newScope)

  מה צריך לעשות בקובץ הזה:
  1. [ ] לקבל את ה-props.
  2. [ ] להציג שני כפתורים (או radio): "מכאן והלאה" ו"על כל הטקסט".
  3. [ ] לסמן את הפעיל לפי scope.
  4. [ ] ב-onClick: לקרוא ל-onChange עם הערך המתאים.
*/

function ScopeToggle() {
  return (
    <div className="scope-toggle">
      <button>מכאן והלאה</button>
      <button>על כל הטקסט</button>
    </div>
  );
}

export default ScopeToggle;
