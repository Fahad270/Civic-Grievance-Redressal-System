import Card from "../components/Card";  // ✅ AI FIX!!!!!
import { useEffect, useState } from "react";
import axios from "axios";
export default function Feed() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/grievances")
      .then(res => setIssues(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleUpvote = async (id) => {
  try {
    await axios.put(`http://localhost:5000/api/grievances/${id}/upvote`);
    
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="feed-container">
      <h2 className="feed-title">All Issues</h2>

      <div className="feed-grid">
        {issues.map((item) => (
          <div key={item._id} className="card">
            {item.imageurl && (<img src={item.imageurl} alt="issue" className="feed-img"/>)}
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>Status: {item.status}</p>
            <p>Upvotes: {item.upvotes}</p>

            <button
              className="btn"
              onClick={() => handleUpvote(item._id)}
            >
              👍 Upvote
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}