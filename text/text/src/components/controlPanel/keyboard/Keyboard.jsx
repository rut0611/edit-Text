import "./Keyboard.css";
import Key from "./Key";
import LanguageSwitcher from "./LanguageSwitcher";
import { keyboardLayouts } from "../../../data/keyboardLayouts";


function Keyboard({ language, onKeyPress, onLanguageChange, onDelete }) {
  const rows = keyboardLayouts[language] ?? keyboardLayouts.he;
  const lastRowIndex = rows.length - 1;


  return (
    <div className="keyboard" dir="ltr">
      <div className={keyboard-keys keyboard-keys--${language}} dir="ltr">
        {rows.map((row, rowIndex) => (
          <div
            className={keyboard-row keyboard-row--${rowIndex + 1}}
            key={${language}-row-${rowIndex}}
            dir="ltr"
          >
            {row.map((char, index) => (
              <Key
                key={${language}-${rowIndex}-${index}-${char}}
                value={char}
                onPress={onKeyPress}
              />
            ))}


            {rowIndex === lastRowIndex && (
              <Key
                special
                className="keyboard-backspace-key"
                value="char"
                label="⌫"
                ariaLabel="מחק תו"
                onPress={onDelete}
              />
            )}
          </div>
        ))}
      </div>


      <div className="keyboard-bottom-row" dir="ltr">
        <LanguageSwitcher
          language={language}
          languages={Object.keys(keyboardLayouts)}
          onChange={onLanguageChange}
        />


        <Key
          special
          className="keyboard-number-key"
          value={language === "symbols" ? "en" : "symbols"}
          label={language === "symbols" ? "ABC" : "?123"}
          ariaLabel="החלף סוג מקלדת"
          onPress={onLanguageChange}
        />


        <Key special value="," ariaLabel="פסיק" onPress={onKeyPress} />
        <Key value=" " onPress={onKeyPress} />
        <Key special value="." ariaLabel="נקודה" onPress={onKeyPress} />


        <Key
          special
          className="keyboard-delete-key"
          value="word"
          label="⌫ מילה"
          ariaLabel="מחק מילה"
          onPress={onDelete}
        />
        <Key
          special
          className="keyboard-delete-key"
          value="all"
          label="⌫ הכול"
          ariaLabel="מחק הכול"
          onPress={onDelete}
        />


        <Key
          special
          className="keyboard-enter-key"
          value={"\n"}
          label="↵"
          ariaLabel="שורה חדשה"
          onPress={onKeyPress}
        />
      </div>
    </div>
  );
}


export default Keyboard;