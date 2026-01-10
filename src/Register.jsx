

import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleRegister() {
    fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.text())
      .then((data) => {
        alert(data);
        navigate("/");
      });
  }

  return (
    <div className="page">
      <div className="login-box">
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default Register;
