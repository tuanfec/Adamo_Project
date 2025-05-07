import { Comment, ReviewStats, Overview } from "@/types/tour";

export interface HotelFormData {
  id: string;
  name: string;
  image: string[];
  isSave: boolean;
  location: string;
  price: number;
  startDate?: string;
  endDate?: string;
  reviews: ReviewStats;
  hotelStar: number;
  tourDescription: {
    overview: string[];
    hotelAmenities: string[][];
    rules: {
      time: {
        checkIn: string;
        checkOut: string;
      };
      roleInformation: string[];
    };
    map: {
      coordinates: {
        lat: number;
        lng: number;
      };
    };
  };
  comments: Comment[];
  rooms: Room[];
}

export interface Room {
  id: string;
  name: string;
  price: number;
  image: string[];
  description: string;
  area: number;
  bed: string;
  guests: number;
  amenities: string[];
}
