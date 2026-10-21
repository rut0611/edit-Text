import { useEffect, useRef, memo } from "react";
import "./TextArea.css";
import Icon from "../common/Icon";

// אות אחת. memo: אות שלא השתנתה לא מצטיירת מחדש בכל הקלדה
const Char = memo(function Char({ letter, color, size, font }) {
  return (
    <span
      className="char"
      style={{ color: color, fontSize: size, fontFamily: font }}
    >
      {letter}
    </span>
  );
});

function TextArea({ chars, style }) {
  const areaRef = useRef(null);
  const caretRef = useRef(null);

  // גוללת את הגליון כך שסמן הכתיבה תמיד יישאר בטווח הראייה
  useEffect(() => {
    const area = areaRef.current;
    const caret = caretRef.current;
    if (!area || !caret) {
      return;
    }

    const margin = 16;
    const caretTop = caret.offsetTop;
    const caretBottom = caretTop + caret.offsetHeight;

    if (caretBottom + margin > area.scrollTop + area.clientHeight) {
      area.scrollTop = caretBottom + margin - area.clientHeight;
    } else if (caretTop - margin < area.scrollTop) {
      area.scrollTop = Math.max(0, caretTop - margin);
    }
  }, [chars]);

  return (
    <div className="text-area" ref={areaRef}>
      {chars.map((c, index) => (
        <Char
          key={index}
          letter={c.letter}
          color={c.color}
          size={c.size}
          font={c.font}
        />
      ))}

      {/* סמן הכתיבה: תמיד אחרי התו האחרון, בגודל ובצבע של הסגנון הנוכחי */}
      <span
        className="text-area__caret"
        ref={caretRef}
        style={{ fontSize: style.size, color: style.color }}
      />

      {chars.length === 0 && (
        <div className="text-area__placeholder">
          <Icon name="pencil" size={30} strokeWidth={1.3} draw />
          <span>אפשר להתחיל להקליד במקלדת</span>
        </div>
      )}
    </div>
  );
}

export default TextArea;