import { useState } from "react";
import { saveFile, loadFile, listFiles } from "../utils/storage";

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

  return { fileNames, save, open };
}

export default useFiles;