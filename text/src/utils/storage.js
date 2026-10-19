const FILE_PREFIX = "editor:";

function makeKey(userName, fileName) {
  return FILE_PREFIX + userName + ":" + fileName;
}

// שומרת קובץ. מחזירה true אם הצליח, false אם נכשל (למשל אין מקום)
export function saveFile(userName, fileName, chars) {
  try {
    localStorage.setItem(makeKey(userName, fileName), JSON.stringify(chars));
    return true;
  } catch (error) {
    return false;
  }
}

// קוראת קובץ. מחזירה את מערך התווים, או null אם אין קובץ / הוא פגום
export function loadFile(userName, fileName) {
  try {
    const text = localStorage.getItem(makeKey(userName, fileName));
    if (text === null) {
      return null;
    }
    return JSON.parse(text);
  } catch (error) {
    return null;
  }
}

// מחזירה את שמות הקבצים של המשתמש, ממוינים
export function listFiles(userName) {
  const prefix = FILE_PREFIX + userName + ":";
  const names = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith(prefix)) {
      names.push(key.slice(prefix.length));
    }
  }

  return names.sort();
}

// ---------- משתמשים (חלק ד) ----------
// זיהוי בצד לקוח בלבד, כנדרש בפרויקט. אין כאן אבטחה אמיתית.

const USERS_KEY = "editor-users";
const SESSION_KEY = "editor-currentUser";

function hashPassword(password) {
  let hash = 0;
  for (const ch of Array.from(password)) {
    hash = (hash * 31 + ch.codePointAt(0)) | 0;
  }
  return String(hash);
}

// אובייקט מהצורה { שם: סיסמה מטושטשת }
function readUsers() {
  try {
    const text = localStorage.getItem(USERS_KEY);
    return text === null ? {} : JSON.parse(text);
  } catch (error) {
    return {};
  }
}

export function userExists(userName) {
  return Object.prototype.hasOwnProperty.call(readUsers(), userName);
}

// מחזירה false אם השם תפוס או אם השמירה נכשלה
export function registerUser(userName, password) {
  if (userExists(userName)) {
    return false;
  }
  const users = readUsers();
  users[userName] = hashPassword(password);
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return true;
  } catch (error) {
    return false;
  }
}

export function checkUser(userName, password) {
  if (!userExists(userName)) {
    return false;
  }
  return readUsers()[userName] === hashPassword(password);
}

// המשתמש המחובר כרגע (כדי לא להתחבר מחדש בכל רענון)
export function getCurrentUser() {
  const name = localStorage.getItem(SESSION_KEY);
  if (name !== null && userExists(name)) {
    return name;
  }
  return null;
}

export function saveCurrentUser(userName) {
  try {
    localStorage.setItem(SESSION_KEY, userName);
  } catch (error) {
    // לא קריטי: יידרשו להתחבר שוב אחרי רענון
  }
}

export function clearCurrentUser() {
  localStorage.removeItem(SESSION_KEY);
}