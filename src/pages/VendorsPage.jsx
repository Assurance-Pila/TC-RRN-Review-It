import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/vendors.css";

// Mock data — replace with real API
const ALL_VENDORS = [
  { id: 1, name: "StyleCraft NG",  instagram: "@stylecraftng",  tiktok: "@stylecraft_ng", category: "Fashion",    badge: "platform",  reviews: 128, scam: false },
  { id: 2, name: "Amaka Styles",   instagram: "@stylebyamaka",  tiktok: "@amakastyles",   category: "Fashion",    badge: "community", reviews: 64,  scam: false },
  { id: 3, name: "TB Footwear",    instagram: "@tbfootwear",    tiktok: "@tbfootwear_ng", category: "Footwear",   badge: null,        reviews: 31,  scam: false },
  { id: 4, name: "Chisom Cakes",   instagram: "@chisomcakes",   tiktok: "@chisomcakes",   category: "Food",       badge: "platform",  reviews: 97,  scam: false },
  { id: 5, name: "Lara Beads NG",  instagram: "@larabeads",     tiktok: "@larabeads_ng",  category: "Jewellery",  badge: null,        reviews: 12,  scam: true  },
  { id: 6, name: "QuickFits Hub",  instagram: "@quickfits_hub", tiktok: "@quickfitshub",  category: "Fashion",    badge: null,        reviews: 5,   scam: true  },
  { id: 7, name: "NaijaTech Shop", instagram: "@naijatech",     tiktok: "@naijatechshop", category: "Tech",       badge: "community", reviews: 44,  scam: false },
  { id: 8, name: "Mama Put Online",instagram: "@mamaputonline", tiktok: "@mamaputonline", category: "Food",       badge: "community", reviews: 78,  scam: false },
];

function RosetteBadge({ color = "green", size = 16 }) {
  const fill = color === "green" ? "#006D5B" : "#2563eb";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink:0 }}>
      <path d="M12 2C12 2 14.9 5.1 17.2 5.6C19.5 6.1 23 7.2 23 7.2C23 7.2 20.8 9.8 20.7 12.2C20.6 14.6 22 18 22 18C22 18 19 17.3 16.8 18.3C14.6 19.3 12 22 12 22C12 22 9.4 19.3 7.2 18.3C5 17.3 2 18 2 18C2 18 3.4 14.6 3.3 12.2C3.2 9.8 1 7.2 1 7.2C1 7.2 4.5 6.1 6.8 5.6C9.1 5.1 12 2 12 2Z" fill={fill} />
      <path d="M8.5 12L10.8 14.3L15.5 9.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CATEGORIES = ["All", ...Array.from(new Set(ALL_VENDORS.map(v => v.category)))];

export default function VendorsPage() {
  const navigate = useNavigate();
  const [query, setQuery]       = useState("");
  const [category, setCategory] = useState("All");

  const filtered = ALL_VENDORS.filter(v => {
    const q = query.toLowerCase();
    const matchSearch = !q || v.name.toLowerCase().includes(q) || v.instagram.toLowerCase().includes(q) || v.tiktok.toLowerCase().includes(q);
    const matchCat    = category === "All" || v.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="vendors-root">
      <Navbar />

      <div className="vendors-header">
        <div className="vendors-header-inner">
          <h1>Browse Vendors</h1>
          <p>Discover registered vendors. Sign in to see full profiles, reviews, and scam alerts.</p>
          <div className="vp-search">
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name, @instagram or @tiktok…" />
          </div>
          <div className="vp-cats">
            {CATEGORIES.map(c => (
              <button key={c} className={`cat-pill ${category === c ? "active" : ""}`} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="vendors-grid-wrapper">
        {filtered.length === 0
          ? <p className="no-results">No vendors found for "{query}".</p>
          : (
          <div className="vendors-grid">
            {filtered.map(v => (
              <div key={v.id} className={`vendor-card ${v.scam ? "vendor-card--scam" : ""}`}>
                <div className="vc-top">
                  <div className="vc-avatar">{v.name.slice(0,2).toUpperCase()}</div>
                  <div className="vc-meta">
                    <div className="vc-name">{v.name}</div>
                    <div className="vc-handle">{v.instagram}</div>
                  </div>
                  {v.badge === "platform"  && <span className="vc-badge green"><RosetteBadge color="green" size={13} /> Platform</span>}
                  {v.badge === "community" && <span className="vc-badge blue"><RosetteBadge color="blue"  size={13} /> Community</span>}
                  {v.scam                  && <span className="vc-badge red">Scam Alert</span>}
                </div>
                <div className="vc-info">
                  <span className="vc-cat">{v.category}</span>
                  <span className="vc-reviews">{v.reviews} reviews</span>
                </div>
                <button className="btn vc-btn" onClick={() => navigate("/login", { state: { prompt: "Sign in to view this vendor's full profile." } })}>
                  View Profile
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="vendors-cta">
          <p>Want to see reviews, ratings, and scam alerts?</p>
          <div className="vendors-cta-btns">
            <button className="btn" onClick={() => navigate("/SignUpPage")}>Create Free Account</button>
            <button className="btn btn--outline-dark" onClick={() => navigate("/login")}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
}