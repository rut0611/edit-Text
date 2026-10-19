import "./UserBar.css";

function UserBar({ userName, onLogout }) {
  return (
    <div className="user-bar">
      <h1 className="user-bar__title">העורך שלי</h1>
      <span className="user-bar__name">שלום, {userName}</span>
      <button onClick={onLogout}>התנתקות</button>
    </div>
  );
}

export default UserBar;