import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5000/api/grievances");
      setIssues(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      <div className="dashboard-grid">

        <div className="dash-card">
          <h3>Total Issues</h3>
          <p>{issues.length}</p>
        </div>

        <div className="dash-card">
          <h3>Resolved</h3>
          <p>{issues.filter(i => i.status === "Completed").length}</p>
        </div>

        <div className="dash-card">
          <h3>Pending</h3>
          <p>{issues.filter(i => i.status === "Pending").length}</p>
        </div>

        <div className="dash-card">
          <h3>In Progress</h3>
          <p>{issues.filter(i => i.status === "Working").length}</p>
        </div>

      </div>
    </div>
  );
}