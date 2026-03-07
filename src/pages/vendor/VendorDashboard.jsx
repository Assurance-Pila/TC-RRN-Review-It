/* src/components/vendor/VendorDashboard.jsx */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import VendorSidebar          from "../../components/vendor/VendorSidebar.jsx";
import VendorTopbar           from "../../components/vendor/VendorTopbar.jsx";
import VendorOverviewPage     from "../../pages/VendorOverviewPage.jsx";
import VendorFeedPage         from "../VendorFeedPage.jsx";
import VendorReviewsPage      from "../VendorReviewsPage.jsx";
import VendorMyProfilePage    from "../VendorMyProfilePage.jsx";
import VendorEditProfilePage  from "../VendorEditProfilePage.jsx";
import VendorBusinessCardPage from "../../pages/VendorBusinessCardPage.jsx";
import VendorVerificationPage from "../../pages/VendorVerificationPage.jsx";

import "../../styles/vendordash.css";

export default function VendorDashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page,        setPage]        = useState("Overview");
  const [vendor,      setVendor]      = useState(null);
  const [allVendors,  setAllVendors]  = useState([]);
  const [reviews,     setReviews]     = useState([]);
  const [searches,    setSearches]    = useState([]);

  const reload = () => {
    const user    = JSON.parse(localStorage.getItem("user")    || "null");
    const vendors = JSON.parse(localStorage.getItem("vendors") || "[]");
    const allRevs = JSON.parse(localStorage.getItem("reviews") || "[]");
    const srch    = JSON.parse(localStorage.getItem("userSearches") || "[]");

    const mine = vendors.find(v =>
      String(v.id) === String(user?.id) ||
      (v.name && v.name === (user?.fullName || user?.name))
    ) || null;

    setVendor(mine);
    setAllVendors(vendors);
    setReviews(mine ? allRevs.filter(r => String(r.vendorId) === String(mine.id)) : []);
    setSearches(srch);
  };

  useEffect(() => { reload(); }, []);

  const businessName = vendor?.name || "Business";
  const initials     = businessName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  const handleNav    = (key) => { setPage(key); setSidebarOpen(false); };
  const handleLogout = ()    => { localStorage.removeItem("user"); navigate("/login"); };

  const pages = {
    Overview:     <VendorOverviewPage     vendor={vendor} reviews={reviews} onNavigate={handleNav} />,
    Feed:         <VendorFeedPage         vendors={allVendors} searches={searches} onViewVendor={() => {}} />,
    MyReviews:    <VendorReviewsPage      reviews={reviews} />,
    MyProfile:    <VendorMyProfilePage    vendor={vendor} reviews={reviews} />,
    EditProfile:  <VendorEditProfilePage  vendor={vendor} onSaved={reload} />,
    BusinessCard: <VendorBusinessCardPage vendor={vendor} />,
    Verification: <VendorVerificationPage vendor={vendor} reviews={reviews} onNavigate={handleNav} />,
  };

  return (
    <div className="vd-root">
      {sidebarOpen && <div className="vd-overlay" onClick={() => setSidebarOpen(false)} />}

      <VendorSidebar
        page={page}
        isOpen={sidebarOpen}
        onNavigate={handleNav}
        onLogout={handleLogout}
      />

      <div className="vd-main">
        <VendorTopbar
          businessName={businessName}
          initials={initials}
          onToggleSidebar={() => setSidebarOpen(o => !o)}
        />
        <main className="vd-body">{pages[page]}</main>
      </div>
    </div>
  );
}