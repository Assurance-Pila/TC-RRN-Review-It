import { AlertIco } from "../components/icons.jsx";

export default function ScamAlertsPage({ scamVendors, onViewVendor }) {
  return (
    <div className="ud-section">
      <div className="ud-section-head danger">
        <h2><AlertIco />&nbsp;Scam Alerts</h2>
        <span className="ud-badge">{scamVendors.length} flagged</span>
      </div>

      {scamVendors.length === 0 ? (
        <div className="scam-empty">✓ No scam alerts at this time. Stay safe!</div>
      ) : (
        <div className="scam-list">
          {scamVendors.map((v, i) => (
            <div key={i} className="scam-row" style={{ cursor: "pointer" }} onClick={() => onViewVendor(v)}>
              <div className="scam-row-left">
                <div className="scam-av">{(v.name || "??").slice(0, 2).toUpperCase()}</div>
                <div>
                  <div className="scam-name">{v.name}</div>
                  <div className="scam-handle">
                    {v.socialMediaUrl || "No link"}{v.category ? ` · ${v.category}` : ""}
                  </div>
                </div>
              </div>
              <span className="scam-tag">⚠ Flagged</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}