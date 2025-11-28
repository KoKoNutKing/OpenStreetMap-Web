import { useState } from "react";
import SearchBox from "./components/SearchBar";
import MapView from "./components/Map";
import WeatherCard from "./components/WeatherCard";
import TranslateBox from "./components/TranslateBox";
import {type LatLng } from "./types";
import "./App.css"; // Giữ file css cũ nếu bạn có style reset margin/padding

function App() {
  // App chỉ cần nhớ 1 thứ duy nhất: Vị trí đang được chọn là gì?
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* Phần 1: Tìm kiếm */}
      <SearchBox onSelectLocation={(loc) => setSelectedLocation(loc)} />

      {/* Phần 2: Bản đồ */}
      <div style={{ flex: 1, position: "relative" }}> {/* Thêm position: relative */}
        
        <MapView selectedLocation={selectedLocation} />
        
        {/* 👇 Chỉ hiện thẻ thời tiết khi đã chọn địa điểm */}
        {selectedLocation && (
          <WeatherCard 
            lat={selectedLocation.lat} 
            lon={selectedLocation.lon} 
          />
        )}
      </div>

      {/* Phần 3: Hộp dịch thuật */}
      <TranslateBox />
    
    </div>
  );
}

export default App;