/* src/pages/vendor/VendorDashboardPage.jsx
   Replaces VendorOverviewPage — keeps the Overview / Reviews inner tabs.
*/
import { useState } from "react";
import { Stars, Rosette } from "../../components/icons.jsx";

const ArrowIco  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const CardIco   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>;
const ShieldIco = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const ReviewIco = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5"/><path d="M17.5 3.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 8.5-8.5z"/></svg>;

export default function VendorDashboardPage({ vendor, reviews, onNavigate }) {
  const [tab, setTab] = useState("Overview");

  const avgRating  = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  const isVerified = vendor?.platformVerified || vendor?.communityVerified;

  return (
    <div className="vd-section">

      {/* Inner tab strip */}
      <div className="vo-tabs">
        {["Overview", "Reviews"].map(t => (
          <button
            key={t}
            type="button"
            className={`vo-tab ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t === "Reviews" && <ReviewIco />}
            {t}
            {t === "Reviews" && reviews.length > 0 && (
              <span className="vo-tab-count">{reviews.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* Overview tab */}
      {tab === "Overview" && (
        <>
          <div className="vd-stats-grid">
            <div className="vd-stat-card">
              <div className="vd-stat-card-val">{reviews.length}</div>
              <div className="vd-stat-card-label">Total Reviews</div>
            </div>
            <div className="vd-stat-card">
              <div className="vd-stat-card-val">{avgRating.toFixed(1)}</div>
              <Stars rating={avgRating} size={13} />
              <div className="vd-stat-card-label">Avg Rating</div>
            </div>
            <div className="vd-stat-card">
              <div className="vd-stat-card-val">{vendor?.profileViews || 0}</div>
              <div className="vd-stat-card-label">Profile Views</div>
            </div>
            <div className="vd-stat-card">
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", minHeight: 30, alignItems: "center" }}>
                {vendor?.platformVerified  && <span className="vbadge teal"><Rosette size={11} /> Platform</span>}
                {vendor?.communityVerified && <span className="vbadge blue"><Rosette blue size={11} /> Community</span>}
                {!isVerified && <span className="vbadge muted">Unverified</span>}
              </div>
              <div className="vd-stat-card-label">Verification</div>
            </div>
          </div>

          <div className="vd-section-head" style={{ marginTop: 8 }}><h2>Grow Your Business</h2></div>
          <div className="vd-cta-row">
            <div className="vd-cta-card" onClick={() => onNavigate("BoostVisibility")}>
              <div className="vd-cta-icon"><CardIco /></div>
              <div className="vd-cta-title">Boost Your Visibility</div>
              <div className="vd-cta-desc">Generate your branded business card and get verified to appear at the top of buyer searches.</div>
              <div className="vd-cta-link">Go to Boost Visibility <ArrowIco /></div>
            </div>
            <div className="vd-cta-card" onClick={() => onNavigate("BoostVisibility")}>
              <div className="vd-cta-icon" style={{ background: "#fef9ec" }}><ShieldIco /></div>
              <div className="vd-cta-title">Become Platform Verified</div>
              <div className="vd-cta-desc">Get the teal rosette badge and appear at the top of buyer searches. Verified businesses earn significantly more trust.</div>
              <div className="vd-cta-link" style={{ color: "#d97706" }}>Get Verified <ArrowIco /></div>
            </div>
          </div>
        </>
      )}

      {/* Reviews tab */}
      {tab === "Reviews" && (
        <div className="vd-rev-list" style={{ marginTop: 4 }}>
          {reviews.length === 0 ? (
            <div className="vd-empty">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5"/><path d="M17.5 3.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 8.5-8.5z"/></svg>
              <p>No reviews yet</p>
              <span>Share your profile to start receiving reviews from buyers.</span>
            </div>
          ) : (
            [...reviews].reverse().map((r, i) => (
              <div key={i} className="vd-rev-card">
                <div className="vd-rev-top">
                  <span className="vd-rev-author">{r.reviewerName || "Anonymous"}</span>
                  <span className="vd-rev-date">{r.date}</span>
                </div>
                <Stars rating={r.rating} size={13} />
                <div className="vd-rev-text">{r.text}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}