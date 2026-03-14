/* src/components/cards/Vendor profile.jsx */
import { Rosette, Stars, AlertIco, CloseIco, PhoneIco, MailIco } from "../icons.jsx";

export default function VendorProfile({ vendor, allReviews, onClose, onWriteReview }) {
  const initials  = (vendor.name || "??").slice(0, 2).toUpperCase();
  // Try multiple ways to match reviews to vendor
  const vReviews  = allReviews.filter(r => 
    String(r.vendorId) === String(vendor.id) || 
    String(r.business_id) === String(vendor.id) ||
    String(r.businessId) === String(vendor.id)
  );
  const avgRating = vReviews.length ? vReviews.reduce((s, r) => s + r.rating, 0) / vReviews.length : (vendor.rating || 0);

  return (
    <div className="vp-backdrop" onClick={onClose}>
      <div className="vp-modal" onClick={e => e.stopPropagation()}>
        <button className="vp-close" onClick={onClose}><CloseIco /></button>

        <div className="vp-header">
          <div className="vp-av">{initials}</div>
          <div>
            <div className="vp-title">{vendor.name}</div>
            <div className="vp-meta">{vendor.category || "Vendor"}{vendor.socialMediaUrl ? ` · ${vendor.socialMediaUrl}` : ""}</div>
            {vendor.address && <div className="vp-location">{vendor.address}</div>}
          </div>
        </div>

        <div className="vp-badges">
          {vendor.platformVerified  && <span className="vbadge teal"><Rosette size={12} /> Platform Verified</span>}
          {vendor.communityVerified && <span className="vbadge blue"><Rosette blue size={12} /> Community Verified</span>}
          {vendor.scam              && <span className="vbadge" style={{ background: "#fee2e2", color: "#991b1b" }}>⚠ Flagged as Scam</span>}
          {!vendor.platformVerified && !vendor.communityVerified && !vendor.scam && <span className="vbadge muted">Unverified</span>}
        </div>

        {vendor.scam && (
          <div style={{ background: "#fff1f2", border: "1px solid #fecdd3", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#991b1b", marginBottom: 14, display: "flex", gap: 8, alignItems: "center" }}>
            <AlertIco /> This vendor has been flagged. Proceed with extreme caution.
          </div>
        )}

        <div className="vp-stats">
          <div className="vp-stat"><div className="vp-stat-val">{avgRating.toFixed(1)}</div><Stars rating={avgRating} size={11} /><div className="vp-stat-label">Avg Rating</div></div>
          <div className="vp-stat"><div className="vp-stat-val">{vReviews.length || vendor.reviews || 0}</div><div className="vp-stat-label">Reviews</div></div>
          <div className="vp-stat"><div className="vp-stat-val">{vendor.profileViews || 0}</div><div className="vp-stat-label">Profile Views</div></div>
        </div>

        {(vendor.phone || vendor.email) && (
          <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
            {vendor.phone && <div style={{ fontSize: 13, color: "var(--text)", display: "flex", gap: 8, alignItems: "center" }}><PhoneIco /> {vendor.phone}</div>}
            {vendor.email && <div style={{ fontSize: 13, color: "var(--text)", display: "flex", gap: 8, alignItems: "center" }}><MailIco /> {vendor.email}</div>}
          </div>
        )}

        <div className="vp-divider" />
        <div className="vp-reviews-title">Reviews ({vReviews.length})</div>
        {vReviews.length === 0
          ? <div style={{ fontSize: 13, color: "var(--muted)", padding: "8px 0 14px" }}>No reviews yet. Be the first.</div>
          : <div className="vp-reviews-list">
              {[...vReviews].reverse().map((r, i) => (
                <div key={i} className="rv-item">
                  <div className="rv-item-top"><span className="rv-author">{r.reviewerName || "Anonymous"}</span><span className="rv-date">{r.date || ""}</span></div>
                  <div className="rv-stars"><Stars rating={r.rating} size={12} /></div>
                  <div className="rv-text">{r.text}</div>
                </div>
              ))}
            </div>
        }
        {!vendor.scam && (
          <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
            <button className="vp-write-btn" onClick={() => { onWriteReview(vendor); onClose(); }}>Write a Review</button>
            <button 
              className="vp-scam-btn" 
              onClick={() => onFlagScam && onFlagScam(vendor)}
              style={{ 
                background: "#fee2e2", 
                color: "#991b1b", 
                border: "1px solid #fecdd3",
                padding: "11px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "background 0.15s"
              }}
            >
              ⚠ Flag as Scam
            </button>
          </div>
        )}
      </div>
    </div>
  );
}