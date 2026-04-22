export default function Card({ data }) {
  const handleUpvote = () => {
  alert("Upvoted!");
};
<button onClick={handleUpvote}>👍 Upvote</button>
  return (
    <div className="card">
      <h3>{data.title}</h3>
      <p>Upvotes: {data.upvotes}</p>
      <button>👍 Upvote</button>
    </div>
  );
}