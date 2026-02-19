import "./Topbar.css";

const Topbar = ({ title, toggleSidebar }) => {
  return (
    <div className="topbar">
      <button className="menu-button" onClick={toggleSidebar}>
        ☰
      </button>

      <h1 className="topbar-title">{title}</h1>
    </div>
  );
};

export default Topbar;