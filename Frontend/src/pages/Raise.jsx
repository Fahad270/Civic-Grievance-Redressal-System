import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../utils/validation";
import axios from "axios";

export default function Raise() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [detected, setDetected] = useState("");
  const [image, setImage] = useState(null);
  const [resolution, setResolution] = useState("");
  const [location, setLocation] = useState(null);

  const navigate = useNavigate();

  // 📍 GET GPS LOCATION
  const handleLocationFetch = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };

  // ☁️ CLOUDINARY IMAGE UPLOAD
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_preset"); // 👈 same as cloudinary preset

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/di8wvyvi5/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url; // 🔥 returns image URL
  };

  // 🚀 FINAL SUBMIT (MAIN LOGIC)
  const handleSubmit = async () => {
    // ✅ basic validation
    const error = validateForm(title, desc);
    if (error) {
      alert(error);
      return;
    }

    // ❗ GPS check
    if (!location || !location.lat || !location.lng) {
      alert("Please click 'Get GPS' first 📍");
      return;
    }

    try {
      let imageUrl = "";

      // 🔥 upload image if exists
      if (image) {
        imageUrl = await uploadImage(image);
      }

      // 🚀 send to backend
      await axios.post("http://localhost:5000/api/grievances", {
        title,
        description: desc,
        location: {
          lat: location.lat,
          lng: location.lng,
        },
        imageurl: imageUrl, // 🔥 REAL CLOUDINARY IMAGE
        proposal: resolution,
        detected: detected,
      });

      alert("Grievance Submitted Successfully ✅");

      navigate("/feed");
    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
      alert("Something went wrong ❌");
    }
  };

  const today = new Date().toLocaleDateString();

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Raise Grievance</h2>

        {/* TITLE */}
        <input
          className="input"
          placeholder="Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* DESCRIPTION */}
        <textarea
          className="input"
          placeholder="Description *"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        {/* LOCATION */}
        <div className="location-box">
          <input
            className="input"
            placeholder="GPS Location Required"
            value={location ? `${location.lat}, ${location.lng}` : ""}
            disabled
          />

          <button className="small-btn" onClick={handleLocationFetch}>
            📍 Get GPS
          </button>
        </div>

        {/* DATE */}
        <div className="info-text">
          📅 Date of Grievance: <strong>{today}</strong>
        </div>

        {/* DETECTED */}
        <div className="checkbox-group">
          <label>Has this issue been detected before?</label>

          <div>
            <label>
              <input
                type="radio"
                name="detected"
                value="yes"
                onChange={(e) => setDetected(e.target.value)}
              />
              Yes
            </label>

            <label>
              <input
                type="radio"
                name="detected"
                value="no"
                onChange={(e) => setDetected(e.target.value)}
              />
              No
            </label>
          </div>
        </div>

        {/* IMAGE UPLOAD */}
        <div className="upload-box">
          <label>📷 Upload / Capture Image</label>

          <div className="upload-area">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="file-input"
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);
              }}
            />

            <p className="upload-hint">
              Tap to upload or use camera (mobile supported)
            </p>
          </div>

          {/* PREVIEW */}
          {image && (
            <div className="preview-box">
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="preview-img"
              />
            </div>
          )}
        </div>

        {/* OPTIONAL RESOLUTION */}
        <textarea
          className="input"
          placeholder="Proposed Resolution (Optional)"
          value={resolution}
          onChange={(e) => setResolution(e.target.value)}
        />

        {/* SUBMIT */}
        <button onClick={handleSubmit} className="btn full-btn">
          Submit Grievance
        </button>
      </div>
    </div>
  );
}