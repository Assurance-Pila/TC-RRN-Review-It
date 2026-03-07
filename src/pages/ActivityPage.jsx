/* src/pages/ActivityPage.jsx */
import { ActIco } from "../components/icons.jsx";

const ACT_COLORS = { review: "#006D5B", search: "#2563eb", alert: "#dc2626", profile: "#d97706" };

export default function ActivityPage({ activity }) {
  return (
    <div className="ud-section">
      <div className="ud-section-head">
        <h2>Recent Activity</h2>
        {activity.length > 0 && <span className="ud-badge">{activity.length} actions</span>}
      </div>
      {activity.length === 0 ? (
        <div className="ud-empty"><ActIco /><p>No activity yet</p><span>Your searches, reviews, and profile views will appear here.</span></div>
      ) : (
        <div className="act-list">
          {activity.map((a, i) => (
            <div key={i} className="act-row">
              <div className="act-dot" style={{ background: ACT_COLORS[a.type] || "#006D5B" }} />
              <div><div className="act-text">{a.text}</div><div className="act-time">{a.time}</div></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}