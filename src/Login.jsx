import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setIsLoggedIn }) {   // ✅ RECEIVE PROP
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert("Username and password required");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      if (!res.ok) {
        alert("Invalid username or password");
        return;
      }

      // ✅ persist login
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username.trim());

      // 🔥 THIS LINE FIXES EVERYTHING
      setIsLoggedIn(true);

      // 🔥 navigate after state update
      navigate("/dashboard", { replace: true });

    } catch (err) {
      alert("Backend not reachable");
      console.error(err);
    }
  };

  return (
    <div className="page">
      <div className="login-box">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
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

          <button type="submit">Login</button>
        </form>

        <p className="register-text">
          New user? <span onClick={() => navigate("/signup")}>Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
