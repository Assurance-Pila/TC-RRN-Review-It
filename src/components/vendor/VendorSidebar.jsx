/* src/components/vendor/VendorSidebar.jsx */
import logo from "../../assets/logo.jpeg";
import { HomeIco, ReviewIco, ProfileIco, WriteIco, LogoutIco, Rosette } from "../icons.jsx";

const FeedIco    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><rect x="9" y="12" width="6" height="9"/></svg>;
const EditIco    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5"/><path d="M17.5 3.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 8.5-8.5z"/></svg>;
const CardIco    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>;
const VerifIco   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;

const NAV = [
  { key: "Overview",     label: "Overview",        Icon: HomeIco },
  { key: "Feed",         label: "Vendor Feed",     Icon: FeedIco },
  { key: "MyReviews",    label: "My Reviews",      Icon: ReviewIco },
  { key: "MyProfile",    label: "My Profile",      Icon: ProfileIco },
  { key: "EditProfile",  label: "Edit Profile",    Icon: EditIco },
  { key: "BusinessCard", label: "Business Card",   Icon: CardIco },
  { key: "Verification", label: "Verification",    Icon: VerifIco, cta: true },
];

export default function VendorSidebar({ page, isOpen, onNavigate, onLogout }) {
  return (
    <aside className={`vd-sidebar ${isOpen ? "open" : ""}`}>
      <div className="vd-sidebar-logo">
        <img src={logo} alt="Review It" className="vd-logo-img" />
        <span className="vd-brand-name">Review It</span>
      </div>
      <nav className="vd-nav">
        {NAV.map(({ key, label, Icon, cta }) => (
          <button
            key={key}
            className={`vd-nav-item ${page === key ? "active" : ""} ${cta ? "cta" : ""}`}
            onClick={() => onNavigate(key)}
          >
            <Icon />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="vd-sidebar-foot">
        <button className="vd-nav-item vd-logout" onClick={onLogout}>
          <LogoutIco /><span>Logout</span>
        </button>
      </div>
    </aside>
  );
}