import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/grievances")
      .then(res => setIssues(res.data))
      .catch(err => console.log(err));
  }, []);

  const total = issues.length;
  const pending = issues.filter(i => i.status === "Pending").length;
  const working = issues.filter(i => i.status === "Working").length;
  const completed = issues.filter(i => i.status === "Completed").length;

  return (
    <div className="dashboard-container">

      <h2 className="dashboard-title">Admin Dashboard</h2>

      <div className="dashboard-grid">

        <div className="dashboard-card card-total">
          <h3>Total Issues</h3>
          <div className="dashboard-number">{total}</div>
        </div>

        <div className="dashboard-card card-pending">
          <h3>Pending</h3>
          <div className="dashboard-number">{pending}</div>
        </div>

        <div className="dashboard-card card-working">
          <h3>In Progress</h3>
          <div className="dashboard-number">{working}</div>
        </div>

        <div className="dashboard-card card-completed">
          <h3>Completed</h3>
          <div className="dashboard-number">{completed}</div>
        </div>

      </div>

    </div>
  );
}