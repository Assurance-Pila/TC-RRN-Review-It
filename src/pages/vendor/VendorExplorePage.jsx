/* src/pages/vendor/VendorExplorePage.jsx
   Vendor's browse page — mirrors the user's Search/Home experience
   with search bar, category pills, and ranked vendor cards.
*/
import { useState } from "react";
import VendorCard from "../../components/cards/VendorCard.jsx";
import { Rosette } from "../../components/icons.jsx";

const CATS = [
  "All","Fashion","Food & Drinks","Tech & Gadgets","Footwear",
  "Jewellery & Accessories","Beauty & Skincare","Home & Decor",
];

function FeedSection({ title, badgeClass, vendors, onView }) {
  if (!vendors.length) return null;
  return (
    <div className="vd-section">
      <div className="vd-section-head">
        <h2>{title}</h2>
        <span className={`vd-badge ${badgeClass || ""}`}>{vendors.length} businesses</span>
      </div>
      <div className="vd-grid">
        {vendors.map((v, i) => <VendorCard key={i} vendor={v} onView={onView} />)}
      </div>
    </div>
  );
}

export default function VendorExplorePage({ vendors, searches }) {
  const [query,    setQuery]    = useState("");
  const [category, setCategory] = useState("All");

  const algoScore = (v) =>
    (v.platformVerified && v.communityVerified ? 6 : 0) +
    (v.platformVerified  ? 4 : 0) +
    (v.communityVerified ? 2 : 0) +
    ((v.rating  || 0) * 0.8) +
    ((v.reviews || 0) * 0.1) +
    (searches.some(s => (v.name || "").toLowerCase().includes(s.toLowerCase())) ? 1.5 : 0);

  const sort  = (arr) => [...arr].sort((a, b) => algoScore(b) - algoScore(a));
  const clean = vendors.filter(v => !v.scam);

  /* Filtered results when searching */
  const filtered = sort(vendors.filter(v => {
    const q = query.toLowerCase();
    return (
      !v.scam &&
      (!q ||
        (v.name          || "").toLowerCase().includes(q) ||
        (v.socialMediaUrl || "").toLowerCase().includes(q) ||
        (v.businessName  || "").toLowerCase().includes(q)
      ) &&
      (category === "All" || v.category === category)
    );
  }));

  /* Feed sections when not searching */
  const platformRecommended = sort(clean.filter(v =>  v.platformVerified &&  v.communityVerified));
  const highestRated        = sort(clean.filter(v => (v.rating || 0) >= 4));
  const platformVerified    = sort(clean.filter(v =>  v.platformVerified && !v.communityVerified));
  const communityVerified   = sort(clean.filter(v => !v.platformVerified &&  v.communityVerified));
  const unverified          = sort(clean.filter(v => !v.platformVerified && !v.communityVerified));

  const isSearching = query.trim() || category !== "All";

  return (
    <>
      {/* Search bar */}
      <div className="ve-search-wrap">
        <div className="ve-search-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by business name, @Instagram, @TikTok…"
          />
          {query && (
            <button className="ve-clear" onClick={() => setQuery("")} aria-label="Clear">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>
        <div className="ve-pills">
          {CATS.map(c => (
            <button
              key={c}
              className={`ve-pill ${category === c ? "active" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {isSearching ? (
        <div className="vd-section">
          <div className="vd-section-head">
            <h2>
              {query
                ? <>Results for <em style={{ fontStyle: "normal", color: "var(--teal)" }}>"{query}"</em></>
                : category}
            </h2>
            {filtered.length > 0 && <span className="vd-badge">{filtered.length} found</span>}
          </div>
          {filtered.length === 0 ? (
            <div className="vd-empty">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <p>No results</p>
              <span>Try a different name or category.</span>
            </div>
          ) : (
            <div className="vd-grid">
              {filtered.map((v, i) => <VendorCard key={i} vendor={v} onView={() => {}} />)}
            </div>
          )}
        </div>
      ) : (
        <>
          <FeedSection title="Platform Recommended"    badgeClass="feed-badge-gold"  vendors={platformRecommended} onView={() => {}} />
          <FeedSection title="Highest Rated"                                                                                        badgeClass="feed-badge-green" vendors={highestRated}        onView={() => {}} />
          <FeedSection title={<span style={{ display:"inline-flex", alignItems:"center", gap:5 }}><Rosette size={13} /> Platform Verified</span>}   badgeClass="feed-badge-teal"  vendors={platformVerified}    onView={() => {}} />
          <FeedSection title={<span style={{ display:"inline-flex", alignItems:"center", gap:5 }}><Rosette blue size={13} /> Community Verified</span>} badgeClass="feed-badge-blue"  vendors={communityVerified}   onView={() => {}} />
          <FeedSection title="Other Businesses"                                                                                                         vendors={unverified}          onView={() => {}} />
          {clean.length === 0 && (
            <div className="vd-empty">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              <p>No vendors yet</p>
              <span>The feed will populate as vendors join the platform.</span>
            </div>
          )}
        </>
      )}
    </>
  );
}