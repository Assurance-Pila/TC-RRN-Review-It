/* src/pages/vendor/VendorDashboard.jsx */
import { useState, useEffect } from "react";
import { useNavigate }         from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import DashNav               from "../DashNav.jsx";
import VendorOverviewPage    from "../VendorOverviewPage.jsx";
import VendorFeedPage        from "../VendorFeedPage.jsx";
import VendorReviewsPage     from "../VendorReviewsPage.jsx";
import VendorMyProfilePage   from "../VendorMyProfilePage.jsx";
import VendorEditProfilePage from "../VendorEditProfilePage.jsx";
import VendorBusinessCardPage  from "../VendorBusinessCardPage.jsx";
import VendorVerificationPage  from "../VendorVerificationPage.jsx";
import VendorDashboardPage      from "./VendorDashboardPage.jsx";
import VendorExplorePage        from "./VendorExplorePage.jsx";
import VendorBoostVisibilityPage from "./VendorBoostVisibilityPage.jsx";
import "../../styles/vendordash.css";

export default function VendorDashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth(); // Get user and signOut from Supabase Auth
  const [page,       setPage]       = useState("Home");
  const [vendor,     setVendor]     = useState(null);
  const [allVendors, setAllVendors] = useState([]);
  const [reviews,    setReviews]    = useState([]);
  const [searches,   setSearches]   = useState([]);
 
  const reload = () => {
    const vendors = JSON.parse(localStorage.getItem("vendors") || "[]");
    const allRevs = JSON.parse(localStorage.getItem("reviews") || "[]");
    const srch    = JSON.parse(localStorage.getItem("userSearches") || "[]");
    
    // Match vendor by email using Supabase user
    const mine    = vendors.find(v => v.email === user?.email) || null;
    
    setVendor(mine);
    setAllVendors(vendors);
    setReviews(mine ? allRevs.filter(r => String(r.vendorId) === String(mine.id)) : []);
    setSearches(srch);
  };
 
  useEffect(() => { reload(); }, [user]); // Re-run when user changes

  const businessName = vendor?.businessName || vendor?.name || "Business";
  const initials     = businessName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  const handleNav    = (key) => setPage(key);
  const handleLogout = async () => { 
    await signOut(); // Use Supabase signOut
    navigate("/login"); 
  };

  const pages = {
    Home:            <VendorDashboardPage       vendor={vendor} reviews={reviews} onNavigate={handleNav} />,
    Explore:         <VendorExplorePage          vendors={allVendors} searches={searches} />,
    MyProfile:       <VendorMyProfilePage        vendor={vendor} reviews={reviews} onSaved={reload} />,
    BoostVisibility: <VendorBoostVisibilityPage  vendor={vendor} reviews={reviews} onNavigate={handleNav} />,
  };

  return (
    <div className="vd-root">
      <DashNav
        role="vendor"
        page={page}
        userName={businessName}
        initials={initials}
        vendor={vendor}
        onNavigate={handleNav}
        onLogout={handleLogout}
      />
      <div className="vd-main">
        <main className="vd-body">
          {pages[page] ?? pages["Home"]}
        </main>
      </div>
    </div>
  );
}