/* src/components/cards/ReviewForm.jsx */
import { useState, useEffect } from "react";

export default function ReviewForm({ vendors, prefillVendor, onSave }) {
  const [vendorId,  setVendorId]  = useState(prefillVendor ? String(prefillVendor.id) : "");
  const [rating,    setRating]    = useState(0);
  const [hovered,   setHovered]   = useState(0);
  const [text,      setText]      = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState("");

  useEffect(() => { if (prefillVendor) setVendorId(String(prefillVendor.id)); }, [prefillVendor]);

  const handleSubmit = () => {
    if (!vendorId)    { setError("Please select a vendor."); return; }
    if (!rating)      { setError("Please give a star rating."); return; }
    if (!text.trim()) { setError("Please write something about your experience."); return; }
    const user   = JSON.parse(localStorage.getItem("user") || "null");
    const review = { id: Date.now(), vendorId: isNaN(vendorId) ? vendorId : Number(vendorId), reviewerName: user?.fullName || user?.name || "Anonymous", rating, text: text.trim(), date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) };
    const existing = JSON.parse(localStorage.getItem("reviews") || "[]");
    localStorage.setItem("reviews", JSON.stringify([...existing, review]));
    const vArr = JSON.parse(localStorage.getItem("vendors") || "[]");
    const idx  = vArr.findIndex(v => String(v.id) === String(review.vendorId));
    if (idx > -1) {
      const all = [...existing, review].filter(r => String(r.vendorId) === String(review.vendorId));
      vArr[idx].rating  = all.reduce((s, r) => s + r.rating, 0) / all.length;
      vArr[idx].reviews = all.length;
      localStorage.setItem("vendors", JSON.stringify(vArr));
    }
    const act = JSON.parse(localStorage.getItem("userActivity") || "[]");
    const selected = vArr.find(v => String(v.id) === String(review.vendorId));
    localStorage.setItem("userActivity", JSON.stringify([{ type: "review", text: `You reviewed ${selected?.name || "a vendor"}`, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }, ...act].slice(0, 50)));
    onSave(review);
    setSubmitted(true); setVendorId(""); setRating(0); setText(""); setError("");
  };

  if (submitted) return (
    <div className="rf-wrap">
      <div className="rf-success">✓ Review submitted! Thank you for helping the community.</div>
      <button className="rf-submit" onClick={() => setSubmitted(false)}>Write Another Review</button>
    </div>
  );

  return (
    <div className="rf-wrap">
      <div className="rf-title">Write a Review</div>
      <p style={{ fontSize: 13.5, color: "var(--muted)", marginTop: -10 }}>Share your honest experience to help the community.</p>
      <div className="rf-field">
        <label className="rf-label">Select Business *</label>
        <select className="rf-select" value={vendorId} onChange={e => setVendorId(e.target.value)}>
          <option value="">Choose a vendor…</option>
          {vendors.filter(v => !v.scam).map(v => <option key={v.id} value={String(v.id)}>{v.name}{v.category ? ` · ${v.category}` : ""}</option>)}
        </select>
      </div>
      <div className="rf-field">
        <label className="rf-label">Star Rating *</label>
        <div className="rf-stars-row">
          {[1,2,3,4,5].map(s => (
            <button key={s} className={`rf-star ${s <= (hovered || rating) ? "on" : ""}`} onMouseEnter={() => setHovered(s)} onMouseLeave={() => setHovered(0)} onClick={() => setRating(s)}>★</button>
          ))}
          {rating > 0 && <span style={{ fontSize: 12, color: "var(--muted)", marginLeft: 4 }}>{["","Poor","Fair","Good","Very Good","Excellent"][rating]}</span>}
        </div>
      </div>
      <div className="rf-field">
        <label className="rf-label">Your Review *</label>
        <textarea className="rf-textarea" rows={4} placeholder="Describe your experience — delivery, quality, communication…" value={text} onChange={e => setText(e.target.value)} maxLength={500} />
        <span style={{ fontSize: 11, color: "#a0b8b0", alignSelf: "flex-end" }}>{text.length}/500</span>
      </div>
      {error && <div style={{ fontSize: 13, color: "var(--red)", padding: "8px 12px", background: "#fff5f5", borderRadius: 8, border: "1px solid #fecaca" }}>{error}</div>}
      <button className="rf-submit" onClick={handleSubmit} disabled={!vendorId || !rating || !text.trim()}>Submit Review</button>
    </div>
  );
}