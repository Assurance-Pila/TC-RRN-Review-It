/* src/components/vendor/pages/VendorEditProfilePage.jsx */
import { useState, useEffect } from "react";

const CATS = ["Fashion","Food & Drinks","Tech & Gadgets","Footwear","Jewellery & Accessories","Beauty & Skincare","Home & Decor"];

export default function VendorEditProfilePage({ vendor, onSaved }) {
  const [form,    setForm]    = useState({ name:"", socialMediaUrl:"", category:"", phone:"", email:"", whatsapp:"" });
  const [saved,   setSaved]   = useState(false);

  useEffect(() => {
    if (vendor) setForm({
      name:          vendor.name          || "",
      socialMediaUrl:vendor.socialMediaUrl|| "",
      category:      vendor.category      || "",
      phone:         vendor.phone         || "",
      email:         vendor.email         || "",
      whatsapp:      vendor.whatsapp      || "",
    });
  }, [vendor]);

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setSaved(false); };

  const handleSave = () => {
    const vendors = JSON.parse(localStorage.getItem("vendors") || "[]");
    const idx     = vendors.findIndex(v => v.id === vendor?.id);
    if (idx > -1) {
      vendors[idx] = { ...vendors[idx], ...form };
      localStorage.setItem("vendors", JSON.stringify(vendors));
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (user) { localStorage.setItem("user", JSON.stringify({ ...user, ...form, fullName: form.name })); }
    }
    setSaved(true);
    onSaved();
  };

  return (
    <div className="vd-section">
      <div className="vd-section-head"><h2>Edit Profile</h2></div>
      <div className="vd-form">
        {saved && <div className="vd-success">✓ Profile updated successfully.</div>}

        {[
          { key:"name",           label:"Business Name",   placeholder:"Your business name" },
          { key:"socialMediaUrl", label:"Social Handle",   placeholder:"@instagram or @tiktok" },
          { key:"phone",          label:"Phone Number",    placeholder:"+237..." },
          { key:"email",          label:"Email Address",   placeholder:"business@email.com" },
          { key:"whatsapp",       label:"WhatsApp Number", placeholder:"+237..." },
        ].map(({ key, label, placeholder }) => (
          <div key={key} className="vd-field">
            <label className="vd-label">{label}</label>
            <input className="vd-input" value={form[key]} onChange={e => set(key, e.target.value)} placeholder={placeholder} />
          </div>
        ))}

        <div className="vd-field">
          <label className="vd-label">Category</label>
          <select className="vd-select" value={form.category} onChange={e => set("category", e.target.value)}>
            <option value="">Select a category…</option>
            {CATS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <button className="vd-save-btn" onClick={handleSave} disabled={!form.name.trim()}>
          Save Changes
        </button>
      </div>
    </div>
  );
}