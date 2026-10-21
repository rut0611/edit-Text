import { useState } from "react";
import Icon from "../../common/Icon";
import "./LanguageSwitcher.css";
import { languageNames } from "../../../data/keyboardLayouts";

function LanguageSwitcher({ language, languages, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="language-switcher">
      <button
        type="button"
        className="language-switcher__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="החלפת שפה"
      >
        <Icon name="globe" size={20} />
      </button>

      {isOpen && (
        <div className="language-switcher__menu">
          {languages.map((lang) => (
            <button
              key={lang}
              type="button"
              className={`language-switcher__btn ${
                lang === language ? "language-switcher__btn--active" : ""
              }`}
              onClick={() => {
                onChange(lang);
                setIsOpen(false);
              }}
            >
              {languageNames[lang] ?? lang}
              {lang === language && <Icon name="check" size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;