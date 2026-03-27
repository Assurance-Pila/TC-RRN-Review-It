import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db, supabase } from "../utils/database";
import logo from "../assets/logo.jpeg";
import "../styles/auth.css";

const Login = () => {
  const navigate  = useNavigate();
  const { signIn } = useAuth();
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

    try {
      // Sign in with Supabase
      const { data, error: signInError } = await signIn(email.trim(), password.trim());
      
      if (signInError) {
        setError(signInError.message);
        return;
      }

      if (data.user) {
        // Get user role from metadata first
        const userRole = data.user.user_metadata?.role || 'user';
        
        // Then check if user exists in our database
        const { data: userData, error: userError } = await db.getUserByEmail(email.trim());
        
        if (userError || !userData) {
          // Check if it's a vendor
          const { data: vendorData, error: vendorError } = await db.getVendorByEmail(email.trim());
          
          if (vendorError || !vendorData) {
            // User exists in Supabase but not in our database
            // Create the database record now
            if (userRole === 'vendor') {
              await db.createVendor({
                email: email.trim(),
                first_name: data.user.user_metadata?.first_name || '',
                last_name: data.user.user_metadata?.last_name || '',
                business_name: data.user.user_metadata?.business_name || '',
                category: data.user.user_metadata?.category || '',
                social_media_url: data.user.user_metadata?.social_media_url || '',
                phone: data.user.user_metadata?.phone || '',
                role: 'vendor',
                rating: 0,
                reviews: 0,
                profile_views: 0,
                platform_verified: false,
                community_verified: false,
                scam: false
              });
            } else {
              await db.createUser({
                email: email.trim(),
                full_name: data.user.user_metadata?.full_name || '',
                role: userRole
              });
            }
          }
          
          navigate(userRole === 'vendor' ? "/vendor" : userRole === 'admin' ? "/admin" : "/user");
        } else {
          // User exists in database, navigate based on role
          if (userData.role === 'admin') navigate("/admin");
          else navigate("/user");
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-root">
      <div className="login-panel--left">
        <div className="lp-blob lp-blob--1" />
        <div className="lp-blob lp-blob--2" />
        <div className="lp-blob lp-blob--3" />
        <div className="lp-content">
          <Link to="/" className="lp-logo-link">
            <img src={logo} alt="Review It" className="lp-logo" />
            <span className="lp-logo-text">Review It</span>
          </Link>
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

          <p className="lf-vendor-link">
            Are you a business owner? <Link to="/vendor-signup">Register your business →</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;