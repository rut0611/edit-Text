# מבנה הפרויקט – למה כל דבר נמצא איפה שהוא

## עיקרון מנחה
כל תיקייה עונה על שאלה אחת:
- `data/` – **מה** הנתונים הקבועים (צבעים, מקלדות)
- `utils/` – **איך** מחשבים (פונקציות טהורות, בלי React)
- `hooks/` – **מי** מחזיק state ולוגיקה
- `components/` – **איך זה נראה**
- `screens/` – **מסך שלם** שמחבר הכול

## עץ הקבצים
```
src/
  main.jsx                 נקודת כניסה: מצייר את App
  App.jsx                  מחליט: מסך כניסה או מסך עריכה
  screens/
    LoginScreen            כניסה / הרשמה (חלק ד)
    EditorScreen           מסך העריכה – רק מחבר hooks לרכיבים
  hooks/
    useSheets              רשימת הגליונות, מיקוד, סגנון, חיפוש, undo
    useFiles               רשימת הקבצים של המשתמש ב-LocalStorage
    useFileActions         שמירה / שמירה בשם / פתיחה / סגירה (גליון + קובץ)
    useSheetRename         שינוי שם לשונית
  utils/
    textUtils              פעולות על מערך תווים (הוספה, מחיקה, חיפוש, החלפה)
    sheetUtils             יצירת גליון, "האם השתנה", מיקוד אחרי סגירה
    historyUtils           מחסנית undo
    storage                LocalStorage: קבצים ומשתמשים
    exportUtils            ייצוא ל-txt
  data/
    keyboardLayouts        אותיות המקלדות והשפות
    styleOptions           צבעים, גדלים, גופנים, ברירות מחדל
  components/
    board/                 הצגת הטקסט: TextAreasBoard (לשוניות) > TextArea > Char
    controlPanel/          מה שבתחתית המסך
      keyboard/            Keyboard > Key, LanguageSwitcher
      styleBar/            StyleBar > StylePicker, ScopeToggle
      editTools/           EditTools > SearchReplace (+ כפתור undo)
    sidePanel/             פאנל הצד: FileMenu, ExportButton, UserBar
    dialogs/               FileNameDialog (חלונית יחידה לשמירה/סגירה)
    common/                Icon – משמש כמה רכיבים
```

## זרימת מידע
`useSheets` / `useFiles` (state) → `EditorScreen` → props למטה לרכיבים.
כשלוחצים על משהו, הרכיב קורא ל-`onXxx` שקיבל, והאירוע עולה חזרה ל-hook.

## למה כמה בחירות
- **hooks ולא הכול ב-EditorScreen:** הקובץ היה 325 שורות ועכשיו 123. כל hook אחראי על תחום אחד.
- **utils נפרד מ-hooks:** פונקציות טהורות (קלט ← פלט) קל לבדוק ולהסביר בלי React.
- **FileMenu ב-sidePanel ולא ב-controlPanel:** הוא מוצג בצד ולא בתוך ControlPanel.
- **UndoButton אוחד לתוך EditTools:** היה רכיב של 10 שורות שמשמש מקום אחד.
- **ScopeToggle נשאר נפרד:** הוא בקרה עצמאית עם לוגיקת הצגה משלה.
- **FileNameDialog אחד לשלושה מצבים (save / saveAs / close):** הטפסים כמעט זהים, ולכן לא שכפלנו.
- **כל CSS צמוד לרכיב שלו:** מוחקים רכיב ← מוחקים את העיצוב שלו.
- **Icon משותף:** אייקונים באותו סגנון במקום אחד.

## מה השתנה לעומת הגרסה הקודמת
1. תוקן באג: `SaveOnCloseDialog` לא היה קיים; עכשיו `FileNameDialog` במצב `close`.
2. `EditorScreen` פוצל ל-`useFileActions` ול-`useSheetRename`.
3. `getSheetName(sheet)` מחליף את `fileName || draftName` שחזר בהרבה מקומות.
4. `draftName` הוגדר ב-`createSheet`.
5. `texts` שונה ל-`sheets` ב-`TextAreasBoard`.
6. הוסרו `Control.css` הריק והערת ה-TODO ב-`main.jsx`.
7. `App.css` הפך ל-`screens/EditorScreen.css` (התוכן זהה, כך שהעיצוב לא השתנה).

## דברים שהושארו במכוון
- `index.css` לא מיובא באף מקום (כמו במקור) – נשאר בקובץ כדי לא לאבד את הרקע.
- ל-`LanguageSwitcher` יש SVG משלו (במקום Icon), כדי לא לשנות את המראה.
