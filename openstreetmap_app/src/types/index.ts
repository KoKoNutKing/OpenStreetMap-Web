// src/types/index.ts
export type LatLng = {
  lat: number;
  lon: number;
  name: string;
  display_name?: string;
  type?: string;        // Loại địa điểm (restaurant, school...)
  class?: string;       // Nhóm (amenity, highway...)
  importance?: number;
  address?: {           
    road?: string;
    suburb?: string;
    city?: string;
    country?: string;
    postcode?: string;
    district?: string; // Đôi khi VN dùng district
  };
};

