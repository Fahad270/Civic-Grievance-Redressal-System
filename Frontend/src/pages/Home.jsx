import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  return (
    <div>

      {/* HERO */}
      <div className="hero">
        <h1>Civic Grievance Redressal System</h1>
       

        <button className="btn" onClick={() => nav("/raise")}>
          Raise Grievance
        </button>
      </div>

      {/* FEATURES (REAL USP) */}
      <div className="features">

        <div className="card">
          <h3>📍 Location-Based Reporting</h3>
          <p>Automatically detect or manually add location for accurate issue tracking.</p>
        </div>

        <div className="card">
          <h3>👍 Community Upvoting</h3>
          <p>Avoid duplicate complaints by supporting existing issues with upvotes.</p>
        </div>

        <div className="card">
          <h3>📊 Priority-Based Resolution</h3>
          <p>Issues are prioritized based on urgency, upvotes, and time.</p>
        </div>

        <div className="card">
          <h3>👮 GRO Dashboard</h3>
          <p>Authorities can manage, update, and resolve grievances efficiently.</p>
        </div>

      </div>

      {/* CTA */}
      <div className="cta">
        <h2>Be a part of a smarter city</h2>
        <p style={{ opacity: 0.7 }}>
          Your voice matters. Report issues and drive change.
        </p>
        <button className="btn" onClick={() => nav("/raise")}>
          Get Started
        </button>
      </div>

    </div>
  );
}