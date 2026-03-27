/* src/pages/SignUpPage.jsx */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../utils/database";
import "../styles/auth.css";
import logo from "../assets/logo.jpeg";

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

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [form,        setForm]        = useState({ fullName: "", phone: "", email: "", password: "", confirm: "" });
  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors,      setErrors]      = useState({});
  const [loading,     setLoading]     = useState(false);

  const update = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const validate = () => {
    const e = {};
    if (!form.fullName.trim())                                  e.fullName = "Full name is required.";
    if (!/^\+?\d{10,14}$/.test(form.phone.replace(/\s/g, ""))) e.phone    = "Enter a valid phone number.";
    if (!form.email.trim())                                      e.email    = "Email is required.";
    if (form.password.length < 8)                               e.password = "Password must be at least 8 characters.";
    if (form.password !== form.confirm)                         e.confirm  = "Passwords do not match.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);

    try {
      // 1. Sign up with Supabase Auth
      const { data, error: signUpError } = await signUp(
        form.email.trim(), 
        form.password,
        {
          data: {
            role: 'user',
            full_name: form.fullName,
            phone: form.phone
          }
        }
      );

      if (signUpError) {
        setErrors({ submit: signUpError.message });
        return;
      }

      if (data.user) {
        // 2. Create user record in our database
        const { data: userData, error: dbError } = await db.createUser({
          email: form.email.trim(),
          password: form.password, // In production, you might want to handle this differently
          full_name: form.fullName,
          phone: form.phone,
          role: 'user'
        });

        if (dbError) {
          console.error('Database error:', dbError);
          // User was created in Supabase but not in our DB - that's okay for now
        }

        // 3. Navigate to login with success message
        setLoading(false);
        navigate("/login");
      }
    } catch (err) {
      console.error('Signup error:', err);
      setErrors({ submit: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-root">
      <div className="auth-card">
        <Link to="/" className="auth-logo-link">
          <img src={logo} alt="Review It" className="auth-logo-img" />
          <span className="auth-logo-text">Review It</span>
        </Link>
      <div className="auth-card-header">
          <h1 className="auth-title">Create account</h1>
          <p className="auth-subtitle">Join the community and shop with confidence</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="af-field">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Your full name"
              value={form.fullName}
              onChange={e => update("fullName", e.target.value)}
              className={errors.fullName ? "error" : ""}
            />
            {errors.fullName && <span className="af-error">{errors.fullName}</span>}
          </div>

          <div className="af-field">
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="+237 6XX XXX XXX"
              value={form.phone}
              onChange={e => update("phone", e.target.value)}
              className={errors.phone ? "error" : ""}
            />
            {errors.phone && <span className="af-error">{errors.phone}</span>}
          </div>

          <div className="af-field">
            <label>Email <span className="af-required">*</span></label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => update("email", e.target.value)}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="af-error">{errors.email}</span>}
          </div>

          <div className="af-field">
            <label>Password</label>
            <div className="af-input-wrap">
              <input
                type={showPass ? "text" : "password"}
                placeholder="At least 8 characters"
                value={form.password}
                onChange={e => update("password", e.target.value)}
                className={errors.password ? "error" : ""}
              />
              <button type="button" className="af-eye" onClick={() => setShowPass(p => !p)} aria-label={showPass ? "Hide password" : "Show password"}>
                {showPass ? <EyeOff /> : <EyeOpen />}
              </button>
            </div>
            {errors.password && <span className="af-error">{errors.password}</span>}
          </div>

          <div className="af-field">
            <label>Confirm Password</label>
            <div className="af-input-wrap">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Repeat your password"
                value={form.confirm}
                onChange={e => update("confirm", e.target.value)}
                className={errors.confirm ? "error" : ""}
              />
              <button type="button" className="af-eye" onClick={() => setShowConfirm(p => !p)} aria-label={showConfirm ? "Hide password" : "Show password"}>
                {showConfirm ? <EyeOff /> : <EyeOpen />}
              </button>
            </div>
            {errors.confirm && <span className="af-error">{errors.confirm}</span>}
          </div>

          {errors.submit && <div className="af-error-banner">{errors.submit}</div>}

          <button type="submit" className="af-submit" disabled={loading}>
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>

        <div className="auth-links">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
          <p className="auth-switch-type">
            Are you a business owner? <Link to="/vendor-signup">Register your business →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}