import { useState } from "react";
import { validateForm } from "../utils/validation";
export default function Raise() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = () => {
    alert("Grievance Submitted!");
    const error = validateForm(title, desc);

if (error) {
  alert(error);
  return;
}
  };

  return (
    <div className="container">
      <h2>Raise Grievance</h2>

      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        onChange={(e) => setDesc(e.target.value)}
      />

      <button onClick={handleSubmit} className="btn">
        Submit
      </button>
    </div>
  );
}