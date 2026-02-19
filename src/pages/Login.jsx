import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import "../styles/auth.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Temporary demo authentication logic
    if (formData.role === "user") {
      navigate("/user");
    } else if (formData.role === "vendor") {
      navigate("/vendor");
    } else if (formData.role === "admin") {
      navigate("/admin");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1 className="auth-title">Login</h1>

        <form onSubmit={handleSubmit}>

          <Input
            label="E-mail"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          {/* Role selection (temporary for demo) */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="role-select"
          >
            <option value="user">User</option>
            <option value="vendor">Vendor</option>
            <option value="admin">Admin</option>
          </select>

          <div className="link-text">Forgot Password?</div>

          <Button text="Login" type="submit" />

        </form>

        <div className="small-muted">or login with</div>

        <button className="google-btn" type="button">
          <span className="google-icon">G</span>
          Login with Google
        </button>

        <p className="center-text">
          Don't have an account?{" "}
          <Link to="/register" className="link-text">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;