/* src/components/cards/VendorCard.jsx */
import { Rosette, Stars } from "../icons.jsx";
import "./VendorCard.css";

export default function VendorCard({ vendor, onView }) {
  const initials = (vendor.name || "??").slice(0, 2).toUpperCase();
  return (
    <div className={`vcard ${vendor.scam ? "scam" : ""}`} onClick={() => onView(vendor)}>
      {vendor.scam && <div className="vcard-scam-tag">⚠ Scam</div>}
      <div className="vcard-top">
        <div className={`vcard-av ${vendor.scam ? "scam" : ""}`}>{initials}</div>
        <div style={{ minWidth: 0 }}>
          <div className="vcard-name">{vendor.name}</div>
          <div className="vcard-handle">{vendor.socialMediaUrl || "No social link"}</div>
        </div>
      </div>
      <div className="vcard-badges">
        {vendor.platformVerified  && <span className="vbadge teal"><Rosette /> Platform</span>}
        {vendor.communityVerified && <span className="vbadge blue"><Rosette blue /> Community</span>}
        {vendor.category          && <span className="vbadge muted">{vendor.category}</span>}
      </div>
      <div className="vcard-stars">
        <Stars rating={vendor.rating || 0} />
        <span style={{ fontSize: 12, fontWeight: 700, color: "#f59e0b", marginLeft: 4 }}>{(vendor.rating || 0).toFixed(1)}</span>
        <span className="vcard-rcount">({vendor.reviews || 0})</span>
      </div>
      <button className="vcard-btn" onClick={e => { e.stopPropagation(); onView(vendor); }}>View Profile</button>
    </div>
  );
}