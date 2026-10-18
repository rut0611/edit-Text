import "./LanguageSwitcher.css";

/*
  LanguageSwitcher - כפתורי בחירת שפה (עברית / אנגלית / אימוג'ים / ספרות).

  מקבל (props):   language  - השפה הפעילה, languages - רשימת השפות האפשריות
  מדווח למעלה:    onChange(lang)

  מה צריך לעשות בקובץ הזה:
  1. [ ] לקבל את ה-props.
  2. [ ] לעבור על languages עם map ולצייר button לכל שפה.
  3. [ ] לסמן את השפה הפעילה ב-className (למשל "language-switcher__btn--active").
  4. [ ] ב-onClick: לקרוא ל-onChange עם השפה.
  5. [ ] שמות השפות יגיעו מ-keyboardLayouts.js (Object.keys).
*/

function LanguageSwitcher() {
  return (
    <div className="language-switcher">
      <button>עברית</button>
    </div>
  );
}

export default LanguageSwitcher;
