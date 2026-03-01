import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingButton from "../components/FloatingActionButton";
import "../styles/landing.css";

const SELLER_PERKS = [
  { icon: "P", color: "green", title: "Get a Public Profile",    desc: "List your name, category, phone, and social handles in one place." },
  { icon: "B", color: "blue",  title: "Earn Credibility Badges", desc: "Collect positive reviews to unlock Community Verified status." },
  { icon: "S", color: "teal",  title: "Stand Out From Scammers", desc: "A reviewed profile instantly separates you from fraudulent sellers." },
];
const BUYER_PERKS = [
  { icon: "S", color: "teal", title: "Search Any Vendor", desc: "Look up any seller by Instagram handle, TikTok username, or phone number." },
  { icon: "R", color: "gold", title: "Read Real Reviews", desc: "See honest ratings from buyers who've actually paid and received." },
  { icon: "!", color: "red",  title: "Check Scam Alerts", desc: "See if a vendor has been flagged by the community before you pay." },
];
const TRUST_SYSTEM = [
  { icon: "PV", color: "green", label: "Platform Verified",  steps: ["Vendor submits identity documents", "Our team reviews and confirms", "Green badge displayed on profile", "Badge removed if trust is broken"] },
  { icon: "CV", color: "blue",  label: "Community Verified", steps: ["Vendor registers on Review It", "Real buyers leave honest reviews", "15+ positive reviews unlocks badge", "Rating shown publicly on profile"] },
  { icon: "SA", color: "red",   label: "Scam Alerts",        steps: ["User reports suspicious vendor", "Alert is published immediately", "Community can confirm or dispute", "Moderators review and take action"] },
];
const REVIEWS = [
  { name: "Amaka O.",  handle: "@stylebyamaka", avatar: "AO", stars: 5, text: "Checked her reviews here first — delivery was perfect and exactly as shown!", badge: "community" },
  { name: "Tunde B.",  handle: "@tbfootwear",   avatar: "TB", stars: 4, text: "Quality was great. Honest reviews helped me set the right expectations.",    badge: null },
  { name: "Chisom E.", handle: "@chisomcakes",  avatar: "CE", stars: 5, text: "Platform Verified and it shows. Every custom cake has been flawless.",        badge: "platform" },
  { name: "Lara M.",   handle: "@larabeads",    avatar: "LM", stars: 1, text: "Paid and she went silent. Found her scam alert after — I've added my report.", isAlert: true },
];
const FAQS = [
  { q: "What do the verification badges mean?",        a: "Platform Verified means identity confirmed by our team. Community Verified means the vendor earned 15+ strong positive reviews from real buyers." },
  { q: "Can anyone report a vendor as a scammer?",     a: "Yes. Any registered user can submit a scam alert. Alerts are visible publicly and reviewed by our moderators." },
  { q: "How do I search for a vendor?",                a: "Sign in and use the search bar on your dashboard. Search by Instagram handle, TikTok username, phone number, or business name." },
  { q: "Does Review It verify vendors as businesses?", a: "No. We are community-driven. Platform Verified badges require vendors to voluntarily submit to our identity review process." },
  { q: "How do I register my business?",               a: "Click 'Get Started', create a vendor account, fill in your business name, category, phone, and at least one social media handle." },
  { q: "Is my personal information safe?",             a: "Yes. Only information you choose to make public is displayed. Your details are never shared with third parties." },
  { q: "What happens if a scam alert is false?",       a: "Vendors can flag an alert as disputed. Our moderation team reviews and can remove false alerts fairly." },
];

// Instagram-style rosette badge SVG
function RosetteBadge({ color = "green", size = 18 }) {
  const fill = color === "green" ? "#006D5B" : "#2563eb";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M12 2L14.4 7.2L20 7.2L15.6 10.8L17.6 16L12 12.8L6.4 16L8.4 10.8L4 7.2L9.6 7.2Z" fill={fill} />
      <path d="M12 2C12 2 14.9 5.1 17.2 5.6C19.5 6.1 23 7.2 23 7.2C23 7.2 20.8 9.8 20.7 12.2C20.6 14.6 22 18 22 18C22 18 19 17.3 16.8 18.3C14.6 19.3 12 22 12 22C12 22 9.4 19.3 7.2 18.3C5 17.3 2 18 2 18C2 18 3.4 14.6 3.3 12.2C3.2 9.8 1 7.2 1 7.2C1 7.2 4.5 6.1 6.8 5.6C9.1 5.1 12 2 12 2Z" fill={fill} />
      <path d="M8.5 12L10.8 14.3L15.5 9.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarRating({ count }) {
  return <div className="star-rating">{[1,2,3,4,5].map(s => <span key={s} className={s <= count ? "star filled" : "star"}>★</span>)}</div>;
}

function useCountUp(target, duration = 1800, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let t0 = null;
    const tick = ts => { if (!t0) t0 = ts; const p = Math.min((ts-t0)/duration,1); setVal(Math.floor((1-Math.pow(1-p,3))*target)); if (p<1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return val;
}

function Stat({ value, suffix, label, delay, active }) {
  const n = useCountUp(value, 1800, active);
  return <div className="stat" style={{ animationDelay:`${delay}ms` }}><h2>{n.toLocaleString()}{suffix}</h2><p>{label}</p></div>;
}

function PerkCards({ perks }) {
  return (
    <div className="perk-cards">
      {perks.map((p, i) => (
        <div key={i} className="perk-card">
          <div className={`perk-icon ${p.color}`}>{p.icon}</div>
          <h3>{p.title}</h3><p>{p.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState(null);
  const [statsOn, setStatsOn] = useState(false);
  const [query, setQuery]     = useState("");
  const statsRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsOn(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/login", { state: { prompt: "Sign in to search vendors", redirect: `/vendors?q=${encodeURIComponent(query)}` } });
  };

  return (
    <div className="landing-root">
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-noise" />
        <div className="hero-center">
          <h1>Trust Vendors Before You <span className="hero-accent">Pay.</span></h1>
          <p className="hero-sub">Community-powered trust &amp; scam awareness for WhatsApp commerce. Search any vendor by Instagram handle, TikTok username, or phone number.</p>
          <form className="hero-search" onSubmit={handleSearch}>
            <input className="hs-input" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search @instagram, @tiktok or phone…" />
            <button type="submit" className="btn">Search</button>
          </form>
          <div className="hero-pills">
            <span className="pill pill--green"><RosetteBadge color="green" size={13} /> Platform Verified</span>
            <span className="pill pill--blue"><RosetteBadge color="blue" size={13} /> Community Verified</span>
            <span className="pill pill--red">Scam Alerts</span>
          </div>
          <div className="hero-buttons">
            <button className="btn" onClick={() => navigate("/SignUpPage")}>Get Started</button>
            <button className="btn btn--outline" onClick={() => navigate("/vendors")}>Browse Vendors</button>
          </div>
        </div>
        <div className="hero-curve" />
      </section>

      {/* STATS */}
      <section className="stats" ref={statsRef}>
        <div className="stats-inner">
          <Stat value={1200} suffix="+" label="Vendors Listed"      delay={0}   active={statsOn} />
          <div className="stats-divider" />
          <Stat value={4500} suffix="+" label="Reviews Submitted"   delay={100} active={statsOn} />
          <div className="stats-divider" />
          <Stat value={300}  suffix="+" label="Verified Businesses" delay={200} active={statsOn} />
          <div className="stats-divider" />
          <Stat value={800}  suffix="+" label="Scam Alerts Filed"   delay={300} active={statsOn} />
        </div>
      </section>

      {/* FOR SELLERS */}
      <section id="sellers" className="audience-section">
        <div className="section-label">For Sellers</div>
        <h2>Build a Reputation That Works For You</h2>
        <p className="section-sub">Your WhatsApp hustle deserves a public face. Let satisfied customers speak for you.</p>
        <PerkCards perks={SELLER_PERKS} />
        <button className="btn" style={{ marginTop:32 }} onClick={() => navigate("/signup")}>Register Your Business</button>
      </section>

      {/* FOR BUYERS */}
      <section id="buyers" className="audience-section buyers-bg">
        <div className="section-label">For Buyers</div>
        <h2>Shop With Confidence, Every Time</h2>
        <p className="section-sub">Never get scammed again. Know who you're paying before you send a dime.</p>
        <PerkCards perks={BUYER_PERKS} />
        <button className="btn" style={{ marginTop:32 }} onClick={() => navigate("/login")}>Start Searching</button>
      </section>

      {/* TRUST SYSTEM */}
      <section id="trust" className="trust-section">
        <div className="section-label">Trust System</div>
        <h2>How We Build Accountability</h2>
        <p className="section-sub">Three pillars that keep the community honest and vendors accountable.</p>
        <div className="trust-grid">
          {TRUST_SYSTEM.map((t, i) => (
            <div key={i} className="trust-card">
              <div className="trust-header">
                {t.color !== "red"
                  ? <RosetteBadge color={t.color} size={28} />
                  : <span className="trust-icon-badge red">{t.icon}</span>}
                <h3>{t.label}</h3>
              </div>
              <ol className="trust-steps">
                {t.steps.map((s, j) => <li key={j}><span className="step-num">{j+1}</span><span>{s}</span></li>)}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="reviews-section">
        <div className="section-label">Community Voices</div>
        <h2>Real Buyers. Real Experiences.</h2>
        <p className="section-sub">No paid endorsements. Every review is from a genuine buyer.</p>
        <div className="reviews-grid">
          {REVIEWS.map((r, i) => (
            <div key={i} className={`review-card ${r.isAlert ? "review-card--alert" : ""}`}>
              <div className="rc-top">
                <div className={`rc-avatar ${r.isAlert ? "avatar-alert" : ""}`}>{r.avatar}</div>
                <div className="rc-meta"><div className="rc-name">{r.name}</div><div className="rc-handle">{r.handle}</div></div>
                {r.badge === "platform"  && <span className="rc-badge platform"><RosetteBadge color="green" size={12} /> Platform</span>}
                {r.badge === "community" && <span className="rc-badge community"><RosetteBadge color="blue" size={12} /> Community</span>}
                {r.isAlert               && <span className="rc-badge scam">Scam Alert</span>}
              </div>
              {!r.isAlert && <StarRating count={r.stars} />}
              <p className="rc-text">"{r.text}"</p>
            </div>
          ))}
        </div>
        <div className="reviews-cta">
          <p>Have experience with a vendor?</p>
          <button className="btn" onClick={() => navigate("/login", { state: { prompt: "Sign in to write a review" } })}>Write a Review</button>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="faq">
        <div className="section-label">Got Questions?</div>
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {FAQS.map((item, i) => (
            <div key={i} className={`faq-item ${openFAQ === i ? "faq-item--open" : ""}`}>
              <button className="faq-question" onClick={() => setOpenFAQ(openFAQ === i ? null : i)}>
                <span>{item.q}</span><span className="faq-icon">{openFAQ === i ? "−" : "+"}</span>
              </button>
              <div className="faq-answer-wrapper"><p className="faq-answer">{item.a}</p></div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <FloatingButton />
    </div>
  );
}