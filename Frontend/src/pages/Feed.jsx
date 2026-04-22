import Card from "../components/Card";

export default function Feed() {
  const dummy = [
    { title: "No Water", upvotes: 5 },
    { title: "Road Broken", upvotes: 10 },
  ];

  return (
    <div className="container">
      <h2>Public Issues</h2>
      {dummy.map((item, i) => (
        <Card key={i} data={item} />
      ))}
    </div>
  );
}