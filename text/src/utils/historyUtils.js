const MAX_HISTORY = 50;

export function pushSnapshot(history, snapshot) {
  const newHistory = [...history, snapshot];
  if (newHistory.length > MAX_HISTORY) {
    return newHistory.slice(newHistory.length - MAX_HISTORY);
  }

  return newHistory;
}

export function popSnapshot(history) {
  if (history.length === 0) {
    return { snapshot: null, history: history };
  }

  const lastSnapshot = history[history.length - 1];
  const shorterHistory = history.slice(0, history.length - 1);

  return { snapshot: lastSnapshot, history: shorterHistory };
}

export function canUndo(history) {
  return history.length > 0;
}