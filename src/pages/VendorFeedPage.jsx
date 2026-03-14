/* src/components/vendor/pages/VendorFeedPage.jsx */
import VendorCard from "../components/cards/VendorCard.jsx";
import { Rosette, VendorIco } from "../components/icons.jsx";

function FeedSection({ title, badgeClass, desc, vendors, onView }) {
  if (!vendors.length) return null;
  return (
    <div className="vd-section">
      <div className="vd-section-head">
        <h2>{title}</h2>
        <span className={`vd-badge ${badgeClass || ""}`}>{vendors.length} businesses</span>
      </div>
      <p style={{ fontSize: 13, color: "var(--muted)" }}>{desc}</p>
      <div className="vd-grid">
        {vendors.map((v, i) => <VendorCard key={i} vendor={v} onView={onView} />)}
      </div>
    </div>
  );
}

export default function VendorFeedPage({ vendors, searches, onViewVendor }) {
  const algoScore = (v) =>
    (v.platformVerified && v.communityVerified ? 6 : 0) +
    (v.platformVerified  ? 4 : 0) +
    (v.communityVerified ? 2 : 0) +
    ((v.rating  || 0) * 0.8) +
    ((v.reviews || 0) * 0.1) +
    (searches.some(s => (v.name || "").toLowerCase().includes(s.toLowerCase())) ? 1.5 : 0);
  const sort  = (arr) => [...arr].sort((a, b) => algoScore(b) - algoScore(a));
  const clean = vendors.filter(v => !v.scam);

  const platformRecommended = sort(clean.filter(v => v.platformVerified && v.communityVerified));
  const highestRated        = sort(clean.filter(v => (v.rating || 0) >= 4));
  const platformVerified    = sort(clean.filter(v => v.platformVerified && !v.communityVerified));
  const communityVerified   = sort(clean.filter(v => v.communityVerified && !v.platformVerified));
  const unverified          = sort(clean.filter(v => !v.platformVerified && !v.communityVerified));
  const total = platformRecommended.length + highestRated.length + platformVerified.length + communityVerified.length + unverified.length;

  return (
    <>
      <div className="vd-section">
        <div className="vd-section-head">
          <h2>Vendor Feed</h2>
          <span className="vd-badge">{total} businesses</span>
        </div>
        <p style={{ fontSize: 13, color: "var(--muted)" }}>See how other businesses on the platform are performing. Use this to benchmark and improve.</p>
      </div>

      <FeedSection title=" Platform Recommended" desc="Verified by the platform and community — the highest trust tier." vendors={platformRecommended} onView={onViewVendor} />
      <FeedSection title="Highest Rated" badgeClass="feed-badge-green" desc="Businesses rated 4 stars and above by real buyers." vendors={highestRated} onView={onViewVendor} />
      <FeedSection title={<span style={{ display:"inline-flex", alignItems:"center", gap:5 }}><Rosette size={13} /> Platform Verified</span>} badgeClass="feed-badge-teal" desc="Vetted and approved by the Review It platform team." vendors={platformVerified} onView={onViewVendor} />
      <FeedSection title={<span style={{ display:"inline-flex", alignItems:"center", gap:5 }}><Rosette blue size={13} /> Community Verified</span>} badgeClass="feed-badge-blue" desc="Trusted by buyers through consistent positive reviews." vendors={communityVerified} onView={onViewVendor} />
      <FeedSection title="Other Businesses" desc="Unverified vendors — see where they stand." vendors={unverified} onView={onViewVendor} />

      {total === 0 && (
        <div className="vd-empty">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
          <p>No vendors yet</p>
          <span>The feed will populate as vendors join the platform.</span>
        </div>
      )}
    </>
  );
}