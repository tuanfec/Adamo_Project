import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  tourData: [],
  tourDetail: [],
  header: "",
  filter: {
    budget: [0, 0],
    duration: [],
    typeTour: [],
  },
  totalGuest: [
    {
      adult: 0,
      child: 0,
    },
  ],
  location: {
    coordinates: {
      lat: 0,
      lng: 0,
    },
    address: "",
  },
};

const tourDataSlide = createSlice({
  name: "tourDataSlide",
  initialState,
  reducers: {
    setTourData: (state, action) => {
      state.tourData = action.payload;
    },
    setHeader: (state, action) => {
      state.header = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setTourDetail: (state, action) => {
      state.tourDetail = action.payload;
    },
    setTotalGuest: (state, action) => {
      state.totalGuest = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const {
  setTourData,
  setHeader,
  setFilter,
  setTourDetail,
  setTotalGuest,
  setLocation,
} = tourDataSlide.actions;
export default tourDataSlide.reducer;
