import { useState } from "react";
import "../../styles/layout.css";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import VendorCard from "../../components/cards/VendorCard";
import FloatingActionButton from "../../components/FloatingActionButton";

const UserDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const vendors = [
    {
      name: "Elite Fashion",
      handle: "elite_fashion",
      rating: 4.8,
      reviews: 160,
      communityVerified: true,
      platformVerified: true
    }
  ];

  return (
    <div className="dashboard-container">

      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <Sidebar
        links={["Home", "Search", "My Reviews", "Scam Alerts", "Logout"]}
        isOpen={isOpen}
        closeSidebar={() => setIsOpen(false)}
      />

      <div className="dashboard-content">
        <Topbar title="User Dashboard" toggleSidebar={toggleSidebar} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {vendors.map((vendor, index) => (
            <VendorCard key={index} vendor={vendor} />
          ))}
        </div>

        <FloatingActionButton />
      </div>
    </div>
  );
};

export default UserDashboard;