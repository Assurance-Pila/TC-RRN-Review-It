/* src/pages/MyProfilePage.jsx */
import { StarIcon } from "../components/icons.jsx";

export default function MyProfilePage({ user, userName, initials, myReviews, vendors, searches }) {
  return (
    <div className="ud-section">
      <div className="ud-section-head"><h2>My Profile</h2></div>
      <div className="profile-card">
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div className="profile-av">{initials}</div>
          <div>
            <div className="profile-name">{userName}</div>
            <div className="profile-meta">{user?.email || user?.phone || "No contact info"}</div>
          </div>
        </div>
        <div className="profile-stats">
          <div className="pstat"><div className="pstat-val">{myReviews.length}</div><div className="pstat-label">Reviews Written</div></div>
          <div className="pstat"><div className="pstat-val">{searches.length}</div><div className="pstat-label">Searches Made</div></div>
          <div className="pstat"><div className="pstat-val">{vendors.length}</div><div className="pstat-label">Vendors Listed</div></div>
        </div>
        {myReviews.length > 0 && (
          <>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 700, color: "var(--text)" }}>Your Recent Reviews</div>
            <div className="myrev-list">
              {[...myReviews].reverse().slice(0, 3).map((r, i) => {
                const v = vendors.find(v => String(v.id) === String(r.vendorId));
                return (
                  <div key={i} className="myrev-card">
                    <div className="myrev-top"><span className="myrev-vendor">{v?.name || "Unknown"}</span><span className="myrev-date">{r.date}</span></div>
                    <div className="myrev-stars">{[1,2,3,4,5].map(s => <StarIcon key={s} filled={s <= r.rating} size={13} />)}</div>
                    <div className="myrev-text">{r.text}</div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}