import "./UserBar.css";
import Icon from "../common/Icon";

function UserBar({ userName, onLogout }) {
  // האות הראשונה של השם, בתוך העיגול
  const initial = Array.from(userName)[0];

  return (
    <div className="user-bar">
      <div className="user-bar__who">
        <span className="user-bar__avatar">{initial}</span>
        <span className="user-bar__name" title={userName}>
          {userName}
        </span>
      </div>

      <button className="menu-item" onClick={onLogout}>
        <Icon name="logout" />
        <span>התנתקות</span>
      </button>
    </div>
  );
}

export default UserBar;