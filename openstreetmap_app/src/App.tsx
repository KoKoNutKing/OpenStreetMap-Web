import { useState } from 'react'
import './App.css'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css'

type LatLng = {
  lat: number;
  lon: number;
  name: string;
  display_name?: string;
};

function App() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState<LatLng | null>(null);
  const [results, setResults] = useState<LatLng[]>([]);

  async function handleSearch() {
    if (!query.trim()) return;

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query
    )}&limit=5`;


  const res = await fetch(url);
  const data = await res.json();

  setResults(data.map((item: any) => ({
    lat: parseFloat(item.lat),
    lon: parseFloat(item.lon),
    name: item.display_name,
    display_name: item.display_name,
  })));
}

  // vị trí mặc định (HCM)
  const center: [number, number] = location
    ? [location.lat, location.lon]
    : [10.776889, 106.700806];

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* ô tìm kiếm */}
      <div style={{ padding: 8, display: "flex", gap: 8 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nhập địa chỉ, ví dụ: Đại học Hoa Sen"
          style={{ flex: 1, padding: 4 }}
        />
        <button onClick={handleSearch}>Tìm</button>
      </div>
      <ul>
        {results.map((item, index) => (
          <li key={index} onClick={() => setLocation(item)}>
            {item.display_name} — {item.lat}, {item.lon}
          </li>
        ))}
      </ul>
      {/* bản đồ */}
      <div style={{ flex: 1 }}>
        <MapContainer center={center} zoom={15} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {location && (
            <Marker position={[location.lat, location.lon]}>
              <Popup>{location.display_name || location.name}</Popup>
            </Marker>
          )}
          {results.map((item, index) => (
            <Marker key={index} position={[item.lat, item.lon]}>
              <Popup>{item.display_name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default App
