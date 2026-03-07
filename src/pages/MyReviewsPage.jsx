import { ReviewIco, StarIcon } from "../components/icons.jsx";

export default function MyReviewsPage({ myReviews, vendors, onViewVendor, onWriteReview }) {
  if (myReviews.length === 0) return (
    <div className="ud-section">
      <div className="ud-section-head">
        <h2>My Reviews</h2>
        <span className="ud-badge">0 written</span>
      </div>
      <div className="ud-empty">
        <ReviewIco />
        <p>No reviews yet</p>
        <span>Start by reviewing a vendor you've bought from.</span>
        <button className="vcard-btn" style={{ width: "auto", padding: "8px 18px", marginTop: 4 }} onClick={onWriteReview}>
          Write a Review
        </button>
      </div>
    </div>
  );

  return (
    <div className="ud-section">
      <div className="ud-section-head">
        <h2>My Reviews</h2>
        <span className="ud-badge">{myReviews.length} written</span>
      </div>
      <div className="myrev-list">
        {[...myReviews].reverse().map((r, i) => {
          const v = vendors.find(v => String(v.id) === String(r.vendorId));
          return (
            <div key={i} className="myrev-card">
              <div className="myrev-top">
                <span
                  className="myrev-vendor"
                  style={{ cursor: v ? "pointer" : "default" }}
                  onClick={() => v && onViewVendor(v)}
                >
                  {v?.name || "Unknown Vendor"}
                </span>
                <span className="myrev-date">{r.date}</span>
              </div>
              <div className="myrev-stars">
                {[1,2,3,4,5].map(s => <StarIcon key={s} filled={s <= r.rating} size={14} />)}
              </div>
              <div className="myrev-text">{r.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}