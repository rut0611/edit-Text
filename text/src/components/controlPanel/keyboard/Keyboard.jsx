import "./Keyboard.css";
import Key from "./Key";
import LanguageSwitcher from "./LanguageSwitcher";
import { keyboardLayouts } from "../../../data/keyboardLayouts";

/*
  Keyboard - מצייר את המקשים לפי השפה הנוכחית.

  מקבל (props):   language
  מדווח למעלה:    onKeyPress(letter), onLanguageChange(lang)

  מה צריך לעשות בקובץ הזה:
  1. [ ] לקבל את ה-props.
  2. [ ] לשלוף את המקשים של השפה: keyboardLayouts[language].
  3. [ ] לעבור על המקשים עם map ולצייר Key לכל אחד (עם key).
  4. [ ] להעביר לכל Key: char ו-onPress={onKeyPress}.
  5. [ ] להוסיף Key מיוחד לרווח.
  6. [ ] להציג LanguageSwitcher ולהעביר לו language ו-onChange.
  7. [ ] לא לכתוב כאן אף מקש בקוד - הכול מגיע מ-keyboardLayouts.js.
*/

function Keyboard() {
  return (
    <div className="keyboard">
      <LanguageSwitcher />
      <Key />
    </div>
  );
}

export default Keyboard;
