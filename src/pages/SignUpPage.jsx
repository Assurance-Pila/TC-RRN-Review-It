import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/auth.css";

function RosetteBadge({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C12 2 14.9 5.1 17.2 5.6C19.5 6.1 23 7.2 23 7.2C23 7.2 20.8 9.8 20.7 12.2C20.6 14.6 22 18 22 18C22 18 19 17.3 16.8 18.3C14.6 19.3 12 22 12 22C12 22 9.4 19.3 7.2 18.3C5 17.3 2 18 2 18C2 18 3.4 14.6 3.3 12.2C3.2 9.8 1 7.2 1 7.2C1 7.2 4.5 6.1 6.8 5.6C9.1 5.1 12 2 12 2Z" fill="#006D5B" />
      <path d="M8.5 12L10.8 14.3L15.5 9.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SignUpPage() {
  const navigate = useNavigate();
  const [form, setForm]     = useState({ fullName: "", phone: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const update = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const validate = () => {
    const e = {};
    if (!form.fullName.trim())               e.fullName = "Full name is required.";
    if (!/^\+?\d{10,14}$/.test(form.phone.replace(/\s/g,""))) e.phone = "Enter a valid phone number.";
    if (form.password.length < 8)            e.password = "Password must be at least 8 characters.";
    if (form.password !== form.confirm)      e.confirm  = "Passwords do not match.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setLoading(true);
    // TODO: replace with real API call
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="signup-root">
      <Navbar />
      <div className="signup-wrapper">

        {/* Left panel */}
        <div className="signup-panel signup-panel--left">
          <div className="sp-brand">
            <RosetteBadge size={36} />
            <span>Review It</span>
          </div>
          <h2>Join a community that keeps commerce honest.</h2>
          <ul className="sp-perks">
            <li><span className="sp-dot green" />Search vendors before you pay</li>
            <li><span className="sp-dot green" />Leave reviews that protect others</li>
            <li><span className="sp-dot green" />Report scammers in real time</li>
          </ul>
          <p className="sp-vendor-link">
            Are you a vendor? <Link to="/vendor-signup">Register your business →</Link>
          </p>
        </div>

        {/* Right panel — form */}
        <div className="signup-panel signup-panel--right">
          <h1>Create your account</h1>
          <p className="signup-sub">Already have an account? <Link to="/signin">Sign in</Link></p>

          <form className="signup-form" onSubmit={handleSubmit} noValidate>
            <div className="sf-field">
              <label>Full Name</label>
              <input type="text" placeholder="e.g. Amaka Johnson" value={form.fullName} onChange={e => update("fullName", e.target.value)} className={errors.fullName ? "error" : ""} />
              {errors.fullName && <span className="sf-error">{errors.fullName}</span>}
            </div>

            <div className="sf-field">
              <label>Phone Number</label>
              <input type="tel" placeholder="e.g. 08012345678" value={form.phone} onChange={e => update("phone", e.target.value)} className={errors.phone ? "error" : ""} />
              {errors.phone && <span className="sf-error">{errors.phone}</span>}
            </div>

            <div className="sf-field">
              <label>Password</label>
              <input type="password" placeholder="At least 8 characters" value={form.password} onChange={e => update("password", e.target.value)} className={errors.password ? "error" : ""} />
              {errors.password && <span className="sf-error">{errors.password}</span>}
            </div>

            <div className="sf-field">
              <label>Confirm Password</label>
              <input type="password" placeholder="Repeat your password" value={form.confirm} onChange={e => update("confirm", e.target.value)} className={errors.confirm ? "error" : ""} />
              {errors.confirm && <span className="sf-error">{errors.confirm}</span>}
            </div>

            <button type="submit" className="btn signup-btn" disabled={loading}>
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <p className="signup-terms">By signing up you agree to our <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>.</p>
        </div>
      </div>
    </div>
  );
}