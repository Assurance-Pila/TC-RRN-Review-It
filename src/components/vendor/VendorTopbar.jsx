/* src/components/vendor/VendorTopbar.jsx */
export default function VendorTopbar({ businessName, initials, onToggleSidebar }) {
  return (
    <div className="vd-topbar-area">
      <header className="vd-topbar">
        <button className="vd-hamburger" onClick={onToggleSidebar} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
        <span className="vd-topbar-title">
          Welcome, <strong>{(businessName || "Business").split(" ")[0]}</strong>
        </span>
        <div className="vd-topbar-right">
          <div className="vd-topbar-av">{initials}</div>
        </div>
      </header>
    </div>
  );
}