import { charsToString } from "./textUtils";

// שם קובץ בטוח: בלי תווים שחלונות אוסרת, ועם ברירת מחדל אם אין שם
function makeSafeFileName(name) {
  const cleaned = (name || "").replace(/[\\/:*?"<>|]/g, "_").trim();
  if (cleaned === "") {
    return "text";
  }
  return cleaned;
}

// ה-\uFEFF גורם ל-Notepad להציג עברית נכון
function makeBlob(chars) {
  return new Blob(["\uFEFF" + charsToString(chars)], {
    type: "text/plain;charset=utf-8",
  });
}

// דפדפנים בלי חלון "שמירה בשם": שואלים שם ומורידים
function downloadWithPrompt(blob, suggestedName) {
  const answer = window.prompt("איך לקרוא לקובץ?", suggestedName);
  if (answer === null) {
    return false;
  }

  let fileName = makeSafeFileName(answer.replace(/\.txt$/i, "")) + ".txt";

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return true;
}

// מחזירה true אם נשמר, false אם המשתמש ביטל. זורקת שגיאה אם נכשל.
export async function exportTextFile(chars, name) {
  const suggestedName = makeSafeFileName(name) + ".txt";
  const blob = makeBlob(chars);

  // Chrome / Edge: חלון "שמירה בשם" של המערכת - שם ותיקייה
  if (window.showSaveFilePicker) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: suggestedName,
        types: [
          {
            description: "קובץ טקסט",
            accept: { "text/plain": [".txt"] },
          },
        ],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return true;
    } catch (error) {
      // המשתמש לחץ ביטול בחלון - זה לא שגיאה
      if (error.name === "AbortError") {
        return false;
      }
      throw error;
    }
  }

  // שאר הדפדפנים
  return downloadWithPrompt(blob, suggestedName);
}