/* src/pages/HomePage.jsx */
import VendorCard from "../components/cards/VendorCard.jsx";
import { AlertIco, VendorIco, Rosette } from "../components/icons.jsx";

function FeedSection({ title, badge, badgeClass, desc, vendors, onViewVendor }) {
  if (vendors.length === 0) return null;
  return (
    <div className="ud-section">
      <div className="ud-section-head">
        <h2>{title}</h2>
        <span className={`ud-badge ${badgeClass || ""}`}>{vendors.length} businesses</span>
      </div>
      <p className="ud-feed-desc">{desc}</p>
      <div className="ud-grid">
        {vendors.map((v, i) => <VendorCard key={i} vendor={v} onView={onViewVendor} />)}
      </div>
    </div>
  );
}

export default function HomePage({ scamVendors, platformRecommended, highestRated, platformVerified, communityVerified, unverified, onViewVendor }) {
  const totalVendors = platformRecommended.length + highestRated.length + platformVerified.length + communityVerified.length + unverified.length;
  return (
    <>
      <FeedSection title="Recommended" badgeClass="feed-badge-gold" desc="Verified by the platform and the community — our highest trust tier." vendors={platformRecommended} onViewVendor={onViewVendor} />
      <FeedSection title="Highest Rated Businesses" badgeClass="feed-badge-green" desc="Businesses rated 4 stars and above by real buyers in the community." vendors={highestRated} onViewVendor={onViewVendor} />
      <FeedSection title="Platform Verified" badgeClass="feed-badge-teal" desc="Businesses vetted and approved by the Review It platform team." vendors={platformVerified} onViewVendor={onViewVendor} />
      <FeedSection title="Community Verified" badgeClass="feed-badge-blue" desc="Trusted by buyers through consistent positive community reviews." vendors={communityVerified} onViewVendor={onViewVendor} />
      <FeedSection title="Other Businesses" desc="New or unverified vendors. Always check reviews before buying." vendors={unverified} onViewVendor={onViewVendor} />

      {totalVendors === 0 && (
        <div className="ud-empty"><VendorIco /><p>No vendors yet</p><span>Check back as vendors join the platform.</span></div>
      )}
    </>
  );
}