export default function Card({ data }) {
  return (
    <div className="card">
      <h3>{data.title}</h3>
      <p>Upvotes: {data.upvotes}</p>
      <button>👍 Upvote</button>
    </div>
  );
}