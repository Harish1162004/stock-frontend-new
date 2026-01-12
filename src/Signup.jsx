import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./signup.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_URL;

  const handleSignup = async (e) => {
    e.preventDefault();

    // ✅ frontend validation
    if (!username.trim() || !password.trim()) {
      setMessage("Username and password are required ❌");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      const text = await response.text(); // 👈 read backend message

      if (response.ok) {
        setMessage(text + " ✅"); // "User Registered Successfully"
        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessage(text + " ❌"); // "Username already exists"
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error ❌");
    }
  };

  return (
    <div className="page">
      <div className="signup-box">
        <h2>Create Account</h2>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Register</button>
        </form>

        <p className="signup-link">
          Already have an account? <Link to="/">Login</Link>
        </p>

        <p style={{ textAlign: "center", marginTop: "10px" }}>{message}</p>
      </div>
    </div>
  );
}

export default Signup;
