// כל האייקונים: קו אחד, אותו עובי, צבע שנלקח מהטקסט (currentColor)
const paths = {
  save: ["M5 4h11l3 3v13H5z", "M8 4v5h7V4", "M8 20v-6h8v6"],
  saveAs: ["M6 3h8l4 4v14H6z", "M14 3v4h4", "M12 12v6", "M9 15h6"],
  download: ["M12 4v11", "M7.5 11L12 15.5 16.5 11", "M5 19h14"],
  file: ["M6 3h8l4 4v14H6z", "M14 3v4h4"],
  logout: [
    "M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4",
    "M16 8l4 4-4 4",
    "M20 12H9",
  ],
  pencil: ["M4 20l1.2-4.2L16 5a2.1 2.1 0 0 1 3 3L8.2 18.8z", "M14 7l3 3"],
  close: ["M6 6l12 12", "M18 6L6 18"],
  check: ["M5 12.5l4.5 4.5L19 7.5"],
};

// draw = האייקון "מצויר" בקו כשהוא מופיע
function Icon({ name, size = 18, strokeWidth = 1.6, draw = false }) {
  return (
    <svg
      className={draw ? "icon icon--draw" : "icon"}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name].map((d) => (
        <path key={d} d={d} pathLength="1" />
      ))}
    </svg>
  );
}

export default Icon;