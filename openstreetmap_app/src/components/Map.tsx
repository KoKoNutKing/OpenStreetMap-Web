import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { type LatLng } from "../types";

// Component phụ: Giúp bản đồ tự bay đến vị trí mới khi selectedLocation thay đổi
function RecenterMap({ location }: { location: LatLng }) {
  const map = useMap();
  useEffect(() => {
    map.setView([location.lat, location.lon], 15); // Bay đến vị trí mới, zoom 15
  }, [location, map]);
  return null;
}

interface MapViewProps {
  selectedLocation: LatLng | null;
}

export default function MapView({ selectedLocation }: MapViewProps) {
  // Vị trí mặc định (TP.HCM)
  const defaultPosition: [number, number] = [10.776889, 106.700806];

  return (
    <MapContainer
      center={defaultPosition}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; Tôi lấy map của OpenStreetMap'
      />

      {/* Nếu có vị trí được chọn thì hiển thị Marker và căn giữa bản đồ */}
      {selectedLocation && (
        <>
          <Marker position={[selectedLocation.lat, selectedLocation.lon]}>
            <Popup>{selectedLocation.display_name}</Popup>
          </Marker>
          <RecenterMap location={selectedLocation} />
        </>
      )}
    </MapContainer>
  );
}