import { configureStore } from "@reduxjs/toolkit";
import statePageSlide from "./slide/statePageSlide";
import userSlide from "./slide/userSlide";
import tourDataSlide from "./slide/tourDataSlide";
import bookingSlide from "./slide/checkOutSlide";
import hotelDataSlide from "./slide/hotelDataSlide";
const store = configureStore({
  reducer: {
    statePageSlide: statePageSlide,
    userSlide: userSlide,
    tourDataSlide: tourDataSlide,
    bookingSlide: bookingSlide,
    hotelDataSlide: hotelDataSlide,
  },
});

export default store;
