import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminIssues() {
  const [issues, setIssues] = useState([]);

  // ✅ FETCH FROM BACKEND
  const fetchIssues = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/grievances");
      setIssues(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  // ✅ UPDATE STATUS
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/grievances/${id}/status`, {
        status: newStatus,
      });

      fetchIssues(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ DELETE
  const deleteIssue = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/grievances/${id}`);
      fetchIssues();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Manage Civic Issues</h2>

      <div className="admin-grid">
        {issues.map((issue) => (
          <div key={issue._id} className="admin-card">

            <img
              src={issue.imageurl}
              alt="issue"
              className="admin-img"
              onClick={() => window.open(issue.imageurl, "_blank")}
            />

            <div className="admin-content">

              <h3>{issue.title}</h3>
              <p>{issue.description}</p>

              <div className="meta">
                📍 {issue.location?.lat}, {issue.location?.lng} | 📅{" "}
                {new Date(issue.date).toLocaleDateString()}
              </div>

              {issue.proposal && (
                <div className="proposal">💡 {issue.proposal}</div>
              )}

              {/* STATUS */}
              <select
                className={`status ${issue.status.toLowerCase()}`}
                value={issue.status}
                onChange={(e) =>
                  updateStatus(issue._id, e.target.value)
                }
              >
                <option value="Pending">Not Started</option>
                <option value="Working">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <button
                onClick={() => deleteIssue(issue._id)}
                className="delete-btn"
              >
                Delete Issue
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}