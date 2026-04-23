import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Raise from "./pages/Raise";
import Feed from "./pages/Feed";
import Dashboard from "./pages/Dashboard";
import News from "./pages/News";
import MapView from "./pages/MapView";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import AdminIssues from "./pages/AdminIssues";
import "./App.css";

// 🔐 AUTH CHECK
const isLoggedIn = () => {
  return localStorage.getItem("user");
};

// 🔐 ADMIN CHECK
const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user.role === "admin";
};

// 🔐 PRIVATE ROUTE (ONLY LOGIN CHECK)
const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

// 🔐 ADMIN ONLY ROUTE
const AdminRoute = ({ children }) => {
  return isAdmin() ? children : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>

      {/* NAVBAR FOR ALL LOGGED IN USERS */}
      {isLoggedIn() && <Navbar />}

      <Routes>

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ================= SHARED CORE APP ================= */}

        <Route path="/news" element={<PrivateRoute><News /></PrivateRoute>} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route  path="/home" element={<PrivateRoute><Home /></PrivateRoute>
  }
/>
        
        <Route
          path="/feed"
          element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          }
        />

        <Route
          path="/news"
          element={
            <PrivateRoute>
              <div className="page">News Page (Coming Soon)</div>
            </PrivateRoute>
          }
        />

        {/* USER ACTION */}
        <Route
          path="/raise"
          element={
            <PrivateRoute>
              <Raise />
            </PrivateRoute>
          }
        />

        {/* ================= ADMIN FEATURES ================= */}

        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/issues"
          element={
            <AdminRoute>
              <AdminIssues />
            </AdminRoute>
          }
        />

        <Route
          path="/map"
          element={
            <AdminRoute>
              <MapView />
            </AdminRoute>
          }
        />

        {/* DEFAULT */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;