/* src/pages/LandingPage.jsx */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar         from "../components/Navbar";
import Footer         from "../components/Footer";
import "../styles/landing.css";

const SELLER_PERKS = [
  { icon: "P", color: "green", title: "Get a Public Profile",    desc: "List your name, category, phone, and social handles in one place." },
  { icon: "B", color: "blue",  title: "Earn Credibility Badges", desc: "Collect positive reviews to unlock Community Verified status." },
  { icon: "S", color: "teal",  title: "Stand Out From Scammers", desc: "A reviewed profile instantly separates you from fraudulent sellers." },
];

const BUYER_PERKS = [
  { icon: "S", color: "teal", title: "Search Any Vendor",  desc: "Look up any seller by Instagram handle, TikTok username, or phone number." },
  { icon: "R", color: "gold", title: "Read Real Reviews",  desc: "See honest ratings from buyers who've actually paid and received." },
  { icon: "!", color: "red",  title: "Check Scam Alerts",  desc: "See if a vendor has been flagged by the community before you pay." },
];

const TRUST_SYSTEM = [
  {
    icon: "PV", color: "green", label: "Platform Verified",
    steps: ["Vendor submits identity documents", "Our team reviews and confirms", "Green badge displayed on profile", "Badge removed if trust is broken"],
  },
  {
    icon: "CV", color: "blue", label: "Community Verified",
    steps: ["Vendor registers on Review It", "Real buyers leave honest reviews", "10+ positive reviews unlocks badge", "Rating shown publicly on profile"],
  },
  {
    icon: "SA", color: "red", label: "Scam Alerts",
    steps: ["User reports suspicious vendor", "Alert is published immediately", "Community can confirm or dispute", "Moderators review and take action"],
  },
];

const TESTIMONIALS = [
  {
    quote: "I almost sent money to someone with zero reviews. Checked here first, found two scam reports. Saved me 20,000 francs.",
    name: "Mireille T.", detail: "Buyer, Douala", initials: "MT",
  },
  {
    quote: "My sales went up after I got verified. Customers message saying they checked my profile before ordering. It actually works.",
    name: "Emmanuel N.", detail: "Fashion vendor, Yaounde", initials: "EN",
  },
  {
    quote: "Someone flagged a vendor I was about to pay. Community saved me. I reported two more since — feels good giving back.",
    name: "Fatima B.", detail: "Buyer, Garoua", initials: "FB",
  },
  {
    quote: "Before Review It I had no way to prove I wasn't a scammer to new customers. Now my badge does that for me.",
    name: "Sandrine K.", detail: "Skincare vendor, Bafoussam", initials: "SK",
  },
  {
    quote: "Three of my friends got scammed buying online. I don't take chances anymore. I check every vendor here first.",
    name: "Blaise M.", detail: "Buyer, Kumba", initials: "BM",
  },
];

const FAQS = [
  { q: "What do the verification badges mean?",        a: "Platform Verified means identity confirmed by our team. Community Verified means the vendor earned 10+ strong positive reviews from real buyers." },
  { q: "Can anyone report a vendor as a scammer?",     a: "Yes. Any registered user can submit a scam alert. Alerts are visible publicly and reviewed by our moderators." },
  { q: "How do I search for a vendor?",                a: "Use the search bar at the top of the page or go to Browse Vendors. No account needed to search. You only need an account to write a review." },
  { q: "Does Review It verify vendors as businesses?", a: "No. We are community-driven. Platform Verified badges require vendors to voluntarily submit to our identity review process." },
  { q: "How do I register my business?",               a: "Click 'Create a Vendor Account', fill in your business name, category, phone, and at least one social media handle." },
  { q: "Is my personal information safe?",             a: "Yes. Only information you choose to make public is displayed. Your details are never shared with third parties." },
  { q: "What happens if a scam alert is false?",       a: "Vendors can flag an alert as disputed. Our moderation team reviews and can remove false alerts fairly." },
];

function RosetteBadge({ color = "green", size = 18 }) {
  const fill = color === "green" ? "#006D5B" : "#2563eb";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M12 2C12 2 14.9 5.1 17.2 5.6C19.5 6.1 23 7.2 23 7.2C23 7.2 20.8 9.8 20.7 12.2C20.6 14.6 22 18 22 18C22 18 19 17.3 16.8 18.3C14.6 19.3 12 22 12 22C12 22 9.4 19.3 7.2 18.3C5 17.3 2 18 2 18C2 18 3.4 14.6 3.3 12.2C3.2 9.8 1 7.2 1 7.2C1 7.2 4.5 6.1 6.8 5.6C9.1 5.1 12 2 12 2Z" fill={fill} />
      <path d="M8.5 12L10.8 14.3L15.5 9.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PerkCards({ perks }) {
  return (
    <div className="perk-cards">
      {perks.map((p, i) => (
        <div key={i} className="perk-card">
          <div className={`perk-icon ${p.color}`}>{p.icon}</div>
          <h3>{p.title}</h3>
          <p>{p.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default function LandingPage() {
  const navigate  = useNavigate();
  const [openFAQ, setOpenFAQ] = useState(null);
  const [query,   setQuery]   = useState("");

  /* Hero search goes directly to /vendors — no login required */
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/vendors?q=${encodeURIComponent(query.trim())}`);
    else navigate("/vendors");
  };

  return (
    <div className="landing-root">
      <Navbar />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-noise" />
        <div className="hero-center">
          <h1>Trust Vendors Before You <span className="hero-accent">Pay.</span></h1>
          <p className="hero-sub">
            Community-powered trust &amp; scam awareness for WhatsApp commerce.
            Search any vendor by Instagram handle, TikTok username, or phone number.
          </p>
          <form className="hero-search" onSubmit={handleSearch}>
            <input
              className="hs-input"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search @instagram, @tiktok or phone…"
            />
            <button type="submit" className="btn">Search</button>
          </form>
          <div className="hero-pills">
            <span className="pill pill--green"><RosetteBadge color="green" size={13} /> Platform Verified</span>
            <span className="pill pill--blue"><RosetteBadge color="blue"  size={13} /> Community Verified</span>
            <span className="pill pill--red">Scam Alerts</span>
          </div>
          <div className="hero-buttons">
            <button className="btn" onClick={() => navigate("/vendor-signup")}>Create a Vendor Account</button>
            <button className="btn btn--outline" onClick={() => navigate("/vendors")}>Browse Vendors</button>
          </div>
        </div>
        <div className="hero-curve" />
      </section>

      {/* ── FOR SELLERS ── */}
      <section id="sellers" className="audience-section">
        <div className="section-label">For Sellers</div>
        <h2>Build a Reputation That Works For You</h2>
        <p className="section-sub">Your WhatsApp hustle deserves a public face. Let satisfied customers speak for you.</p>
        <PerkCards perks={SELLER_PERKS} />
        <button className="btn" style={{ marginTop: 32 }} onClick={() => navigate("/vendor-signup")}>Register Your Business</button>
      </section>

      {/* ── FOR BUYERS ── */}
      <section id="buyers" className="audience-section buyers-bg">
        <div className="section-label">For Buyers</div>
        <h2>Shop With Confidence, Every Time</h2>
        <p className="section-sub">Never get scammed again. Know who you're paying before you send a dime.</p>
        <PerkCards perks={BUYER_PERKS} />
        {/* Buyers can browse without an account */}
        <button className="btn" style={{ marginTop: 32 }} onClick={() => navigate("/vendors")}>Browse Vendors</button>
      </section>

      {/* ── TRUST SYSTEM ── */}
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
                {t.steps.map((s, j) => (
                  <li key={j}><span className="step-num">{j + 1}</span><span>{s}</span></li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials-section">
        <div className="section-label">From the Community</div>
        <h2>People Who've Been There</h2>
        <p className="section-sub">Buyers who nearly got burned. Vendors who needed to be trusted. Real outcomes.</p>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testimonial-card">
              <p className="tcard-text">{t.quote}</p>
              <div className="tcard-person">
                <div className="tcard-avatar">{t.initials}</div>
                <div>
                  <div className="tcard-name">{t.name}</div>
                  <div className="tcard-detail">{t.detail}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="faq">
        <div className="section-label">Got Questions?</div>
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {FAQS.map((item, i) => (
            <div key={i} className={`faq-item ${openFAQ === i ? "faq-item--open" : ""}`}>
              <button className="faq-question" onClick={() => setOpenFAQ(openFAQ === i ? null : i)}>
                <span>{item.q}</span>
                <span className="faq-icon">{openFAQ === i ? "−" : "+"}</span>
              </button>
              <div className="faq-answer-wrapper"><p className="faq-answer">{item.a}</p></div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}