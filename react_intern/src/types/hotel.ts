import { Comment, ReviewStats, Overview } from "@/types/tour";

export interface HotelFormData {
  id: string;
  title: string;
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
  addOn?: AddOn;
}
export interface AddOn {
  breakfast: {
    numberSelect: number;
    price: number;
  };
  extraBed: {
    numberSelect: number;
    price: number;
  };
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
  quantity: number;
  numberSelect?: number;
  discount?: number;
}
