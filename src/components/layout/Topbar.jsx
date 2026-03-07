/* src/components/layout/Topbar.jsx */
import { AlertIco, SearchIco } from "../icons.jsx";

export default function Topbar({ title, initials, userName, scamCount, query, category, cats, onToggleSidebar, onScamClick, onSearchChange, onCategoryChange }) {
  return (
    <div className="ud-topbar-area">
      <header className="ud-topbar">
        <button className="ud-hamburger" onClick={onToggleSidebar} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
        <span className="ud-topbar-title">
          Welcome, <strong>{(userName || "User").split(" ")[0]}</strong>
        </span>
        <div className="ud-topbar-right">
          {scamCount > 0 && (
            <button className="ud-bell" onClick={onScamClick} title={`${scamCount} scam alert(s)`}>
              <AlertIco />
              <span className="ud-bell-dot">{scamCount}</span>
            </button>
          )}
          <div className="ud-topbar-av">{initials}</div>
        </div>
      </header>
      <div className="ud-search-sticky">
        <div className="ud-search-box">
          <SearchIco />
          <input value={query} onChange={e => onSearchChange(e.target.value)} placeholder="Search by business name, Instagram, TikTok, WhatsApp…" />
          {query && (
            <button className="ud-search-clear" onClick={() => onSearchChange("")}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          )}
        </div>
        <div className="ud-pills">
          {cats.map(c => (
            <button key={c} className={`ud-pill ${category === c ? "active" : ""}`} onClick={() => onCategoryChange(c)}>{c}</button>
          ))}
        </div>
      </div>
    </div>
  );
}