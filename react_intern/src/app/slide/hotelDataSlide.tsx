import { HotelFormData, Room } from "@/types/hotel";
import { createSlice } from "@reduxjs/toolkit";

interface HotelDataSlideState {
  hotelData: HotelFormData[];
  filter: {
    budget: [number, number];
    hotelStar: string[];
    score: number[];
  };
  sortBy: string;
  hotelDetail: HotelFormData;
  selectedRoom: Room[];
  addOn: {
    breakfast: {
      numberSelect: number;
    };
    extraBed: {
      numberSelect: number;
    };
  };
}

const initialState: HotelDataSlideState = {
  hotelData: [],
  filter: {
    budget: [0, 0],
    hotelStar: [],
    score: [],
  },
  sortBy: "Price high to low",
  hotelDetail: {
    id: "",
    name: "",
    image: [],
    isSave: false,
    price: 0,
    reviews: {
      rating: 0,
      totalReviews: 0,
      ratingBreakdown: {},
    },
    location: "",
    hotelStar: 0,
    tourDescription: {
      overview: [],
      hotelAmenities: [],
      rules: { time: { checkIn: "", checkOut: "" }, roleInformation: [] },
      map: { coordinates: { lat: 0, lng: 0 } },
    },
    comments: [],
    rooms: [],
  },
  selectedRoom: [],
  addOn: {
    breakfast: {
      numberSelect: 0,
    },
    extraBed: {
      numberSelect: 0,
    },
  },
};

const HotelDataSlide = createSlice({
  name: "hotelDataSlide",
  initialState,
  reducers: {
    setHotelData: (state, action) => {
      state.hotelData = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setHotelDetail: (state, action) => {
      state.hotelDetail = action.payload;
    },
    setSelectedRoom: (state, action) => {
      state.selectedRoom = action.payload;
    },
    setAddOn: (state, action) => {
      state.addOn = action.payload;
    },
  },
});

export const {
  setHotelData,
  setFilter,
  setSortBy,
  setHotelDetail,
  setSelectedRoom,
  setAddOn,
} = HotelDataSlide.actions;
export default HotelDataSlide.reducer;
