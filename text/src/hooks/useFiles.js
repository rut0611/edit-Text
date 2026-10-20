import { useState } from "react";
import { saveFile, loadFile, listFiles, renameFile } from "../utils/storage";

function useFiles(userName) {
  const [fileNames, setFileNames] = useState(() => listFiles(userName));

  // שומרת ומרעננת את הרשימה. מחזירה true/false
  function save(fileName, chars) {
    const ok = saveFile(userName, fileName, chars);
    if (ok) {
      setFileNames(listFiles(userName));
    }
    return ok;
  }

  // מחזירה את מערך התווים של הקובץ, או null
  function open(fileName) {
    return loadFile(userName, fileName);
  }

  // משנה שם של קובץ שמור ומרעננת את הרשימה. מחזירה true/false
  function rename(oldName, newName) {
    const ok = renameFile(userName, oldName, newName);
    if (ok) {
      setFileNames(listFiles(userName));
    }
    return ok;
  }

  return { fileNames, save, open, rename };
}

export default useFiles;