import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import "../styles/auth.css";

const Login = () => {
  const navigate  = useNavigate();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please fill in both fields."); return;
    }

    setLoading(true);
    await new Promise(r => setTimeout(r, 500));

    const users   = JSON.parse(localStorage.getItem("users")   || "[]");
    const vendors = JSON.parse(localStorage.getItem("vendors") || "[]");

    // Search vendors first by email or phone, then users
    const match =
      vendors.find(a => a.email === email.trim() || a.phone === email.trim()) ||
      users.find(a => a.email === email.trim() || a.phone === email.trim());

    setLoading(false);

    if (!match) { setError("No account found with that email or phone."); return; }

    // Ensure role is set — fallback based on which list they came from
    const role = match.role || (vendors.includes(match) ? "vendor" : "user");
    const sessionUser = { ...match, role };
    localStorage.setItem("user", JSON.stringify(sessionUser));

    if (role === "vendor")     navigate("/vendor");
    else if (role === "admin") navigate("/admin");
    else                       navigate("/user");
  };

  return (
    <div className="login-root">
      <div className="login-panel--left">
        <div className="lp-blob lp-blob--1" />
        <div className="lp-blob lp-blob--2" />
        <div className="lp-blob lp-blob--3" />
        <div className="lp-content">
          <div className="lp-logo-wrap">
            <img src={logo} alt="Review It" className="lp-logo" />
          </div>
          <h2 className="lp-heading">Welcome<br />back.</h2>
          <p className="lp-sub">The community that keeps online commerce honest. Search vendors, read real reviews, and shop with confidence.</p>
          <div className="lp-pillars">
            <div className="lp-pillar">
              <div className="lp-pillar-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <p className="lp-pillar-title">Verified Reviews</p>
                <p className="lp-pillar-desc">Every review comes from a real transaction, not a fake account.</p>
              </div>
            </div>
            <div className="lp-pillar">
              <div className="lp-pillar-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
              <div>
                <p className="lp-pillar-title">Scam Detection</p>
                <p className="lp-pillar-desc">Search any vendor before you pay. Know who to trust instantly.</p>
              </div>
            </div>
            <div className="lp-pillar">
              <div className="lp-pillar-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
              </div>
              <div>
                <p className="lp-pillar-title">Community First</p>
                <p className="lp-pillar-desc">Built by buyers and sellers who believe in fair, honest trade.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="login-panel--right">
        <div className="login-form-wrap">
          <div className="lf-header">
            <h1>Sign in</h1>
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          </div>

          <form className="lf-form" onSubmit={handleSubmit} noValidate>
            <div className="lf-field">
              <label>Email or Phone</label>
              <div className="lf-input-wrap">
                <svg className="lf-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <input type="text" placeholder="you@example.com or 080..." value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
              </div>
            </div>

            <div className="lf-field">
              <label>
                Password
                <Link to="/forgot-password" className="lf-forgot">Forgot password?</Link>
              </label>
              <div className="lf-input-wrap">
                <svg className="lf-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                <input type={showPass ? "text" : "password"} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
                <button type="button" className="lf-eye" onClick={() => setShowPass(p => !p)}>
                  {showPass
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            {error && (
              <div className="lf-error">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            )}

            <button type="submit" className="lf-submit" disabled={loading}>
              {loading ? <span className="lf-spinner" /> : "Sign in"}
            </button>
          </form>

          <div className="lf-divider"><span>or continue with</span></div>
          <button className="lf-google" type="button">
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </button>

          <p className="lf-vendor-link">
            Are you a business owner? <Link to="/vendor-signup">Register your business →</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;