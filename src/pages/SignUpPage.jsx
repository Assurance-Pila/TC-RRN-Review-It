import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import "../styles/auth.css";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ fullName: "", phone: "", email: "", password: "", confirm: "" });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);

  const update = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const validate = () => {
    const e = {};
    if (!form.fullName.trim())                                   e.fullName = "Full name is required.";
    if (!/^\+?\d{10,14}$/.test(form.phone.replace(/\s/g, "")))  e.phone    = "Enter a valid phone number.";
    if (form.password.length < 8)                                e.password = "Password must be at least 8 characters.";
    if (form.password !== form.confirm)                          e.confirm  = "Passwords do not match.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));

    // Save session (replace with Supabase later)
    const user = { id: Date.now(), fullName: form.fullName, phone: form.phone, email: form.email || form.phone, role: "user" };
    localStorage.setItem("user", JSON.stringify(user));

    // Save to users registry
    const existing = JSON.parse(localStorage.getItem("users") || "[]");
    localStorage.setItem("users", JSON.stringify([...existing, user]));

    setLoading(false);
    navigate("/user");
  };

  return (
    <div className="signup-root">
      <div className="signup-wrapper">
        <div className="signup-panel signup-panel--left">
          <div className="sp-brand"><img src={logo} alt="Review It" className="sp-logo" /></div>
          <h2>Join a community that keeps commerce honest.</h2>
          <ul className="sp-perks">
            <li><span className="sp-dot green" />Search vendors before you pay</li>
            <li><span className="sp-dot green" />Leave reviews that protect others</li>
            <li><span className="sp-dot green" />Report scammers in real time</li>
          </ul>
          <p className="sp-vendor-link">Are you a vendor? <Link to="/vendor-signup">Register your business →</Link></p>
        </div>

        <div className="signup-panel signup-panel--right">
          <h1>Create your account</h1>
          <p className="signup-sub">Already have an account? <Link to="/login">Sign in</Link></p>
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
              <label>Email</label>
              <input type="email" placeholder="you@example.com" value={form.email} onChange={e => update("email", e.target.value)} />
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