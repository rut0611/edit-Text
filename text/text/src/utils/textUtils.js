export function deleteLastWord(chars) {
  let end = chars.length;

  while (end > 0 && chars[end - 1].letter === " ") {
    end--;
  }
  while (end > 0 && chars[end - 1].letter !== " ") {
    end--;
  }

  return chars.slice(0, end);
}

function matchLength(chars, start, query) {
  let text = "";
  let end = start;

  while (end < chars.length && text.length < query.length) {
    text += chars[end].letter;
    end++;
  }

  return text === query ? end - start : 0;
}

function findMatches(chars, query) {
  const matches = [];

  for (let i = 0; query !== "" && i < chars.length; i++) {
    const length = matchLength(chars, i, query);
    if (length > 0) {
      matches.push({ start: i, length: length });
      i += length - 1;
    }
  }

  return matches;
}

export function countMatches(chars, query) {
  return findMatches(chars, query).length;
}

export function replaceMatches(chars, query, replacement) {
  const result = [];
  let pos = 0;

  for (const { start, length } of findMatches(chars, query)) {
    result.push(...chars.slice(pos, start));
    for (const letter of replacement) {
      result.push({ ...chars[start], letter: letter });
    }
    pos = start + length;
  }

  return [...result, ...chars.slice(pos)];
}