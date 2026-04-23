import { useEffect, useState } from "react";
import axios from "axios";

export default function News() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
"https://newsapi.org/v2/everything?q=india&sortBy=publishedAt&language=en&pageSize=12&apiKey=4dae9a3bb4d04f6187bde0d61f5bdfca");

        console.log(res.data); // 👈 DEBUG check

        setArticles(res.data.articles || []);
      } catch (err) {
        console.log("Error fetching news:", err);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="feed-container">
      <h2 className="feed-title">Civic News</h2>

      <div className="feed-grid">
        {articles.map((n, i) => (
          <div key={i} className="card">
            <h3>{n.title}</h3>

            <p>
              {n.description || "No description available"}
                </p>
                <a
  href={n.url}
  target="_blank"
  rel="noopener noreferrer"
  className="read-more"
>
  Curious? Read More →
</a>
          </div>
        ))}
      </div>
    </div>
  );
}