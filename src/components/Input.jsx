import { useState } from "react";
import "../styles/auth.css";

const Input = ({ label, type = "text", placeholder }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="input-group">
      <label className="input-label">{label}</label>

      <div className="relative">
        <input
          type={type === "password" ? (show ? "text" : "password") : type}
          placeholder={placeholder}
          className="input-field"
        />

        {type === "password" && (
          <span
            className="password-toggle"
            onClick={() => setShow(!show)}
          >
            
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;