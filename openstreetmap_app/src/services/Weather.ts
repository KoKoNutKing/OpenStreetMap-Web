// src/services/weatherService.ts

const API_KEY = "69acfc7a853a0f469823b932a691741f"; // ⚠️ Thay Key của bạn vào đây
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export interface WeatherData {
  temp: number;       // Nhiệt độ (độ C)
  description: string; // Mô tả (ví dụ: "mưa nhẹ")
  icon: string;       // Mã icon để lấy ảnh
  city: string;       // Tên thành phố
  humidity: number;   // Độ ẩm
}

export async function getWeather(lat: number, lon: number): Promise<WeatherData | null> {
  try {
    const url = new URL(BASE_URL);
    url.searchParams.append("lat", lat.toString());
    url.searchParams.append("lon", lon.toString());
    url.searchParams.append("appid", API_KEY);
    url.searchParams.append("units", "metric"); // Để lấy độ C
    url.searchParams.append("lang", "vi");      // Để lấy tiếng Việt

    const res = await fetch(url.toString());
    const data = await res.json();

    if (res.status !== 200) throw new Error(data.message);

    return {
      temp: Math.round(data.main.temp), // Làm tròn nhiệt độ
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      city: data.name,
      humidity: data.main.humidity,
    };
  } catch (error) {
    console.error("Lỗi lấy thời tiết:", error);
    return null;
  }
}