import { useState } from "react";
import "../../style/ControlPanel.css";
import Keyboard from "./keyboard/Keyboard";
import StyleBar from "./styleBar/StyleBar";
import EditTools from "./editTools/EditTools";

function ControlPanel({
  children,
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
        onDelete={onDelete}
      />
      <div className="tools-area">
        {children}
        <StyleBar
          style={style}
          scope={scope}
          onStyleChange={onStyleChange}
          onScopeChange={onScopeChange}
        />
        <EditTools
          canUndo={canUndo}
          onUndo={onUndo}
          searchCount={searchCount}
          onSearch={onSearch}
          onReplace={onReplace}
        />
      </div>
    </div>
  );
}

export default ControlPanel;