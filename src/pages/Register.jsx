/* src/pages/Register.jsx */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import logo from "../assets/logo.jpeg";

const CATEGORIES = [
  "Fashion", "Food & Drinks", "Tech & Gadgets", "Footwear",
  "Jewellery & Accessories", "Beauty & Skincare", "Home & Decor", "Other",
];

const EyeOpen = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOff = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "", lastName: "", businessName: "", category: "",
    socialMediaUrl: "", phone: "", email: "", password: "", confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setForm(p => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const { firstName, lastName, phone, email, password, confirmPassword, category } = form;
    if (!firstName.trim())           { setError("First name is required.");            return; }
    if (!lastName.trim())            { setError("Last name is required.");             return; }
    if (!phone.trim())               { setError("Phone number is required.");          return; }
    if (!email.trim())               { setError("Email is required.");                 return; }
    if (!category)                   { setError("Please select a business category."); return; }
    if (password.length < 8)         { setError("Password must be at least 8 characters."); return; }
    if (password !== confirmPassword) { setError("Passwords do not match.");           return; }
    
    setLoading(true);

    const vendor = {
      id: Date.now(),
      firstName,
      lastName,
      businessName: form.businessName || `${firstName} ${lastName}'s Business`,
      category,
      socialMediaUrl: form.socialMediaUrl || '',
      phone,
      email,
      password,
      role: 'vendor',
      rating: 0,
      reviews: 0,
      profileViews: 0,
      platformVerified: false,
      communityVerified: false,
      scam: false,
      createdAt: new Date().toISOString(),
    };
    
    const existing = JSON.parse(localStorage.getItem("vendors") || "[]");
    localStorage.setItem("vendors", JSON.stringify([...existing, vendor]));
    
    setLoading(false);
    navigate("/login");
  };

  return (
    <div className="auth-page-root">
      <div className="auth-card auth-card--wide">
        <Link to="/" className="auth-logo-link">
          <img src={logo} alt="Review It" className="auth-logo-img" />
          <span className="auth-logo-text">Review It</span>
        </Link>
      <div className="auth-card-header">
          <h1 className="auth-title">Register your business</h1>
          <p className="auth-subtitle">Get listed, earn reviews, and build trust with buyers</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="af-row">
            <div className="af-field">
              <label>First Name *</label>
              <input placeholder="Jean" value={form.firstName} onChange={set("firstName")} />
            </div>
            <div className="af-field">
              <label>Last Name *</label>
              <input placeholder="Mbah" value={form.lastName} onChange={set("lastName")} />
            </div>
          </div>

          <div className="af-field">
            <label>Business Name <span className="af-optional">(optional)</span></label>
            <input placeholder="e.g. Douala Styles" value={form.businessName} onChange={set("businessName")} />
          </div>

          <div className="af-field">
            <label>Business Category *</label>
            <select value={form.category} onChange={set("category")}>
              <option value="">Select a category…</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="af-field">
            <label>Instagram / TikTok handle</label>
            <input placeholder="@yourbusiness" value={form.socialMediaUrl} onChange={set("socialMediaUrl")} />
          </div>

          <div className="af-row">
            <div className="af-field">
              <label>Phone *</label>
              <input type="tel" placeholder="+237 6XX XXX XXX" value={form.phone} onChange={set("phone")} />
            </div>
            <div className="af-field">
              <label>Email *</label>
              <input type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} />
            </div>
          </div>

          <div className="af-row">
            <div className="af-field">
              <label>Password *</label>
              <div className="af-input-wrap">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={form.password}
                  onChange={set("password")}
                />
                <button type="button" className="af-eye" onClick={() => setShowPass(p => !p)} aria-label={showPass ? "Hide password" : "Show password"}>
                  {showPass ? <EyeOff /> : <EyeOpen />}
                </button>
              </div>
            </div>
            <div className="af-field">
              <label>Confirm Password *</label>
              <div className="af-input-wrap">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repeat password"
                  value={form.confirmPassword}
                  onChange={set("confirmPassword")}
                />
                <button type="button" className="af-eye" onClick={() => setShowConfirm(p => !p)} aria-label={showConfirm ? "Hide password" : "Show password"}>
                  {showConfirm ? <EyeOff /> : <EyeOpen />}
                </button>
              </div>
            </div>
          </div>

          {error && <div className="af-error-banner">{error}</div>}

          <button type="submit" className="af-submit" disabled={loading}>
            {loading ? "Creating account…" : "Create Vendor Account"}
          </button>
        </form>

        <div className="auth-links">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
          <p className="auth-switch-type">
            Looking to buy? <Link to="/signup">Create a buyer account →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}