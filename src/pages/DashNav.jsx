/* src/pages/vendor/DashNav.jsx
   Shared top navbar for user, vendor, and admin dashboards.

   Props:
     role       — "user" | "vendor" | "admin"
     page       — current active page key
     userName   — display name string
     initials   — 2-letter avatar string
     scamCount  — (user/admin) integer for red alert dot
     onNavigate — (key: string) => void
     onLogout   — () => void
*/
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import { HomeIco, SearchIco, ReviewIco, AlertIco, ActIco, ProfileIco, WriteIco, LogoutIco } from "../components/icons.jsx";
import "../styles/dashnav.css";

/* ── Vendor nav icons ── */
const ExploreIco = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const BoostIco = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);
const DashIco = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
);

/* ── Nav definitions ── */
const USER_NAV = [
  { key: "Home",       label: "Home",           Icon: HomeIco },
  { key: "PostReview", label: "Write a Review", Icon: WriteIco, cta: true },
  { key: "MyReviews",  label: "My Reviews",     Icon: ReviewIco },
  { key: "ScamAlerts", label: "Scam Alerts",    Icon: AlertIco, alert: true },
  { key: "Activity",   label: "Activity",       Icon: ActIco },
];

const VENDOR_NAV = [
  { key: "Dashboard",       label: "Dashboard",       Icon: DashIco },
  { key: "Explore",         label: "Explore",          Icon: ExploreIco },
  { key: "MyProfile",       label: "My Profile",       Icon: ProfileIco },
  { key: "BoostVisibility", label: "Boost Visibility", Icon: BoostIco, cta: true },
];

const NAV_MAP = { user: USER_NAV, vendor: VENDOR_NAV };

export default function DashNav({ role, page, userName, initials, vendor, scamCount = 0, onNavigate, onLogout }) {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const NAV      = NAV_MAP[role] || USER_NAV;
  const isVendor = role === "vendor";

  const nav = (key) => { onNavigate(key); setMenuOpen(false); setProfileOpen(false); };
  const closeAll = () => { setMenuOpen(false); setProfileOpen(false); };

  /* Vendor welcome bar data */
  const businessName = vendor?.businessName || vendor?.name || userName;
  const avgRating    = (() => {
    const reviews = JSON.parse(localStorage.getItem("reviews") || "[]")
      .filter(r => String(r.vendorId) === String(vendor?.id));
    return reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : null;
  })();

  return (
    <>
      <header className="dn-root">
        <div className="dn-bar">

          {/* Logo */}
          <Link to="/" className="dn-logo" onClick={closeAll}>
            <img src={logo} alt="Review It" className="dn-logo-img" />
            <span className="dn-brand">Review It</span>
          </Link>

          {/* Desktop nav — spreads to fill remaining space */}
          <nav className="dn-nav" aria-label="Main navigation">
            {NAV.map(({ key, label, Icon, alert: isAlert, cta }) => (
              <button
                key={key}
                type="button"
                className={["dn-item", page === key ? "active" : "", cta ? "cta" : ""].filter(Boolean).join(" ")}
                onClick={() => nav(key)}
              >
                <Icon />
                <span>{label}</span>
                {isAlert && scamCount > 0 && <span className="dn-dot">{scamCount}</span>}
              </button>
            ))}
          </nav>

          {/* Right: avatar dropdown + hamburger */}
          <div className="dn-right">
            <div className="dn-avatar-wrap">
              <button
                type="button"
                className="dn-avatar"
                onClick={() => { setProfileOpen(o => !o); setMenuOpen(false); }}
                aria-label="Account menu"
                aria-expanded={profileOpen}
              >
                {initials}
              </button>

              {profileOpen && (
                <div className="dn-dropdown" role="menu">
                  {/* Name / role header */}
                  <div className="dn-dd-header">
                    <div className="dn-dd-name">{userName}</div>
                    <div className="dn-dd-role">{isVendor ? "Vendor Account" : "Buyer Account"}</div>
                  </div>
                  <div className="dn-dd-divider" />
                  <button type="button" className="dn-dd-item" role="menuitem" onClick={() => nav("MyProfile")}>
                    <ProfileIco /> My Profile
                  </button>
                  <div className="dn-dd-divider" />
                  <button type="button" className="dn-dd-item logout" role="menuitem" onClick={() => { closeAll(); onLogout(); }}>
                    <LogoutIco /> Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="dn-hamburger"
              onClick={() => { setMenuOpen(o => !o); setProfileOpen(false); }}
              aria-label="Toggle navigation menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <nav className="dn-drawer" aria-label="Mobile navigation">
            {NAV.map(({ key, label, Icon, alert: isAlert, cta }) => (
              <button
                key={key}
                type="button"
                className={["dn-drawer-item", page === key ? "active" : "", cta ? "cta" : ""].filter(Boolean).join(" ")}
                onClick={() => nav(key)}
              >
                <Icon /><span>{label}</span>
                {isAlert && scamCount > 0 && <span className="dn-dot">{scamCount}</span>}
              </button>
            ))}
            <div className="dn-drawer-divider" />
            <button type="button" className="dn-drawer-item logout" onClick={() => { closeAll(); onLogout(); }}>
              <LogoutIco /><span>Sign Out</span>
            </button>
          </nav>
        )}

        {(profileOpen || menuOpen) && <div className="dn-outside" onClick={closeAll} aria-hidden="true" />}
      </header>

      {/* Welcome bar — vendor only */}
      {isVendor && vendor && (
        <div className="dn-welcome-bar">
          <span className="dn-welcome-text">
            Welcome, <strong>{businessName}</strong> — let's see how your business is doing today
          </span>
          <div className="dn-welcome-meta">
            {vendor.platformVerified  && <span className="dn-welcome-badge teal">✓ Platform Verified</span>}
            {vendor.communityVerified && <span className="dn-welcome-badge blue">✓ Community Verified</span>}
            {avgRating && <span className="dn-welcome-rating">⭐ {avgRating}</span>}
          </div>
        </div>
      )}
    </>
  );
}