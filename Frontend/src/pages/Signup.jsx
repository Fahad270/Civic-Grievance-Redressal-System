import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase"; 
import axios from "axios";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("citizen");

  const navigate = useNavigate();

  // 🔥 Firebase Google Signup code paste here
  const handleGoogleSignup = () => {
  };

  const handleSignup = () => {
    if (!email || !password) {
      alert("All fields required");
      return;
    }
    
  createUserWithEmailAndPassword(auth, email, password)
  .then( async(userCredential) => {
    const user = userCredential.user;    
    await axios.post("http://localhost:5000/api/users", {
    uid: user.uid,
    email: user.email,
    role: role
  });
    alert("Account created!");
    navigate("/login");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  let msg = "Signup failed";

  if (error.code === "auth/email-already-in-use") {
    msg = "Email already registered. Please login.";
  } else if (error.code === "auth/weak-password") {
    msg = "Password should be at least 6 characters.";
  }
  alert(msg);
  });
    

  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="sub-text">Start reporting issues</p>

        <input
          className="input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* ✅ ROLE DROPDOWN */}
        <select
          className="input"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="citizen">Citizen</option>
          <option value="admin">GRO (Admin)</option>
        </select>

        <button className="btn full-btn" onClick={handleSignup}>
          Signup
        </button>

        <p className="link-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
        
        <p style={{ textAlign: "center", margin: "10px 0" }}>OR</p>
        <button className="btn full-btn" onClick={handleGoogleSignup}>
          Signup with Google 🚀
        </button>
      </div>
    </div>
  );
}