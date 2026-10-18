import { useState } from "react";
import "./LoginScreen.css";

/*
  LoginScreen - מסך זיהוי משתמש בסיסי. (חלק ד)

  מקבל (props):   אין, או רשימת משתמשים קיימים
  מדווח למעלה:    onLogin(userName)

  מה צריך לעשות בקובץ הזה:
  1. [ ] להגדיר state מקומי: userName ו-password.
  2. [ ] שתי תיבות input מחוברות ל-state.
  3. [ ] כפתור "כניסה": בודק שהשדות לא ריקים וקורא ל-onLogin(userName).
  4. [ ] לבדוק מול storage.js אם המשתמש קיים והסיסמה נכונה (בצד לקוח בלבד, כנדרש בפרויקט).
  5. [ ] אם משתמש חדש - ליצור אותו דרך storage.js.
  6. [ ] להציג הודעת שגיאה כשהפרטים לא נכונים.
*/

function LoginScreen() {
  return (
    <div className="login-screen">
      <input />
      <input type="password" />
      <button>כניסה</button>
    </div>
  );
}

export default LoginScreen;
