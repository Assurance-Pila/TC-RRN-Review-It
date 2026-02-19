import "./Sidebar.css";

const Sidebar = ({ links, isOpen, closeSidebar }) => {
  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-logo">Review It</div>

        {links.map((link, index) => (
          <div key={index} className="sidebar-link">
            {link}
          </div>
        ))}
      </div>
    </>
  );
};

export default Sidebar;