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
  if (!vendor) return (
    <div className="vd-empty"><p>No profile found</p><span>Complete your profile first.</span></div>
  );

  const isPlatform  = vendor?.platformVerified;
  const isCommunity = vendor?.communityVerified;
  const isFullyVerified = isPlatform && isCommunity;

  const reviewCount = reviews.length;
  const avgRating   = reviewCount ? reviews.reduce((s, r) => s + r.rating, 0) / reviewCount : 0;
  const communityTarget   = 10;
  const communityProgress = Math.min(reviewCount / communityTarget, 1);

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
        <BusinessCard vendor={vendor} />
      </div>

      {/* ── Divider ── */}
      <div className="vbv-divider">
        <span>Verification</span>
      </div>

      {/* ── Section 2: Verification ── */}
      <div className="vd-section">

        {isFullyVerified ? (
          /* Both badges earned */
          <div className="vd-verified-card">
            <div style={{ display: "flex", gap: 12 }}>
              <Rosette size={48} /><Rosette blue size={48} />
            </div>
            <div className="vd-verified-title">🎉 Congratulations!</div>
            <div className="vd-verified-sub">
              Your business holds both the <strong>Platform Verified</strong> and <strong>Community Verified</strong> badges — the highest trust tier on Review It. Buyers see you first.
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              <span className="vbadge teal" style={{ fontSize: 13, padding: "6px 14px" }}><Rosette size={13} /> Platform Verified</span>
              <span className="vbadge blue" style={{ fontSize: 13, padding: "6px 14px" }}><Rosette blue size={13} /> Community Verified</span>
            </div>
          </div>
        ) : isPlatform ? (
          /* Platform only — push toward community */
          <>
            <div className="vd-verified-card" style={{ borderColor: "var(--mint)" }}>
              <Rosette size={44} />
              <div className="vd-verified-title">Platform Verified ✓</div>
              <div className="vd-verified-sub">
                You have the teal platform badge. Now work toward your Community Verified badge by collecting buyer reviews.
              </div>
            </div>
            <CommunityProgress reviewCount={reviewCount} avgRating={avgRating} progress={communityProgress} target={communityTarget} />
          </>
        ) : (
          /* Neither — show full explainer */
          <>
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
                <CommunityProgress reviewCount={reviewCount} avgRating={avgRating} progress={communityProgress} target={communityTarget} />
              </div>
            </div>
          </>
        )}
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