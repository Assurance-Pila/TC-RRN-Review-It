import { useState } from "react";
import "../../styles/layout.css";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import StatCard from "../../components/cards/StatCard";

const AdminDashboard = () => {
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
        links={["Dashboard", "Manage Vendors", "Reports", "Logout"]}
        isOpen={isOpen}
      />

      <div className="dashboard-content">
        <Topbar
          title="Admin Dashboard"
          toggleSidebar={() => setIsOpen(!isOpen)}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Users" value="540" />
          <StatCard title="Total Vendors" value="120" />
          <StatCard title="Reports Pending" value="3" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;