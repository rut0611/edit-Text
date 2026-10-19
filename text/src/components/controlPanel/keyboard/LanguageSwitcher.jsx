import "./LanguageSwitcher.css";
import { languageNames } from "../../../data/keyboardLayouts";

function LanguageSwitcher({ language, languages, onChange }) {
  return (
    <div className="language-switcher">
      {languages.map((lang) => {
        let className = "language-switcher__btn";
        if (lang === language) {
          className = "language-switcher__btn language-switcher__btn--active";
        }

        return (
          <button key={lang} className={className} onClick={() => onChange(lang)}>
            {languageNames[lang]}
          </button>
        );
      })}
    </div>
  );
}

export default LanguageSwitcher;