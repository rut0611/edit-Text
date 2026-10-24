export async function exportTextFile(chars, name) {
  const fileName = (name || "text") + ".txt";
  const blob = new Blob(["\uFEFF" + chars.map((c) => c.letter).join("")], {
    type: "text/plain;charset=utf-8",
  });

  if (window.showSaveFilePicker) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: fileName,
        types: [{ description: "קובץ טקסט", accept: { "text/plain": [".txt"] } }],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
    } catch (error) {
      if (error.name !== "AbortError") {
        throw error;
      }
    }
    return;
  }

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}