/* src/pages/vendor/VendorBoostVisibilityPage.jsx
   Merges Business Card + Verification into one scrolled page.
   Business Card section first, page divider, then Verification below.
*/
import { Rosette, Stars } from "../../components/icons.jsx";
import BusinessCard from "../../components/cards/BusinessCard.jsx";

const BENEFITS = [
  { title: "Appear at the top of search results", desc: "Verified businesses rank higher in the buyer feed algorithm, getting more visibility." },
  { title: "Earn buyer trust instantly",           desc: "The platform rosette badge signals credibility — buyers are far more likely to purchase from verified vendors." },
  { title: "Community Verified badge",             desc: "Collect 10+ reviews with an average of 4★ or higher and earn the blue community badge automatically." },
  { title: "Increased profile views",              desc: "Verified vendors see significantly more profile visits from buyers browsing the platform." },
];

const CheckIco  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const ShieldIco = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const CardIco   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>;

export default function VendorBoostVisibilityPage({ vendor, reviews, onNavigate }) {
  return (
    <>
      {/* ── Section 1: Business Card ── */}
      <div className="vd-section">
        <div className="vd-section-head">
          <h2>Business Card</h2>
        </div>
        <p style={{ fontSize: 13, color: "var(--muted)" }}>
          Generate your branded card and share it on WhatsApp, Instagram, or TikTok to attract more buyers and build trust.
        </p>
        <BusinessCard vendor={vendor || {}} />
      </div>

      {/* ── Divider ── */}
      <div className="vbv-divider">
        <span>Verification</span>
      </div>

      {/* ── Section 2: Verification ── */}
      <div className="vd-section">
        <div className="vd-section-head"><h2>Why get verified?</h2></div>
        <div className="vd-benefits-list">
          {BENEFITS.map((b, i) => (
            <div key={i} className="vd-benefit-row">
              <div className="vd-benefit-icon"><CheckIco /></div>
              <div className="vd-benefit-text"><strong>{b.title}</strong>{b.desc}</div>
            </div>
          ))}
        </div>

        <div className="vd-section-head" style={{ marginTop: 8 }}><h2>Choose your path</h2></div>
        <div className="vd-verif-options">
          <div className="vd-verif-option">
            <div className="vd-verif-option-icon" style={{ background: "#e6f5f0" }}><ShieldIco /></div>
            <div className="vd-verif-option-title">Get Platform Verified</div>
            <div className="vd-verif-option-desc">Submit your business for review by the Review It admin team. Once approved you receive the teal rosette badge.</div>
            <div style={{ background: "#f4f7f6", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 12px", fontSize: 12.5, color: "var(--muted)", lineHeight: 1.5 }}>
              ① Complete your profile<br />
              ② Your profile is submitted to admins<br />
              ③ Admin reviews and approves your business<br />
              ④ Teal badge appears on your profile
            </div>
            <button className="vd-verif-btn teal" onClick={() => onNavigate("MyProfile")}>
              Complete My Profile →
            </button>
          </div>

          <div className="vd-verif-option">
            <div className="vd-verif-option-icon" style={{ background: "#dbeafe" }}><CardIco /></div>
            <div className="vd-verif-option-title">Get Community Verified</div>
            <div className="vd-verif-option-desc">Share your business card above. Collect 10+ reviews with 4★ avg to earn the blue community badge automatically.</div>
            <CommunityProgress reviewCount={reviews?.length || 0} avgRating={0} progress={0} target={10} />
          </div>
        </div>
      </div>
    </>
  );
}

function CommunityProgress({ reviewCount, avgRating, progress, target }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ fontSize: 12.5, color: "var(--muted)" }}>
        Progress: <strong style={{ color: "var(--text)" }}>{reviewCount}</strong> / {target} reviews &nbsp;·&nbsp;
        <strong style={{ color: "var(--text)" }}>{avgRating.toFixed(1)}★</strong> avg (need 4.0★)
      </div>
      <div className="vd-progress-bar">
        <div className="vd-progress-fill" style={{ width: `${progress * 100}%` }} />
      </div>
      <Stars rating={avgRating} size={12} />
    </div>
  );
}