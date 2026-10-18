import { createRoot } from "react-dom/client";
import App from "./App";

/*
  מה צריך לעשות בקובץ הזה:
  1. [ ] להשאיר רק את השורה שמציירת את App לתוך האלמנט עם id="root".
  2. [ ] למחוק כל import של index.css או StrictMode אם לא צריך.
*/

createRoot(document.getElementById("root")).render(<App />);
