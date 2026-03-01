import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUpPage from "./pages/SignUpPage";
import Register from "./pages/Register";
import VendorsPage from "./pages/VendorsPage";
import UserDashboard from "./pages/user/UserDashboard";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public */}
        <Route path="/"             element={<LandingPage />} />
        <Route path="/login"        element={<Login />} />
        <Route path="/SignUpPage"       element={<SignUpPage />} />
        <Route path="/vendor-signup" element={<Register />} />
        <Route path="/vendors"      element={<VendorsPage />} />

        {/* Protected Routes */}
        <Route path="/user"   element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} />
        <Route path="/vendor" element={<ProtectedRoute role="vendor"><VendorDashboard /></ProtectedRoute>} />
        <Route path="/admin"  element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />

      </Routes>
    </Router>
  );
}

export default App;