// src/App.jsx
import { useState } from "react";
import LoginScreen from "./components/user/LoginScreen";
import EditorScreen from "./EditorScreen";
import {
  getCurrentUser,
  saveCurrentUser,
  clearCurrentUser,
} from "./utils/storage";

function App() {
  const [userName, setUserName] = useState(() => getCurrentUser());

  function handleLogin(name) {
    saveCurrentUser(name);
    setUserName(name);
  }

  function handleLogout() {
    clearCurrentUser();
    setUserName(null);
  }

  if (userName === null) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <EditorScreen key={userName} userName={userName} onLogout={handleLogout} />
  );
}

export default App;