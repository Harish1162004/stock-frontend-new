import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./signup.css"; // ✅ CSS added

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      if (response.ok) {
        setMessage("Signup successful ✅");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessage("Signup failed ❌");
      }
    } catch (error) {
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
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
