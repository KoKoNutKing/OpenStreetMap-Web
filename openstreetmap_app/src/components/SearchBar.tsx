import { useState } from "react";
import { type LatLng } from "../types"; // Import kiểu dữ liệu từ file chung

interface SearchBoxProps {
  onSelectLocation: (location: LatLng) => void; // Hàm callback để báo lại cho App
}

export default function SearchBox({ onSelectLocation }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LatLng[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  async function handleSearch() {
    if (!query.trim()) return;
    setIsSearching(true);
    
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&format=json&addressdetails=1`;
      const res = await fetch(url);
      const data = await res.json();

      setResults(
        data.map((item: any) => ({
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
          name: item.display_name.split(',')[0], // Lấy phần tên đầu tiên làm name
          display_name: item.display_name,
          class: item.class,       // Ví dụ: amenity, highway, tourism...
          type: item.type,             // Lấy type từ API
          importance: item.importance, // Lấy importance
          address: item.address        // API trả về nguyên cụm address, gán thẳng vào luôn
        }))
      );
    } catch (error) {
      console.error("Lỗi tìm kiếm:", error);
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <div style={{ padding: 10, backgroundColor: "white", borderBottom: "1px solid #ccc" }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nhập địa chỉ (VD: Đại học Hoa Sen)..."
          style={{ flex: 1, padding: 8 }}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} disabled={isSearching} style={{ padding: "0 16px" }}>
          {isSearching ? "Đang tìm..." : "Tìm"}
        </button>
      </div>

      {/* Danh sách kết quả tìm kiếm */}
      {results.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, marginTop: 4, marginBottom: 4, border: "1px solid #eee", maxHeight: "200px", overflowY: "auto", color:"black"}}>
          {results.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                onSelectLocation(item); // Báo cho App biết đã chọn cái này
                setResults([]); // Chọn xong thì ẩn danh sách đi cho gọn
              }}
              style={{ padding: 2, cursor: "pointer", borderBottom: "1px solid #000000ff" }}
              // Thêm hiệu ứng hover đơn giản
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}