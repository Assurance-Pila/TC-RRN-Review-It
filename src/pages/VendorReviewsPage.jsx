/* src/components/vendor/pages/VendorReviewsPage.jsx */
import { Stars } from "../components/icons.jsx";

export default function VendorReviewsPage({ reviews }) {
  const sorted = [...reviews].reverse();
  return (
    <div className="vd-section">
      <div className="vd-section-head">
        <h2>My Reviews</h2>
        <span className="vd-badge">{reviews.length} total</span>
      </div>
      {sorted.length === 0 ? (
        <div className="vd-empty">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5"/><path d="M17.5 3.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 8.5-8.5z"/></svg>
          <p>No reviews yet</p>
          <span>Share your profile link to start collecting reviews from buyers.</span>
        </div>
      ) : (
        <div className="vd-rev-list">
          {sorted.map((r, i) => (
            <div key={i} className="vd-rev-card">
              <div className="vd-rev-top">
                <span className="vd-rev-author">{r.reviewerName || "Anonymous"}</span>
                <span className="vd-rev-date">{r.date}</span>
              </div>
              <Stars rating={r.rating} size={13} />
              <div className="vd-rev-text">{r.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}