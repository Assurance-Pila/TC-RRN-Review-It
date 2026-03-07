/* src/components/layout/Sidebar.jsx */
import logo from "../../assets/logo.jpeg";
import { HomeIco, SearchIco, ReviewIco, AlertIco, ActIco, ProfileIco, WriteIco, LogoutIco } from "../icons.jsx";

const NAV = [
  { key: "Home",       label: "Home",        Icon: HomeIco },
  { key: "Search",     label: "Search",       Icon: SearchIco },
  { key: "MyReviews",  label: "My Reviews",   Icon: ReviewIco },
  { key: "ScamAlerts", label: "Scam Alerts",  Icon: AlertIco, alert: true },
  { key: "Activity",   label: "Activity",     Icon: ActIco },
  { key: "MyProfile",  label: "My Profile",   Icon: ProfileIco },
  { key: "PostReview", label: "Write Review", Icon: WriteIco, cta: true },
];

export default function Sidebar({ page, isOpen, scamCount, onNavigate, onLogout }) {
  return (
    <aside className={`ud-sidebar ${isOpen ? "open" : ""}`}>
      <div className="ud-sidebar-logo">
        <img src={logo} alt="Review It" className="ud-logo-img" />
        <span className="ud-brand-name">Review It</span>
      </div>
      <nav className="ud-nav">
        {NAV.map(({ key, label, Icon, cta, alert: isAlert }) => (
          <button key={key} className={`ud-nav-item ${page === key ? "active" : ""} ${cta ? "cta" : ""}`} onClick={() => onNavigate(key)}>
            <Icon />
            <span>{label}</span>
            {isAlert && scamCount > 0 && <span className="ud-nav-badge">{scamCount}</span>}
          </button>
        ))}
      </nav>
      <div className="ud-sidebar-foot">
        <button className="ud-nav-item ud-logout" onClick={onLogout}>
          <LogoutIco /><span>Logout</span>
        </button>
      </div>
    </aside>
  );
}