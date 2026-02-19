import { useState } from "react";
import "../../styles/layout.css";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import StatCard from "../../components/cards/StatCard";

const VendorDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dashboard-container">

      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <Sidebar
        links={["Dashboard", "My Profile", "Reviews", "Verification", "Logout"]}
        isOpen={isOpen}
      />

      <div className="dashboard-content">
        <Topbar
          title="Vendor Dashboard"
          toggleSidebar={() => setIsOpen(!isOpen)}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Average Rating" value="4.8" />
          <StatCard title="Total Reviews" value="160" />
          <StatCard title="Profile Views" value="2,340" />
        </div>

      </div>
    </div>
  );
};

export default VendorDashboard;