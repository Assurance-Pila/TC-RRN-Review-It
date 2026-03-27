/* src/pages/SearchPage.jsx */
import VendorCard from "../components/cards/VendorCard.jsx";
import { SearchIco } from "../components/icons.jsx";

export default function SearchPage({ query, filtered, onViewVendor }) {
  return (
    <div className="ud-section">
      <div className="ud-section-head">
        <h2>{query ? <>Results for <em style={{ fontStyle: "normal", color: "var(--teal)" }}>"{query}"</em></> : "Search Vendors"}</h2>
        {filtered.length > 0 && <span className="ud-badge">{filtered.length} found</span>}
      </div>
      {!query
        ? <div className="ud-empty"><SearchIco /><p>Start searching</p><span>Type a vendor name, category, phone, @Instagram, @TikTok or WhatsApp number above.</span></div>
        : filtered.length === 0
        ? <div className="ud-empty"><SearchIco /><p>No results for "{query}"</p><span>Try a different name, category, phone or social handle.</span></div>
        : <div className="ud-grid">{filtered.map((v, i) => <VendorCard key={i} vendor={v} onView={onViewVendor} />)}</div>
      }
    </div>
  );
}