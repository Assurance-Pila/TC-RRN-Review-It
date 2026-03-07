/* src/components/vendor/pages/VendorBusinessCardPage.jsx */
import BusinessCard from "../components/cards/BusinessCard.jsx";

export default function VendorBusinessCardPage({ vendor }) {
  if (!vendor) return (
    <div className="vd-empty"><p>No profile found</p><span>Complete your profile first.</span></div>
  );
  return (
    <div className="vd-section">
      <div className="vd-section-head"><h2>Business Card</h2></div>
      <p style={{ fontSize: 13, color: "var(--muted)" }}>
        Generate your branded card and share it on WhatsApp, Instagram, or TikTok to attract more buyers and build trust.
      </p>
      <BusinessCard vendor={vendor} />
    </div>
  );
}