import { useEffect, useState } from "react";
import { getWeather, type WeatherData } from "../services/Weather";

interface WeatherCardProps {
  lat: number;
  lon: number;
}

export default function WeatherCard({ lat, lon }: WeatherCardProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  // Mỗi khi lat/lon thay đổi (người dùng chọn chỗ mới), gọi lại API
  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      const data = await getWeather(lat, lon);
      setWeather(data);
      setLoading(false);
    }
    fetchWeather();
  }, [lat, lon]);

  if (loading) return <div style={styles.card}>Đang tải thời tiết...</div>;
  if (!weather) return null;

  return (
    <div style={styles.card}>
      {/* Dòng 1: Tên thành phố & Nhiệt độ */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <strong>{weather.city}</strong>
        <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{weather.temp}°C</span>
      </div>

      {/* Dòng 2: Icon & Mô tả */}
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <img 
          src={`https://openweathermap.org/img/wn/${weather.icon}.png`} 
          alt="icon" 
          width={40} 
        />
        <span style={{ textTransform: "capitalize" }}>{weather.description}</span>
      </div>
      
      {/* Dòng 3: Độ ẩm */}
      <div style={{ fontSize: "0.8rem", color: "#666", marginTop: 4 }}>
        Độ ẩm: {weather.humidity}%
      </div>
    </div>
  );
}

// CSS viết thẳng trong file cho gọn
const styles = {
  card: {
    position: "absolute" as "absolute", // Để đè lên bản đồ
    top: 10,
    right: 10,
    zIndex: 1000, // Để nó nổi lên trên bản đồ
    backgroundColor: "white",
    padding: "10px 15px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
    minWidth: "150px",
    color: "black",
    fontFamily: "Arial, sans-serif"
  }
};