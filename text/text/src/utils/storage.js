function readJson(key, defaultValue) {
  return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

// ---------- קבצים (אובייקט אחד לכל משתמש: { שם קובץ: תווים }) ----------

function filesKey(user) {
  return "editor-files:" + user;
}

function getFiles(user) {
  return readJson(filesKey(user), {});
}

export function saveFile(user, file, chars) {
  return writeJson(filesKey(user), { ...getFiles(user), [file]: chars });
}

export function loadFile(user, file) {
  return getFiles(user)[file] ?? null;
}

export function listFiles(user) {
  return Object.keys(getFiles(user)).sort();
}

// שינוי שם בכתיבה אחת, אז אין מצב שהקובץ נשמר פעמיים או נמחק
export function renameFile(user, oldName, newName) {
  const { [oldName]: chars, ...rest } = getFiles(user);
  if (!chars) {
    return false;
  }
  return writeJson(filesKey(user), { ...rest, [newName]: chars });
}

// ---------- משתמשים ----------

function getUsers() {
  return readJson("editor-users", {});
}

export function userExists(name) {
  return Object.hasOwn(getUsers(), name);
}

export function registerUser(name, password) {
  if (userExists(name)) {
    return false;
  }
  return writeJson("editor-users", { ...getUsers(), [name]: password });
}

export function checkUser(name, password) {
  return getUsers()[name] === password;
}

// ---------- המשתמש המחובר כרגע ----------

export function getCurrentUser() {
  const name = localStorage.getItem("editor-currentUser");
  return userExists(name) ? name : null;
}

export function saveCurrentUser(name) {
  localStorage.setItem("editor-currentUser", name);
}

export function clearCurrentUser() {
  localStorage.removeItem("editor-currentUser");
}