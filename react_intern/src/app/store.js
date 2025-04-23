import { configureStore } from "@reduxjs/toolkit";
import statePageSlide from "./slide/statePageSlide";
import userSlide from "./slide/userSlide";
import tourDataSlide from "./slide/tourDataSlide";
const store = configureStore({
  reducer: {
    statePageSlide: statePageSlide,
    userSlide: userSlide,
    tourDataSlide: tourDataSlide,
  },
});

export default store;
