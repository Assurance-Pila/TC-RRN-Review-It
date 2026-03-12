/* src/pages/admin/AdminDashboard.jsx */
import { useState, useEffect } from "react";
import { useNavigate }         from "react-router-dom";
import DashNav                 from "../../pages/DashNav.jsx";
import "../../styles/userdash.css";

/* ── Sub-page components ── */
function VendorsList({ vendors, onToggleScam, onToggleVerified }) {
  if (!vendors.length) return (
    <div className="ud-empty">
      <p>No vendors yet</p>
      <span>Vendors will appear here once they register.</span>
    </div>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {vendors.map(v => (
        <div key={v.id} style={{ background: "#fff", border: "1px solid #e0ece8", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#1a2e28" }}>{v.name}</div>
            <div style={{ fontSize: 12, color: "#5a7068" }}>{v.category} · {v.phone}</div>
            <div style={{ fontSize: 11, color: "#8aaa9e", marginTop: 2 }}>
              {v.platformVerified ? "✓ Platform Verified" : "Not platform verified"} ·{" "}
              {v.communityVerified ? "✓ Community Verified" : "Not community verified"} ·{" "}
              {v.scam ? "SCAM FLAGGED" : "Clean"}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              onClick={() => onToggleVerified(v.id)}
              style={{ padding: "6px 14px", borderRadius: 7, border: "1.5px solid #006D5B", background: v.platformVerified ? "#006D5B" : "transparent", color: v.platformVerified ? "#fff" : "#006D5B", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
            >
              {v.platformVerified ? "Revoke Verified" : "Mark Verified"}
            </button>
            <button
              onClick={() => onToggleScam(v.id)}
              style={{ padding: "6px 14px", borderRadius: 7, border: "1.5px solid #dc2626", background: v.scam ? "#dc2626" : "transparent", color: v.scam ? "#fff" : "#dc2626", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
            >
              {v.scam ? "Clear Scam Flag" : "Flag as Scam"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function UsersList({ users }) {
  if (!users.length) return (
    <div className="ud-empty"><p>No users yet</p><span>Users will appear here once they register.</span></div>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {users.map(u => (
        <div key={u.id} style={{ background: "#fff", border: "1px solid #e0ece8", borderRadius: 12, padding: "14px 18px" }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: "#1a2e28" }}>{u.fullName || u.name}</div>
          <div style={{ fontSize: 12, color: "#5a7068" }}>{u.email} · {u.phone}</div>
        </div>
      ))}
    </div>
  );
}

function ScamAlertsList({ vendors, onClearScam }) {
  const flagged = vendors.filter(v => v.scam);
  if (!flagged.length) return (
    <div className="ud-empty"><p>No scam alerts</p><span>Flagged vendors will appear here.</span></div>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {flagged.map(v => (
        <div key={v.id} style={{ background: "#fff9f9", border: "1px solid #fecaca", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#991b1b" }}>🚨 {v.name}</div>
            <div style={{ fontSize: 12, color: "#5a7068" }}>{v.category} · {v.socialMediaUrl}</div>
          </div>
          <button
            onClick={() => onClearScam(v.id)}
            style={{ padding: "6px 14px", borderRadius: 7, border: "1.5px solid #dc2626", background: "transparent", color: "#dc2626", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
          >
            Clear Flag
          </button>
        </div>
      ))}
    </div>
  );
}

function PendingVerifications({ vendors, onApprove }) {
  const pending = vendors.filter(v => !v.platformVerified && !v.scam);
  if (!pending.length) return (
    <div className="ud-empty"><p>No pending verifications</p><span>Unverified vendors will appear here.</span></div>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {pending.map(v => (
        <div key={v.id} style={{ background: "#fff", border: "1px solid #e0ece8", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#1a2e28" }}>{v.name}</div>
            <div style={{ fontSize: 12, color: "#5a7068" }}>{v.category} · {v.email}</div>
            <div style={{ fontSize: 11, color: "#8aaa9e", marginTop: 2 }}>{v.reviews || 0} reviews · avg {(v.rating || 0).toFixed(1)}★</div>
          </div>
          <button
            onClick={() => onApprove(v.id)}
            style={{ padding: "6px 14px", borderRadius: 7, border: "none", background: "#006D5B", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
          >
            Approve Verified
          </button>
        </div>
      ))}
    </div>
  );
}

const PAGE_LABELS = {
  Vendors:       "All Vendors",
  Users:         "Registered Users",
  ScamAlerts:    "Scam Alerts",
  Verifications: "Pending Verifications",
};

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [page,    setPage]    = useState("Vendors");
  const [vendors, setVendors] = useState([]);
  const [users,   setUsers]   = useState([]);

  const reload = () => {
    setVendors(JSON.parse(localStorage.getItem("vendors") || "[]"));
    setUsers(  JSON.parse(localStorage.getItem("users")   || "[]"));
  };
  useEffect(() => { reload(); }, []);

  const saveVendors = (updated) => {
    localStorage.setItem("vendors", JSON.stringify(updated));
    setVendors(updated);
  };

  const toggleScam      = (id) => saveVendors(vendors.map(v => v.id === id ? { ...v, scam: !v.scam } : v));
  const toggleVerified  = (id) => saveVendors(vendors.map(v => v.id === id ? { ...v, platformVerified: !v.platformVerified } : v));
  const clearScam       = (id) => saveVendors(vendors.map(v => v.id === id ? { ...v, scam: false } : v));
  const approveVerified = (id) => saveVendors(vendors.map(v => v.id === id ? { ...v, platformVerified: true } : v));

  const handleLogout = () => { localStorage.removeItem("user"); navigate("/login"); };

  const scamCount = vendors.filter(v => v.scam).length;

  const pages = {
    Vendors:       <VendorsList       vendors={vendors} onToggleScam={toggleScam} onToggleVerified={toggleVerified} />,
    Users:         <UsersList         users={users} />,
    ScamAlerts:    <ScamAlertsList    vendors={vendors} onClearScam={clearScam} />,
    Verifications: <PendingVerifications vendors={vendors} onApprove={approveVerified} />,
  };

  return (
    <div className="ud-root">
      <DashNav
        role="admin"
        page={page}
        userName="Admin"
        initials="AD"
        scamCount={scamCount}
        onNavigate={setPage}
        onLogout={handleLogout}
      />
      <div className="ud-main">
        <div style={{ padding: "22px 24px 60px", display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="ud-section-head">
            <h2 style={{ fontFamily: "Sora, sans-serif", fontSize: 18, fontWeight: 800, color: "#1a2e28" }}>
              {PAGE_LABELS[page]}
            </h2>
            <span className="ud-badge">
              {page === "Vendors"       && `${vendors.length} total`}
              {page === "Users"         && `${users.length} total`}
              {page === "ScamAlerts"    && `${scamCount} flagged`}
              {page === "Verifications" && `${vendors.filter(v => !v.platformVerified && !v.scam).length} pending`}
            </span>
          </div>
          {pages[page]}
        </div>
      </div>
    </div>
  );
}