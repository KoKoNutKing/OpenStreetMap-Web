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
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Nếu có vị trí được chọn thì hiển thị Marker và căn giữa bản đồ */}
      {selectedLocation && (
        <>
          <Marker position={[selectedLocation.lat, selectedLocation.lon]}>
            <Popup>
              <div>
                <strong>Địa điểm đã chọn:</strong> {selectedLocation.display_name}
              </div>
              <div>
                <b>Tọa độ:</b> {selectedLocation.lat}, {selectedLocation.lon}
              </div>
              <div>
                <b>Loại:</b> {selectedLocation.type}
              </div>
              <div>
                <b>Địa chỉ:</b> {selectedLocation.address?.road} - {selectedLocation.address?.city}
              </div>
            </Popup>
          </Marker>
          <RecenterMap location={selectedLocation} />
        </>
      )}
    </MapContainer>
  );
}