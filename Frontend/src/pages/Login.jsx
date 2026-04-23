import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("citizen");
  const navigate = useNavigate();

  
  // 🔥 Firebase Google Sign-In code paste here later
  const handleGoogleLogin = () => {
    const auth = getAuth();
  
  };
  
  const handleLogin = () => {
    if (!email || !password) {
      alert("All fields required");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
    const user = userCredential.user;
    console.log("User/Accnt created!!!");
    const res = await axios.get(
    `http://localhost:5000/api/users/${user.uid}`
      );
if (!res.data) {
  alert("User not found in DB. Signup first.");
  return;
}
const role = res.data.role;
  localStorage.setItem(
  "user",
  JSON.stringify({
    uid: user.uid,
    role: role
  })
);
      
      
    if (role === "admin") {
      navigate("/dashboard");
    }else {
    navigate("/home");
      }    })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

  let msg = "Something went wrong";

  if (error.code === "auth/user-not-found") {
    msg = "No account found. Please signup.";
  } else if (error.code === "auth/wrong-password") {
    msg = "Incorrect password.";
  } else if (error.code === "auth/invalid-email") {
    msg = "Invalid email format.";
  }

  alert(msg);
});
    
    
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="sub-text">Login to continue</p>

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

        {/* ROLE DROPDOWN */}
        <select
          className="input"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="citizen">Citizen</option>
          <option value="admin">GRO (Admin)</option>
        </select>

        <button className="btn full-btn" onClick={handleLogin}>
          Login
        </button>
        <p className="link-text">
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
        <p style={{ textAlign: "center", margin: "10px 0" }}>OR</p>
        <button className="btn full-btn" onClick={handleGoogleLogin}>
       Login with Google 🚀
      </button>
      
      </div>
    </div>
  );
}