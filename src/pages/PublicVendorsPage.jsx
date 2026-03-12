/* src/pages/PublicVendorsPage.jsx */
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Navbar        from "../components/Navbar";
import Footer        from "../components/Footer";
import VendorCard    from "../components/cards/VendorCard";
import VendorProfile from "../components/cards/VendorProfile";
import "../styles/PublicVendors.css";

const CATS = ["All","Fashion","Food & Drinks","Tech & Gadgets","Footwear","Jewellery & Accessories","Beauty & Skincare","Home & Decor"];

export default function PublicVendorsPage() {
  const navigate      = useNavigate();
  const [searchParams] = useSearchParams();

  const [vendors,    setVendors]    = useState([]);
  const [reviews,    setReviews]    = useState([]);
  const [query,      setQuery]      = useState(searchParams.get("q") || "");
  const [category,   setCategory]   = useState("All");
  const [viewVendor, setViewVendor] = useState(null);
  const [loginNudge, setLoginNudge] = useState(false);

  useEffect(() => {
    setVendors(JSON.parse(localStorage.getItem("vendors") || "[]"));
    setReviews(JSON.parse(localStorage.getItem("reviews") || "[]"));
  }, []);

  /* Same algorithm as user dashboard */
  const score = (v) =>
    (v.platformVerified && v.communityVerified ? 6 : 0) +
    (v.platformVerified  ? 4 : 0) +
    (v.communityVerified ? 2 : 0) +
    ((v.rating  || 0) * 0.8) +
    ((v.reviews || 0) * 0.1);

  const filtered = [...vendors]
    .filter(v => {
      const q = query.toLowerCase();
      return (
        !v.scam &&
        (!q ||
          (v.name || "").toLowerCase().includes(q) ||
          (v.businessName || "").toLowerCase().includes(q) ||
          (v.socialMediaUrl || "").toLowerCase().includes(q)
        ) &&
        (category === "All" || v.category === category)
      );
    })
    .sort((a, b) => score(b) - score(a));

  const scamMatches = vendors.filter(v => {
    if (!v.scam) return false;
    const q = query.toLowerCase();
    return q && (
      (v.name || "").toLowerCase().includes(q) ||
      (v.socialMediaUrl || "").toLowerCase().includes(q)
    );
  });

  /* Called from VendorProfile when unauthenticated user tries to write a review */
  const handleWriteReview = () => {
    setViewVendor(null);
    setLoginNudge(true);
  };

  return (
    <div className="pv-root">
      <Navbar />

      {/* Search hero band */}
      <div className="pv-hero">
        <h1>Find a Vendor</h1>
        <p>Browse by business name, Instagram handle, or TikTok username. No account needed.</p>
        <div className="pv-search-row">
          <div className="pv-search-box">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search @instagram, business name…"
              autoFocus
            />
            {query && (
              <button className="pv-clear" onClick={() => setQuery("")} aria-label="Clear search">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className="pv-pills">
          {CATS.map(c => (
            <button
              key={c}
              className={`pv-pill ${category === c ? "active" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="pv-body">

        {/* Login nudge — shown only after someone tries to write a review */}
        {loginNudge && (
          <div className="pv-nudge">
            <span>You need an account to write reviews and help the community.</span>
            <div className="pv-nudge-btns">
              <Link to="/signup" className="pv-nudge-btn primary">Create Account</Link>
              <Link to="/login"  className="pv-nudge-btn outline">Sign In</Link>
              <button className="pv-nudge-close" onClick={() => setLoginNudge(false)} aria-label="Dismiss">✕</button>
            </div>
          </div>
        )}

        {/* Scam warning when search matches a flagged vendor */}
        {scamMatches.length > 0 && (
          <div className="pv-scam-warning">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span>
              <strong>{scamMatches.length} scam alert{scamMatches.length > 1 ? "s" : ""}</strong> found matching your search:
              {scamMatches.map(v => (
                <span key={v.id} className="pv-scam-name"> "{v.name}"</span>
              ))} — do not pay.
            </span>
          </div>
        )}

        {/* Result count */}
        <div className="pv-results-head">
          <span className="pv-results-count">
            {filtered.length === 0
              ? "No vendors found"
              : `${filtered.length} vendor${filtered.length !== 1 ? "s" : ""}`}
            {query && <span className="pv-results-query"> for "{query}"</span>}
          </span>
        </div>

        {/* Vendor grid */}
        {filtered.length === 0 ? (
          <div className="pv-empty">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <p>No vendors found</p>
            <span>Try a different name, handle, or category.</span>
          </div>
        ) : (
          <div className="pv-grid">
            {filtered.map((v, i) => (
              <VendorCard key={v.id || i} vendor={v} onView={setViewVendor} />
            ))}
          </div>
        )}

        {/* Vendor CTA */}
        <div className="pv-cta-banner">
          <div>
            <strong>Are you a vendor?</strong>
            <span> Get listed, earn reviews, and build trust with buyers.</span>
          </div>
          <Link to="/vendor-signup" className="pv-cta-btn">Register Your Business →</Link>
        </div>
      </div>

      {/* Vendor profile modal — fully public.
          onWriteReview fires the login nudge if user has no session. */}
      {viewVendor && (
        <VendorProfile
          vendor={viewVendor}
          allReviews={reviews}
          onClose={() => setViewVendor(null)}
          onWriteReview={handleWriteReview}
        />
      )}

      <Footer />
    </div>
  );
}