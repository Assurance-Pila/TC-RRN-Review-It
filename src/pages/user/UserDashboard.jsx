/* src/pages/user/UserDashboard.jsx */
import { useState, useEffect } from "react";
import { useNavigate }         from "react-router-dom";

import DashNav        from "../DashNav.jsx";
import VendorProfile  from "../../components/cards/VendorProfile.jsx";
import ReviewForm     from "../../components/cards/ReviewForm.jsx";
import HomePage       from "../HomePage.jsx";
import SearchPage     from "../SearchPage.jsx";
import MyReviewsPage  from "../MyReviewsPage.jsx";
import ScamAlertsPage from "../ScamAlertsPage.jsx";
import ActivityPage   from "../ActivityPage.jsx";
import MyProfilePage  from "../MyProfilePage.jsx";

const CATS = [
  "All","Fashion","Food & Drinks","Tech & Gadgets","Footwear",
  "Jewellery & Accessories","Beauty & Skincare","Home & Decor",
];

export default function UserDashboard() {
  const navigate = useNavigate();

  /* Default page is "Search" — the vendor browsing experience,
     same as what the landing page points to */
  const [page,          setPage]          = useState("Home");
  const [query,         setQuery]         = useState("");
  const [category,      setCategory]      = useState("All");
  const [vendors,       setVendors]       = useState([]);
  const [reviews,       setReviews]       = useState([]);
  const [activity,      setActivity]      = useState([]);
  const [user,          setUser]          = useState(null);
  const [viewVendor,    setViewVendor]    = useState(null);
  const [reviewPrefill, setReviewPrefill] = useState(null);
  const [searches,      setSearches]      = useState([]);

  const reload = () => {
    setUser(    JSON.parse(localStorage.getItem("user")         || "null"));
    setVendors( JSON.parse(localStorage.getItem("vendors")      || "[]"));
    setReviews( JSON.parse(localStorage.getItem("reviews")      || "[]"));
    setActivity(JSON.parse(localStorage.getItem("userActivity") || "[]"));
    setSearches(JSON.parse(localStorage.getItem("userSearches") || "[]"));
  };
  useEffect(() => { reload(); }, []);

  const userName    = user?.fullName || user?.name || "User";
  const initials    = userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  const scamVendors = vendors.filter(v => v.scam);
  const myReviews   = reviews.filter(r => r.reviewerName === (user?.fullName || user?.name));

  /* ── Search helpers ── */
  const logSearch = (q) => {
    const prev  = JSON.parse(localStorage.getItem("userSearches") || "[]");
    const next  = [q, ...prev.filter(s => s !== q)].slice(0, 20);
    localStorage.setItem("userSearches", JSON.stringify(next));
    setSearches(next);
    const act   = JSON.parse(localStorage.getItem("userActivity") || "[]");
    const entry = { type: "search", text: `Searched for "${q}"`, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    localStorage.setItem("userActivity", JSON.stringify([entry, ...act].slice(0, 50)));
  };

  const handleSearch = (val) => {
    setQuery(val);
    /* Typing in the search bar always shows the Search page */
    setPage("Search");
    if (val.trim()) logSearch(val.trim());
  };

  /* ── Algo ranking ── */
  const algoScore = (v) =>
    (v.platformVerified && v.communityVerified ? 6 : 0) +
    (v.platformVerified  ? 4 : 0) +
    (v.communityVerified ? 2 : 0) +
    ((v.rating  || 0) * 0.8) +
    ((v.reviews || 0) * 0.1) +
    (searches.some(s => (v.name || "").toLowerCase().includes(s.toLowerCase())) ? 1.5 : 0);

  const sort  = (arr) => [...arr].sort((a, b) => algoScore(b) - algoScore(a));
  const clean = vendors.filter(v => !v.scam);

  const feed = {
    platformRecommended: sort(clean.filter(v =>  v.platformVerified &&  v.communityVerified)),
    highestRated:        sort(clean.filter(v => (v.rating || 0) >= 4)),
    platformVerified:    sort(clean.filter(v =>  v.platformVerified && !v.communityVerified)),
    communityVerified:   sort(clean.filter(v => !v.platformVerified &&  v.communityVerified)),
    unverified:          sort(clean.filter(v => !v.platformVerified && !v.communityVerified)),
  };

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

  /* ── Vendor profile view ── */
  const handleViewVendor = (vendor) => {
    setViewVendor(vendor);
    /* Increment profile views */
    const vArr = JSON.parse(localStorage.getItem("vendors") || "[]");
    const idx  = vArr.findIndex(v => v.id === vendor.id);
    if (idx > -1) {
      vArr[idx].profileViews = (vArr[idx].profileViews || 0) + 1;
      localStorage.setItem("vendors", JSON.stringify(vArr));
    }
    /* Log to activity */
    const entry = { type: "profile", text: `Viewed profile of ${vendor.name}`, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    const act   = JSON.parse(localStorage.getItem("userActivity") || "[]");
    localStorage.setItem("userActivity", JSON.stringify([entry, ...act].slice(0, 50)));
    setActivity(prev => [entry, ...prev].slice(0, 50));
  };

  /* ── Navigation ── */
  const handleNav = (key) => {
    setPage(key);
    /* Only clear query if leaving Search for a totally different page */
    if (key !== "Search") setQuery("");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  /* ── Page components ── */
  const pages = {
    Home:       <HomePage       {...feed} scamVendors={scamVendors} onViewVendor={handleViewVendor} />,
    Search:     <SearchPage     query={query} filtered={filtered} category={category} onViewVendor={handleViewVendor} />,
    MyReviews:  <MyReviewsPage  myReviews={myReviews} vendors={vendors} onViewVendor={handleViewVendor} onWriteReview={() => handleNav("PostReview")} />,
    ScamAlerts: <ScamAlertsPage scamVendors={scamVendors} onViewVendor={handleViewVendor} />,
    Activity:   <ActivityPage   activity={activity} />,
    PostReview: <ReviewForm     vendors={vendors} prefillVendor={reviewPrefill} onSave={reload} />,
    MyProfile:  <MyProfilePage  user={user} userName={userName} initials={initials} myReviews={myReviews} vendors={vendors} searches={searches} />,
  };

  /* Show search bar only on the Search page */
  const showSearch = page === "Search";

  return (
    <div className="ud-root">
      {/* ── Top navbar ── */}
      <DashNav
        role="user"
        page={page}
        userName={userName}
        initials={initials}
        scamCount={scamVendors.length}
        onNavigate={handleNav}
        onLogout={handleLogout}
      />

      <div className="ud-main">

        {/* Search bar + category pills — shown when on Search page */}
        {showSearch && (
          <div className="ud-search-sticky">
            <div className="ud-search-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                value={query}
                onChange={e => handleSearch(e.target.value)}
                placeholder="Search by business name, @Instagram, @TikTok…"
                autoFocus={page === "Search"}
              />
              {query && (
                <button className="ud-search-clear" onClick={() => setQuery("")} aria-label="Clear">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
            </div>
            <div className="ud-pills">
              {CATS.map(c => (
                <button
                  key={c}
                  className={`ud-pill ${category === c ? "active" : ""}`}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        <main className="ud-body">
          {pages[page] ?? pages["Home"]}
        </main>
      </div>

      {/* Vendor profile modal */}
      {viewVendor && (
        <VendorProfile
          vendor={viewVendor}
          allReviews={reviews}
          onClose={() => { setViewVendor(null); reload(); }}
          onWriteReview={(v) => { setReviewPrefill(v); handleNav("PostReview"); }}
        />
      )}
    </div>
  );
}