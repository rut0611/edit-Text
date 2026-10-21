
export function addChar(chars, newChar) {
  return [...chars, newChar];
}

export function deleteLastChar(chars) {
  return chars.slice(0, chars.length - 1);
}

export function deleteLastWord(chars) {
  let end = chars.length;

  while (end > 0 && chars[end - 1].letter === " ") {
    end = end - 1;
  }

  while (end > 0 && chars[end - 1].letter !== " ") {
    end = end - 1;
  }

  return chars.slice(0, end);
}

export function deleteAll() {
  return [];
}

export function charsToString(chars) {
  return chars.map((c) => c.letter).join("");
}

export function applyStyleToAll(chars, key, value) {
  return chars.map((c) => ({ ...c, [key]: value }));
}

// בודקת אם החל מהמיקום index מופיע הטקסט query.
// מחזירה כמה איברי chars הוא תופס, או 0 אם אין התאמה.
function matchLengthAt(chars, index, query) {
  let text = "";
  let i = index;

  while (i < chars.length && text.length < query.length) {
    text = text + chars[i].letter;
    i = i + 1;
  }

  if (text === query) {
    return i - index;
  }
  return 0;
}

export function countMatches(chars, query) {
  if (query === "") {
    return 0;
  }

  let count = 0;
  let i = 0;

  while (i < chars.length) {
    const length = matchLengthAt(chars, i, query);
    if (length > 0) {
      count = count + 1;
      i = i + length;
    } else {
      i = i + 1;
    }
  }

  return count;
}

export function replaceMatches(chars, query, replacement) {
  if (query === "") {
    return chars;
  }

  const result = [];
  let i = 0;

  while (i < chars.length) {
    const length = matchLengthAt(chars, i, query);

    if (length > 0) {
      const styleSource = chars[i];
      for (const letter of Array.from(replacement)) {
        result.push({ ...styleSource, letter: letter });
      }
      i = i + length;
    } else {
      result.push(chars[i]);
      i = i + 1;
    }
  }

  return result;
}