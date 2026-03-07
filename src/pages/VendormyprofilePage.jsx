/* src/components/vendor/pages/VendorMyProfilePage.jsx */
import VendorCard from "../components/cards/VendorCard.jsx";

export default function VendorMyProfilePage({ vendor, reviews }) {
  if (!vendor) return (
    <div className="vd-empty"><p>No profile found</p><span>Complete your profile in Edit Profile.</span></div>
  );
  return (
    <div className="vd-section">
      <div className="vd-section-head">
        <h2>My Public Profile</h2>
      </div>
      <p style={{ fontSize: 13, color: "var(--muted)" }}>This is exactly how buyers see your business on the platform.</p>
      <div style={{ maxWidth: 320 }}>
        <VendorCard vendor={vendor} onView={() => {}} />
      </div>
      <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 8, maxWidth: 480 }}>
        <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 13.5, fontWeight: 700, color: "var(--text)" }}>Profile Details</div>
        {[
          ["Business Name",  vendor.name],
          ["Category",       vendor.category || "—"],
          ["Social Handle",  vendor.socialMediaUrl || "—"],
          ["Phone",          vendor.phone || "—"],
          ["Email",          vendor.email || "—"],
          ["WhatsApp",       vendor.whatsapp || "—"],
        ].map(([label, val]) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderBottom: "1px solid var(--border)", paddingBottom: 6 }}>
            <span style={{ color: "var(--muted)", fontWeight: 500 }}>{label}</span>
            <span style={{ color: "var(--text)", fontWeight: 500, textAlign: "right", maxWidth: "60%", wordBreak: "break-word" }}>{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}