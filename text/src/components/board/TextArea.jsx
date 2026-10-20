import { useEffect, useRef } from "react";
import "./TextArea.css";
import Char from "./Char";

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
        <span className="text-area__placeholder">אין עדיין טקסט</span>
      )}
    </div>
  );
}

export default TextArea;