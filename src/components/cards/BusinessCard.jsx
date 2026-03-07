import { useRef, useState } from "react";
import reviewItLogo from "../../assets/logo.jpeg";
import "./BusinessCard.css";

function RosetteBadge({ color = "green", size = 12 }) {
  const fill = color === "green" ? "#006D5B" : "#2563eb";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M12 2C12 2 14.9 5.1 17.2 5.6C19.5 6.1 23 7.2 23 7.2C23 7.2 20.8 9.8 20.7 12.2C20.6 14.6 22 18 22 18C22 18 19 17.3 16.8 18.3C14.6 19.3 12 22 12 22C12 22 9.4 19.3 7.2 18.3C5 17.3 2 18 2 18C2 18 3.4 14.6 3.3 12.2C3.2 9.8 1 7.2 1 7.2C1 7.2 4.5 6.1 6.8 5.6C9.1 5.1 12 2 12 2Z" fill={fill} />
      <path d="M8.5 12L10.8 14.3L15.5 9.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Inline styles (html2canvas needs inline) ── */
const S = {
  card:         { width: 380, borderRadius: 20, overflow: "hidden", background: "#ffffff", boxShadow: "0 20px 60px rgba(0,109,91,0.15), 0 4px 16px rgba(0,0,0,0.08)", fontFamily: "'DM Sans', sans-serif", border: "1px solid #e0ece8" },

  /* Green header band */
  header:       { background: "linear-gradient(135deg, #006D5B 0%, #00503f 100%)", padding: "22px 24px 18px", display: "flex", flexDirection: "column", gap: 14 },
  headerTop:    { display: "flex", alignItems: "center", justifyContent: "space-between" },

  /* Logo area */
  logoCircle:   { width: 56, height: 56, borderRadius: 14, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0, border: "2px solid rgba(195,234,214,0.5)" },
  logoImg:      { width: 52, height: 52, objectFit: "cover", borderRadius: 12 },
  logoInitials: { fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 18, color: "#006D5B", letterSpacing: "-0.02em" },

  /* Badges */
  badgeCol:     { display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-end" },
  badge:        { display: "inline-flex", alignItems: "center", gap: 4, fontSize: 9.5, fontWeight: 700, padding: "3px 9px", borderRadius: 6, letterSpacing: "0.03em" },
  badgeGreen:   { background: "rgba(195,234,214,0.25)", color: "#C3EAD6", border: "1px solid rgba(195,234,214,0.4)" },
  badgeBlue:    { background: "rgba(147,197,253,0.2)",  color: "#93c5fd", border: "1px solid rgba(147,197,253,0.35)" },
  badgeGray:    { background: "rgba(255,255,255,0.1)",  color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.15)" },

  /* Name row */
  name:         { fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 1.2 },
  category:     { fontSize: 10.5, fontWeight: 600, color: "rgba(195,234,214,0.8)", textTransform: "uppercase", letterSpacing: "0.1em" },

  /* White body */
  body:         { padding: "18px 24px 20px", display: "flex", flexDirection: "column", gap: 12 },
  divider:      { height: 1, background: "#e0ece8", margin: "2px 0" },

  infoGrid:     { display: "flex", flexDirection: "column", gap: 7 },
  infoRow:      { display: "flex", alignItems: "center", gap: 10 },
  infoIcon:     { width: 26, height: 26, borderRadius: 7, background: "#f0faf6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 },
  infoText:     { fontSize: 13, color: "#1a2e28", fontWeight: 500, wordBreak: "break-all" },

  /* Rating strip */
  ratingStrip: { display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f0faf6", border: "1px solid #e0ece8", borderRadius: 10, padding: "10px 14px" },
  ratingLeft:  { display: "flex", flexDirection: "column", gap: 2 },
  ratingVal:   { fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 800, color: "#006D5B", lineHeight: 1 },
  ratingLabel: { fontSize: 9.5, color: "#5a7068", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" },
  ratingRight: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 },
  stars:       { display: "flex", gap: 2 },
  trustBadge:  { fontSize: 10, fontWeight: 700, color: "#006D5B", background: "#d4efe5", border: "1px solid #C3EAD6", borderRadius: 6, padding: "2px 8px", letterSpacing: "0.03em" },

  /* Review CTA box */
  reviewBox:    { display: "flex", alignItems: "center", gap: 10, background: "#f0faf6", border: "1.5px solid #C3EAD6", borderRadius: 11, padding: "10px 14px" },
  reviewMeta:   { display: "flex", flexDirection: "column", gap: 1, overflow: "hidden" },
  reviewLabel:  { fontSize: 9.5, color: "#5a7068", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" },
  reviewUrl:    { fontSize: 11.5, color: "#006D5B", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },

  /* Footer with ReviewIt branding */
  footer:       { display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid #e0ece8" },
  footerLeft:   { display: "flex", alignItems: "center", gap: 6 },
  footerLogo:   { width: 18, height: 18, borderRadius: 4, objectFit: "cover" },
  footerText:   { fontSize: 10, color: "#5a7068", fontWeight: 500 },
  footerBrand:  { fontSize: 10, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: "#006D5B" },
};

export default function BusinessCard({ vendor }) {
  const cardRef   = useRef(null);
  const fileRef   = useRef(null);
  const [copied,      setCopied]      = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [logoSrc,     setLogoSrc]     = useState(null); // uploaded logo

  const vendorName  = vendor?.businessName || vendor?.name || "Your Business";
  const initials    = vendorName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  const reviewLink  = `${window.location.origin}/vendors/${vendor?.id || "profile"}`;
  const social      = vendor?.socialMediaUrl || "";
  const phone       = vendor?.phone || "";
  const whatsapp    = vendor?.whatsapp || "";
  const avgRating   = vendor?.rating ? Number(vendor.rating).toFixed(1) : "0.0";
  const reviewCount = vendor?.reviews || 0;
  const trustLabel  = vendor?.platformVerified ? "Platform Verified Vendor" : vendor?.communityVerified ? "Community Trusted Vendor" : avgRating >= 4 ? "Highly Rated Vendor" : "A Trusted Vendor";
  const category    = vendor?.category || "";
  const isPlatform  = vendor?.platformVerified;
  const isCommunity = vendor?.communityVerified;

  /* Logo upload */
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setLogoSrc(ev.target.result);
    reader.readAsDataURL(file);
  };

  /* Copy link */
  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(reviewLink); }
    catch { alert("Link: " + reviewLink); }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  /* Download PNG */
  const handleDownload = async () => {
    setDownloading(true);
    const capture = async () => {
      const canvas = await window.html2canvas(cardRef.current, { scale: 3, useCORS: true, backgroundColor: "#ffffff" });
      const link   = document.createElement("a");
      link.download = `${vendorName.replace(/\s+/g, "_")}_ReviewIt_Card.png`;
      link.href     = canvas.toDataURL("image/png");
      link.click();
      setDownloading(false);
    };
    if (window.html2canvas) { await capture(); }
    else {
      const s    = document.createElement("script");
      s.src      = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
      s.onload   = capture;
      s.onerror  = () => { alert("Download failed. Right-click the card and save as image."); setDownloading(false); };
      document.head.appendChild(s);
    }
  };

  return (
    <div className="bc-wrapper">
      <p className="bc-sublabel">Generate your branded card and share it on WhatsApp, Instagram or TikTok to collect reviews and build trust.</p>

      {/* Logo upload button */}
      <div className="bc-logo-upload">
        <button className="bc-upload-btn" onClick={() => fileRef.current?.click()}>
          {logoSrc ? "✓ Logo uploaded — change it" : "⬆ Upload your business logo"}
        </button>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleLogoUpload} />
        <span className="bc-upload-hint">Optional — your logo appears on the card</span>
      </div>

      {/* ── THE CARD ── inline styles for html2canvas */}
      <div ref={cardRef} style={S.card}>

        {/* Green header */}
        <div style={S.header}>
          <div style={S.headerTop}>
            {/* Logo or initials */}
            <div style={S.logoCircle}>
              {logoSrc
                ? <img src={logoSrc} alt="logo" style={S.logoImg} />
                : <span style={S.logoInitials}>{initials}</span>
              }
            </div>
            {/* Badges */}
            <div style={S.badgeCol}>
              {isPlatform  && <span style={{ ...S.badge, ...S.badgeGreen }}><RosetteBadge color="green" size={10} /> Platform Verified</span>}
              {isCommunity && <span style={{ ...S.badge, ...S.badgeBlue  }}><RosetteBadge color="blue"  size={10} /> Community Verified</span>}
              {!isPlatform && !isCommunity && <span style={{ ...S.badge, ...S.badgeGray }}>Unverified</span>}
            </div>
          </div>
          {/* Name + category */}
          <div>
            <div style={S.name}>{vendorName}</div>
            {category && <div style={S.category}>{category}</div>}
          </div>
        </div>

        {/* White body */}
        <div style={S.body}>
          {/* Contact details */}
          {(social || phone || whatsapp) && (
            <div style={S.infoGrid}>
              {social && (
                <div style={S.infoRow}>
                  <div style={S.infoIcon}>📱</div>
                  <span style={S.infoText}>{social}</span>
                </div>
              )}
              {phone && (
                <div style={S.infoRow}>
                  <div style={S.infoIcon}>📞</div>
                  <span style={S.infoText}>{phone}</span>
                </div>
              )}
              {whatsapp && (
                <div style={S.infoRow}>
                  <div style={S.infoIcon}>💬</div>
                  <span style={S.infoText}>{whatsapp}</span>
                </div>
              )}
            </div>
          )}

          <div style={S.divider} />

          {/* Rating strip */}
          <div style={S.ratingStrip}>
            <div style={S.ratingLeft}>
              <span style={S.ratingVal}>{avgRating}</span>
              <span style={S.ratingLabel}>{reviewCount} review{reviewCount !== 1 ? "s" : ""}</span>
            </div>
            <div style={S.ratingRight}>
              <div style={S.stars}>
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i <= Math.round(Number(avgRating)) ? "#f59e0b" : "#e0ece8"} stroke={i <= Math.round(Number(avgRating)) ? "#f59e0b" : "#e0ece8"} strokeWidth="1">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span style={S.trustBadge}>✓ {trustLabel}</span>
            </div>
          </div>

          {/* Review link CTA */}
          <div style={S.reviewBox}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <path d="M12 2C12 2 14.9 5.1 17.2 5.6C19.5 6.1 23 7.2 23 7.2C23 7.2 20.8 9.8 20.7 12.2C20.6 14.6 22 18 22 18C22 18 19 17.3 16.8 18.3C14.6 19.3 12 22 12 22C12 22 9.4 19.3 7.2 18.3C5 17.3 2 18 2 18C2 18 3.4 14.6 3.3 12.2C3.2 9.8 1 7.2 1 7.2C1 7.2 4.5 6.1 6.8 5.6C9.1 5.1 12 2 12 2Z" fill="#006D5B" />
              <path d="M8.5 12L10.8 14.3L15.5 9.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div style={S.reviewMeta}>
              <span style={S.reviewLabel}>Leave me a review on Review It</span>
              <span style={S.reviewUrl}>{reviewLink}</span>
            </div>
          </div>

          {/* Footer */}
          <div style={S.footer}>
            <div style={S.footerLeft}>
              <img src={reviewItLogo} alt="Review It" style={S.footerLogo} />
              <span style={S.footerBrand}>Review It</span>
            </div>
            <span style={S.footerText}>Trust before you pay</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="bc-actions">
        <button className="bc-btn-primary" onClick={handleDownload} disabled={downloading}>
          {downloading ? "Preparing…" : "⬇ Download PNG"}
        </button>
        <button className={`bc-btn-outline ${copied ? "copied" : ""}`} onClick={handleCopy}>
          {copied ? "✓ Copied!" : "🔗 Copy Review Link"}
        </button>
      </div>
    </div>
  );
}