import { useEffect, useState } from "react";
import { fetchDummyData } from "../services/api";

export default function Feed() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchDummyData().then(setData);
  }, []);

  return (
    <div className="container">
      <h2>Public Issues</h2>
      {data.slice(0, 5).map((item) => (
        <div key={item.id} className="card">
          <h3>{item.title}</h3>
        </div>
      ))}
    </div>
  );
}