import "./StyleBar.css";
import StylePicker from "./StylePicker";
import ScopeToggle from "./ScopeToggle";
import { colors, sizes, fonts } from "../../../data/styleOptions";

/*
  StyleBar - עוטף את בוחרי הסגנון: צבע, גודל, גופן, והיקף השינוי.

  מקבל (props):   style  - { color, size, font, scope }
  מדווח למעלה:    onStyleChange(key, value)

  מה צריך לעשות בקובץ הזה:
  1. [ ] לקבל את ה-props.
  2. [ ] להציג שלושה StylePicker: צבע, גודל, גופן.
         לכל אחד להעביר: label, options (מ-styleOptions.js), value, onChange.
  3. [ ] ב-onChange של כל אחד: לקרוא ל-onStyleChange עם המפתח המתאים ("color" / "size" / "font").
  4. [ ] להציג ScopeToggle ולהעביר לו style.scope ו-onChange.
*/

function StyleBar() {
  return (
    <div className="style-bar">
      <StylePicker />
      <ScopeToggle />
    </div>
  );
}

export default StyleBar;
