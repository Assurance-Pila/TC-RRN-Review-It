import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import "../styles/auth.css";

const CATEGORIES = [
  "Fashion", "Food & Drinks", "Tech & Gadgets", "Footwear",
  "Jewellery & Accessories", "Beauty & Skincare", "Home & Decor", "Other"
];

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", businessName: "", category: "",
    socialMediaUrl: "", phone: "", email: "", password: "", confirmPassword: "",
  });
  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const set = (field) => (e) => setFormData(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const { firstName, lastName, phone, email, password, confirmPassword, category } = formData;

    if (!firstName.trim())    { setError("First name is required.");          return; }
    if (!lastName.trim())     { setError("Last name is required.");           return; }
    if (!phone.trim())        { setError("Phone number is required.");        return; }
    if (!email.trim())        { setError("Email is required.");               return; }
    if (!category)            { setError("Please select a business category."); return; }
    if (password.length < 8)  { setError("Password must be at least 8 characters."); return; }
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }

    const vendor = {
      id: Date.now(),
      name: formData.businessName.trim() || `${firstName} ${lastName}`,
      firstName, lastName,
      businessName: formData.businessName,
      category,
      socialMediaUrl: formData.socialMediaUrl,
      phone, email,
      role: "vendor",
      platformVerified: false,
      communityVerified: false,
      scam: false,
      rating: 0,
      reviews: 0,
      profileViews: 0,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("user", JSON.stringify(vendor));
    const existing = JSON.parse(localStorage.getItem("vendors") || "[]");
    localStorage.setItem("vendors", JSON.stringify([...existing, vendor]));
    navigate("/vendor");
  };

  return (
    <div className="auth-container">
      <div className="auth-card auth-card--md">
        <img src={logo} alt="Review It" className="sp-logo" style={{ marginBottom: 4 }} />
        <h1 className="auth-title">Register Your Business</h1>
        <p className="auth-sub">Create your vendor profile on Review It</p>

        <form onSubmit={handleSubmit} noValidate>

          <div className="row">
            <div className="half">
              <div className="input-group">
                <label className="input-label">First Name *</label>
                <input className="input-field" placeholder="John" value={formData.firstName} onChange={set("firstName")} />
              </div>
            </div>
            <div className="half">
              <div className="input-group">
                <label className="input-label">Last Name *</label>
                <input className="input-field" placeholder="Doe" value={formData.lastName} onChange={set("lastName")} />
              </div>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Business Name</label>
            <input className="input-field" placeholder="e.g. StyleCraft NG (optional)" value={formData.businessName} onChange={set("businessName")} />
          </div>

          <div className="input-group">
            <label className="input-label">Business Category *</label>
            <select className="input-field role-select" value={formData.category} onChange={set("category")}>
              <option value="">Select a category</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Social Media URL</label>
            <input className="input-field" placeholder="Instagram / TikTok / WhatsApp link" value={formData.socialMediaUrl} onChange={set("socialMediaUrl")} />
          </div>

          <div className="input-group">
            <label className="input-label">Phone Number *</label>
            <input className="input-field" placeholder="e.g. 08012345678" value={formData.phone} onChange={set("phone")} />
          </div>

          <div className="input-group">
            <label className="input-label">Email *</label>
            <input className="input-field" type="email" placeholder="Enter your email" value={formData.email} onChange={set("email")} />
          </div>

          <div className="input-group">
            <label className="input-label">Password *</label>
            <div className="relative">
              <input className="input-field" type={showPass ? "text" : "password"} placeholder="At least 8 characters" value={formData.password} onChange={set("password")} />
              <span className="password-toggle" onClick={() => setShowPass(p => !p)}>{showPass ? "🙈" : "👁"}</span>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Confirm Password *</label>
            <div className="relative">
              <input className="input-field" type={showConfirm ? "text" : "password"} placeholder="Repeat your password" value={formData.confirmPassword} onChange={set("confirmPassword")} />
              <span className="password-toggle" onClick={() => setShowConfirm(p => !p)}>{showConfirm ? "🙈" : "👁"}</span>
            </div>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="primary-btn">Create Vendor Account</button>
        </form>

        <p className="center-text" style={{ marginTop: 12 }}>
          Already have an account? <Link to="/login" className="link-text">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;