import "./EditorScreen.css";
import TextAreasBoard from "../components/board/TextAreasBoard";
import ControlPanel from "../components/controlPanel/ControlPanel";
import FileMenu from "../components/sidePanel/FileMenu";
import ExportButton from "../components/sidePanel/ExportButton";
import UserBar from "../components/sidePanel/UserBar";
import FileNameDialog from "../components/dialogs/FileNameDialog";
import useSheets from "../hooks/useSheets";
import useFiles from "../hooks/useFiles";
import useFileActions from "../hooks/useFileActions";
import useSheetRename from "../hooks/useSheetRename";
import { defaultStyle } from "../data/styleOptions";
import { getSheetName, isSheetDirty } from "../utils/sheetUtils";



function EditorScreen({ userName, onLogout }) {
  const sheetsApi = useSheets();
  const { sheets, focusedSheet, focusedId, scope } = sheetsApi;

  const files = useFiles(userName);

  const rename = useSheetRename({
    sheets: sheets,
    fileNames: files.fileNames,
    renameFile: files.rename,
    renameSheet: sheetsApi.renameSheet,
    typeLetter: sheetsApi.typeLetter,
    deleteText: sheetsApi.deleteText,
  });

  const fileActions = useFileActions({
    sheets: sheets,
    focusedSheet: focusedSheet,
    files: files,
    markSheetSaved: sheetsApi.markSheetSaved,
    openSheetFromFile: sheetsApi.openSheetFromFile,
    focusSheet: sheetsApi.focusSheet,
    closeSheet: sheetsApi.closeSheet,
  });

  const currentStyle = focusedSheet ? focusedSheet.style : defaultStyle;
  const currentFileName = focusedSheet ? getSheetName(focusedSheet) : null;
  const { closingSheet } = fileActions;

  function handleLogout() {
    const hasUnsaved = sheets.some(isSheetDirty);
    if (hasUnsaved) {
      const ok = window.confirm("יש שינויים שלא נשמרו. להתנתק בכל זאת?");
      if (!ok) {
        return;
      }
    }
    onLogout();
  }

  return (
    <div className="app" onMouseDown={rename.handleAppMouseDown}>
      <aside className="side-panel">
        <FileMenu
          fileNames={files.fileNames}
          currentFileName={currentFileName}
          onSave={fileActions.handleSave}
          onSaveAs={fileActions.handleSaveAs}
          onOpen={fileActions.handleOpen}
        >
          <ExportButton
            chars={focusedSheet ? focusedSheet.chars : []}
            fileName={currentFileName}
          />
        </FileMenu>

        <UserBar userName={userName} onLogout={handleLogout} />
      </aside>

      <TextAreasBoard
        sheets={sheets}
        focusedId={focusedId}
        renaming={rename.renaming}
        onFocus={sheetsApi.focusSheet}
        onClose={fileActions.handleClose}
        onNew={sheetsApi.addNewSheet}
        onRenameStart={rename.startRename}
        onRenameChange={rename.changeRenameValue}
        onRenameCommit={rename.commitRename}
        onRenameCancel={rename.cancelRename}
      />

      <div className="image-area">{/* תמונה - בהמשך */}</div>

      <ControlPanel
        style={currentStyle}
        scope={scope}
        canUndo={sheetsApi.canUndo}
        searchCount={sheetsApi.searchCount}
        onTypeLetter={rename.handleTypeLetter}
        onStyleChange={sheetsApi.changeStyle}
        onScopeChange={sheetsApi.setScope}
        onDelete={rename.handleDelete}
        onUndo={sheetsApi.undo}
        onSearch={sheetsApi.search}
        onReplace={sheetsApi.replace}
      />

      {closingSheet && (
        <FileNameDialog
          key={closingSheet.id}
          mode="close"
          initialName=""
          currentFileName={getSheetName(closingSheet)}
          fileNames={files.fileNames}
          onSubmit={fileActions.handleSaveAndClose}
          onDontSave={fileActions.handleCloseWithoutSaving}
          onCancel={fileActions.handleCancelClose}
        />
      )}
    </div>
  );
}

export default EditorScreen;
