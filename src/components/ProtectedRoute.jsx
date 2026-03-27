import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../utils/database";

function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '16px',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // For now, we'll check the user's role from metadata
  // Later we can fetch from database if needed
  const userRole = user.user_metadata?.role || 'user';

  if (userRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;