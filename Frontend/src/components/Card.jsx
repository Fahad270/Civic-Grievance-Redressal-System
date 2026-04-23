export default function Card({ data }) {
  const handleUpvote = () => {
    alert("Upvoted!");
  };

  return (
    <div className="card">
      <h3>{data.title}</h3>

      <p>Upvotes: {data.upvotes || 0}</p>

      <button onClick={handleUpvote} className="upvote-btn">
        👍 Upvote
      </button>
    </div>
  );
}