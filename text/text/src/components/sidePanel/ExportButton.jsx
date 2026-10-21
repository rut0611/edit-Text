import { exportTextFile } from "../../utils/exportUtils";
import Icon from "../common/Icon";

/*
  ExportButton - ייצוא הגליון כקובץ טקסט (txt) למחשב.
  לוחצים - נפתח חלון לבחירת שם ותיקייה.

  מקבל (props):   chars - מערך התווים של הגליון
                  fileName - שם הגליון (או null), מוצע כשם ברירת מחדל
*/

function ExportButton({ chars, fileName }) {
  async function handleClick() {
    try {
      await exportTextFile(chars, fileName);
    } catch (error) {
      window.alert("הייצוא נכשל");
    }
  }

  return (
    <button
      className="menu-item"
      onClick={handleClick}
      disabled={chars.length === 0}
      title={chars.length === 0 ? "אין טקסט לייצוא" : ""}
    >
      <Icon name="download" />
      <span>ייצוא לקובץ טקסט</span>
    </button>
  );
}

export default ExportButton;