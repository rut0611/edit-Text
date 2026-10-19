import "./Keyboard.css";
import Key from "./Key";
import LanguageSwitcher from "./LanguageSwitcher";
import { keyboardLayouts } from "../../../data/keyboardLayouts";

function Keyboard({ language, onKeyPress, onLanguageChange }) {
  const keys = keyboardLayouts[language];
  const languages = Object.keys(keyboardLayouts);

  return (
    <div className="keyboard">
      <LanguageSwitcher
        language={language}
        languages={languages}
        onChange={onLanguageChange}
      />

      {keys.map((char) => (
        <Key key={char} char={char} onPress={onKeyPress} />
      ))}

      <Key char=" " onPress={onKeyPress} />
    </div>
  );
}

export default Keyboard;