import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import "../styles/auth.css";

const Register = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1 className="auth-title">Register</h1>

        <div className="row">
          <div className="half">
            <Input label="First Name" placeholder="John" />
          </div>
          <div className="half">
            <Input label="Last Name" placeholder="Doe" />
          </div>
        </div>
        <Input label="Social Media URL" placeholder="TikTok/IG/WhatsApp URL" />


        <Input label="E-mail/Whatsapp Number" placeholder="Enter your email or Contact" />
        <Input label="Password" type="password" placeholder="********" />
        <Input label="Confirm Password" type="password" placeholder="********" />

        <Button text="Create Account" />

        <p className="center-text">
          Already have an account?{" "}
          <Link to="/" className="link-text">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;