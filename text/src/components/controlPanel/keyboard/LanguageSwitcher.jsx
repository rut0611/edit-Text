
import { useState } from "react";
import "./LanguageSwitcher.css";
import { languageNames } from "../../../data/keyboardLayouts";

function LanguageSwitcher({ language, languages, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="language-switcher">
      <button
        type="button"
        className="language-switcher__toggle"
        onClick={() => setIsOpen((open) => !open)}
        aria-label="החלפת שפה"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        title="החלפת שפה"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9" />
          <path d="M12 3c-2.5 2.5-3.5 5.5-3.5 9s1 6.5 3.5 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="language-switcher__menu" role="menu">
          {languages.map((lang) => (
            <button
              key={lang}
              type="button"
              role="menuitemradio"
              aria-checked={lang === language}
              className={
                lang === language
                  ? "language-switcher__btn language-switcher__btn--active"
                  : "language-switcher__btn"
              }
              onClick={() => {
                onChange(lang);
                setIsOpen(false);
              }}
            >
              <span>{languageNames[lang] ?? lang}</span>
              {lang === language && <span aria-hidden="true">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
