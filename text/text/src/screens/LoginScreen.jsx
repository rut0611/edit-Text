import "./LoginScreen.css";

import { useState } from "react";
import { userExists, registerUser, checkUser } from "../utils/storage";

function LoginScreen({ onLogin }) {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const name = userName.trim();

    if (name === "" || password === "") {
      setError("יש למלא שם משתמש וסיסמה");
      return;
    }

    if (isNewUser) {
      if (userExists(name)) {
        setError("שם המשתמש כבר תפוס");
        return;
      }
      if (!registerUser(name, password)) {
        setError("היצירה נכשלה");
        return;
      }
      onLogin(name);
      return;
    }

    if (!userExists(name)) {
      setError("משתמש לא קיים. אפשר ליצור משתמש חדש");
      return;
    }
    if (!checkUser(name, password)) {
      setError("סיסמה שגויה");
      return;
    }
    onLogin(name);
  }

  function toggleMode() {
    setIsNewUser(!isNewUser);
    setError("");
  }

  return (
    <form className="login-screen" onSubmit={handleSubmit}>
      <h2>{isNewUser ? "יצירת משתמש חדש" : "כניסה"}</h2>

      <input
        placeholder="שם משתמש"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        placeholder="סיסמה"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">{isNewUser ? "צור משתמש" : "כניסה"}</button>
      <button type="button" onClick={toggleMode}>
        {isNewUser ? "יש לי כבר משתמש" : "משתמש חדש"}
      </button>

      {error !== "" && <p className="login-screen__error">{error}</p>}
    </form>
  );
}

export default LoginScreen;