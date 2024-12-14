import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style/sign.css";
import axios from "axios";
import pass from "../assets/password.png";
import emaill from "../assets/email.png";
import nest from "../assets/nest_marketing.svg";

function SignUp() {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      console.log("Attempting to sign up...");
      const response = await axios.post("http://localhost:5000/api/signup", {
        email,
        password,
        address,
        postalCode,
        city,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 5000
      });
      
      console.log("Server response:", response);
      
      if (response.data.success) {
        console.log("Signed up successfully:", response.data);
        navigate("/login");
      } else {
        const errorMsg = response.data.message || "Signup failed - please try again";
        console.error("Signup failed with message:", errorMsg);
        setErrorMessage(errorMsg);
      }
    } catch (err) {
      console.error("Full error object:", err);
      
      if (err.code === 'ECONNREFUSED') {
        setErrorMessage('Unable to connect to the server. Please check if the backend is running.');
        return;
      }

      let errorMessage = "An error occurred during signup";
      
      if (err.response) {
        errorMessage = typeof err.response.data === 'string' 
          ? err.response.data 
          : err.response.data?.message || `Server error: ${err.response.status}`;
      } else if (err.request) {
        errorMessage = "No response received from server";
      } else {
        errorMessage = err.message || "Unknown error occurred";
      }

      setErrorMessage(`Signup failed: ${errorMessage}`);
      console.error("Signup error details:", {
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        message: err.message
      });
    }
  };

  return (
    <div className="sign">
      <div className="left">
        <img src={nest} alt="Nest Marketing" />
      </div>
      <div className="right">
        <h2 className="welcome-title">Welcome to Nest Market</h2>
        <p className="welcome-subtitle">You chose the future</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <i>
              <img src={emaill} alt="Email Icon" />
            </i>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i>
              <img src={emaill} alt="Address Icon" />
            </i>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i>
              <img src={emaill} alt="Postal Code Icon" />
            </i>
            <input
              type="text"
              placeholder="Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i>
              <img src={emaill} alt="City Icon" />
            </i>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i>
              <img src={pass} alt="Password Icon" />
            </i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i>
              <img src={pass} alt="Confirm Password Icon" />
            </i>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <input type="submit" value="Sign Up" className="submit-btn" />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          
          <div className="auth-links">
            <p className="login-text">
              Already have an account? <Link to="/login" className="login-link">Login here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;