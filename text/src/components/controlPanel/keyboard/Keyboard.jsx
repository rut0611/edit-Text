import "./Keyboard.css";
import Key from "./Key";
import LanguageSwitcher from "./LanguageSwitcher";
import { keyboardLayouts } from "../../../data/keyboardLayouts";

function Keyboard({ language, onKeyPress, onLanguageChange, onDelete }) {
  const rows = keyboardLayouts[language] ?? keyboardLayouts.he;
  const lastRowIndex = rows.length - 1;

  return (
    <div className="keyboard" dir="ltr">
      <div className={`keyboard-keys keyboard-keys--${language}`} dir="ltr">
        {rows.map((row, rowIndex) => (
          <div
            className={`keyboard-row keyboard-row--${rowIndex + 1}`}
            key={`${language}-row-${rowIndex}`}
            dir="ltr"
          >
            {row.map((char, index) => (
              <Key
                key={`${language}-${rowIndex}-${index}-${char}`}
                char={char}
                onPress={onKeyPress}
              />
            ))}

            {/* מקש מחיקת תו בסוף השורה האחרונה, כמו במקלדת אמיתית */}
            {rowIndex === lastRowIndex && (
              <button
                type="button"
                className="keyboard-special-key keyboard-backspace-key"
                onClick={() => onDelete("char")}
                aria-label="מחק תו"
              >
                ⌫
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="keyboard-bottom-row" dir="ltr">
        {/* הגלובוס בשורה התחתונה, בצד שמאל */}
        <LanguageSwitcher
          language={language}
          languages={Object.keys(keyboardLayouts)}
          onChange={onLanguageChange}
        />

        <button
          type="button"
          className="keyboard-special-key keyboard-number-key"
          onClick={() =>
            onLanguageChange(language === "symbols" ? "en" : "symbols")
          }
        >
          {language === "symbols" ? "ABC" : "?123"}
        </button>

        <button
          type="button"
          className="keyboard-special-key"
          onClick={() => onKeyPress(",")}
          aria-label="פסיק"
        >
          ,
        </button>

        <Key char=" " onPress={onKeyPress} />

        <button
          type="button"
          className="keyboard-special-key"
          onClick={() => onKeyPress(".")}
          aria-label="נקודה"
        >
          .
        </button>

        <button
          type="button"
          className="keyboard-special-key keyboard-delete-key"
          onClick={() => onDelete("word")}
          aria-label="מחק מילה"
        >
          ⌫ מילה
        </button>

        <button
          type="button"
          className="keyboard-special-key keyboard-delete-key"
          onClick={() => onDelete("all")}
          aria-label="מחק הכול"
        >
          ⌫ הכול
        </button>

        <button
          type="button"
          className="keyboard-special-key keyboard-enter-key"
          onClick={() => onKeyPress("\n")}
          aria-label="שורה חדשה"
        >
          ↵
        </button>
      </div>
    </div>
  );
}

export default Keyboard;