import { useState } from "react";
import "./ControlPanel.css";
import Keyboard from "./keyboard/Keyboard";
import StyleBar from "./styleBar/StyleBar";
import EditTools from "./editTools/EditTools";

function ControlPanel({
  style,
  scope,
  canUndo,
  searchCount,
  onTypeLetter,
  onStyleChange,
  onScopeChange,
  onDelete,
  onUndo,
  onSearch,
  onReplace,
}) {
  const [language, setLanguage] = useState("he");

  return (
    <div className="control-panel">
      <Keyboard
        language={language}
        onKeyPress={onTypeLetter}
        onLanguageChange={setLanguage}
      />
      <StyleBar
        style={style}
        scope={scope}
        onStyleChange={onStyleChange}
        onScopeChange={onScopeChange}
      />
      <EditTools
        onDelete={onDelete}
        canUndo={canUndo}
        onUndo={onUndo}
        searchCount={searchCount}
        onSearch={onSearch}
        onReplace={onReplace}
      />
    </div>
  );
}

export default ControlPanel;
