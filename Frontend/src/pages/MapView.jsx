import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// 🔥 FORCE FIX
function ResizeMap() {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }, [map]);

  return null;
}

export default function MapView() {
  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState("All");
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/grievances")
      .then(res => setIssues(res.data))
      .catch(err => console.log(err));
  }, []);

  const filteredIssues =
    filter === "All"
      ? issues
      : issues.filter(i => i.status === filter);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation([
        pos.coords.latitude,
        pos.coords.longitude,
      ]);
    });
  };

  return (
    <div className="map-page">

      {/* TOP BAR */}
      <div className="map-controls">
        <div className="map-title">📍 Civic Issue Map</div>

        <div className="map-buttons">
          <button onClick={() => setFilter("All")}>All</button>
          <button onClick={() => setFilter("Pending")}>Pending</button>
          <button onClick={() => setFilter("Working")}>Working</button>
          <button onClick={() => setFilter("Completed")}>Completed</button>
        </div>

        <button className="gps-btn" onClick={getLocation}>
          📌 My Location
        </button>
      </div>

      {/* MAP */}
      <div className="map-container">
        <MapContainer
          center={[19.076, 72.8777]}
          zoom={13}
          className="leaflet-map"   // 🔥 IMPORTANT
        >
          <ResizeMap />

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredIssues.map(issue => (
            <Marker
              key={issue._id}
              position={[
                issue.location.lat,
                issue.location.lng
              ]}
            >
              <Popup>
                <b>{issue.title}</b><br />
                {issue.status}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

    </div>
  );
}