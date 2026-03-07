/* src/pages/user/UserDashboard.jsx */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar        from "../../components/layout/Sidebar.jsx";
import Topbar         from "../../components/layout/Topbar.jsx";
import VendorProfile  from "../../components/cards/VendorProfile.jsx";
import ReviewForm     from "../../components/cards/ReviewForm.jsx";
import HomePage       from "../HomePage.jsx";
import SearchPage     from "../SearchPage.jsx";
import MyReviewsPage  from "../MyReviewsPage.jsx";
import ScamAlertsPage from "../ScamAlertsPage.jsx";
import ActivityPage   from "../ActivityPage.jsx";
import MyProfilePage  from "../MyProfilePage.jsx";

import "../../styles/userdash.css";

const CATS = ["All","Fashion","Food & Drinks","Tech & Gadgets","Footwear","Jewellery & Accessories","Beauty & Skincare","Home & Decor"];
const PAGE_TITLES = { Home:"Home", Search:"Search", MyReviews:"My Reviews", ScamAlerts:"Scam Alerts", Activity:"Activity", MyProfile:"My Profile", PostReview:"Write Review" };

export default function UserDashboard() {
  const navigate = useNavigate();

  const [sidebarOpen,   setSidebarOpen]   = useState(false);
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

  const logSearch = (q) => {
    const prev = JSON.parse(localStorage.getItem("userSearches") || "[]");
    localStorage.setItem("userSearches", JSON.stringify([q, ...prev.filter(s => s !== q)].slice(0, 20)));
    setSearches(p => [q, ...p.filter(s => s !== q)].slice(0, 20));
    const act = JSON.parse(localStorage.getItem("userActivity") || "[]");
    localStorage.setItem("userActivity", JSON.stringify([{ type:"search", text:`Searched for "${q}"`, time: new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}) }, ...act].slice(0, 50)));
  };
  const handleSearch = (val) => {
    setQuery(val);
    if (val.trim()) { setPage("Search"); logSearch(val.trim()); }
    else if (page === "Search") setPage("Home");
  };

  const algoScore = (v) =>
    (v.platformVerified && v.communityVerified ? 6 : 0) + (v.platformVerified ? 4 : 0) + (v.communityVerified ? 2 : 0) +
    ((v.rating||0)*0.8) + ((v.reviews||0)*0.1) +
    (searches.some(s => (v.name||"").toLowerCase().includes(s.toLowerCase())) ? 1.5 : 0);
  const sort = (arr) => [...arr].sort((a, b) => algoScore(b) - algoScore(a));

  const clean = vendors.filter(v => !v.scam);
  const feed  = {
    platformRecommended: sort(clean.filter(v => v.platformVerified && v.communityVerified)),
    highestRated:        sort(clean.filter(v => (v.rating||0) >= 4)),
    platformVerified:    sort(clean.filter(v => v.platformVerified && !v.communityVerified)),
    communityVerified:   sort(clean.filter(v => v.communityVerified && !v.platformVerified)),
    unverified:          sort(clean.filter(v => !v.platformVerified && !v.communityVerified)),
  };
  const filtered = sort(vendors.filter(v => {
    const q = query.toLowerCase();
    return !v.scam && (!q || (v.name||"").toLowerCase().includes(q) || (v.socialMediaUrl||"").toLowerCase().includes(q) || (v.businessName||"").toLowerCase().includes(q)) && (category==="All" || v.category===category);
  }));

  const handleViewVendor = (vendor) => {
    setViewVendor(vendor);
    const vArr = JSON.parse(localStorage.getItem("vendors")||"[]");
    const idx  = vArr.findIndex(v => v.id === vendor.id);
    if (idx > -1) { vArr[idx].profileViews = (vArr[idx].profileViews||0)+1; localStorage.setItem("vendors", JSON.stringify(vArr)); }
    const entry = { type:"profile", text:`Viewed profile of ${vendor.name}`, time: new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}) };
    const act = JSON.parse(localStorage.getItem("userActivity")||"[]");
    localStorage.setItem("userActivity", JSON.stringify([entry,...act].slice(0,50)));
    setActivity(prev => [entry,...prev].slice(0,50));
  };

  const handleNav    = (key) => { setPage(key); setSidebarOpen(false); if (key!=="Search") setQuery(""); };
  const handleLogout = ()    => { localStorage.removeItem("user"); navigate("/login"); };

  const pages = {
    Home:       <HomePage       {...feed} scamVendors={scamVendors} onViewVendor={handleViewVendor} />,
    Search:     <SearchPage     query={query} filtered={filtered} onViewVendor={handleViewVendor} />,
    MyReviews:  <MyReviewsPage  myReviews={myReviews} vendors={vendors} onViewVendor={handleViewVendor} onWriteReview={() => handleNav("PostReview")} />,
    ScamAlerts: <ScamAlertsPage scamVendors={scamVendors} onViewVendor={handleViewVendor} />,
    Activity:   <ActivityPage   activity={activity} />,
    PostReview: <ReviewForm     vendors={vendors} prefillVendor={reviewPrefill} onSave={reload} />,
    MyProfile:  <MyProfilePage  user={user} userName={userName} initials={initials} myReviews={myReviews} vendors={vendors} searches={searches} />,
  };

  return (
    <div className="ud-root">
      {sidebarOpen && <div className="ud-overlay" onClick={() => setSidebarOpen(false)} />}
      <Sidebar page={page} isOpen={sidebarOpen} scamCount={scamVendors.length} onNavigate={handleNav} onLogout={handleLogout} />
      <div className="ud-main">
        <Topbar
          title={PAGE_TITLES[page]||"Dashboard"} initials={initials} userName={userName} scamCount={scamVendors.length}
          query={query} category={category} cats={CATS}
          onToggleSidebar={() => setSidebarOpen(o => !o)} onScamClick={() => handleNav("ScamAlerts")}
          onSearchChange={handleSearch} onCategoryChange={setCategory}
        />
        <main className="ud-body">{pages[page]}</main>
      </div>
      {viewVendor && (
        <VendorProfile vendor={viewVendor} allReviews={reviews} onClose={() => { setViewVendor(null); reload(); }} onWriteReview={(v) => { setReviewPrefill(v); setPage("PostReview"); }} />
      )}
    </div>
  );
}