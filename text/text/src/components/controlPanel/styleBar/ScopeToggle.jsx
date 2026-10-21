import "./ScopeToggle.css";

function ScopeToggle({ scope, onChange }) {
  return (
    <div className="scope-toggle">
      <button
        className={scope === "fromNowOn" ? "scope-toggle__btn--active" : ""}
        onClick={() => onChange("fromNowOn")}
      >
        מכאן והלאה
      </button>
      <button
        className={scope === "all" ? "scope-toggle__btn--active" : ""}
        onClick={() => onChange("all")}
      >
        על כל הטקסט
      </button>
    </div>
  );
}

export default ScopeToggle;