import "../../../style/ScopeToggle.css";

const scopes = [
  { value: "fromNowOn", label: "מכאן והלאה" },
  { value: "all", label: "על כל הטקסט" },
];

function ScopeToggle({ scope, onChange }) {
  return (
    <div className="scope-toggle">
      {scopes.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          className={scope === value ? "scope-toggle__btn--active" : ""}
          aria-pressed={scope === value}
          onClick={() => onChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default ScopeToggle;