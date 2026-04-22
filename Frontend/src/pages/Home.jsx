import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="container">
      <h1>Welcome Citizen</h1>
      <button onClick={() => nav("/raise")} className="btn">
        Raise Grievance
      </button>
    </div>
  );
}