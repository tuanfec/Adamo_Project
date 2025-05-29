import { createSlice } from "@reduxjs/toolkit";

export const PageState = {
  DESCRIPTION: "description",
  ADDITIONAL_INFOR: "additionalInfor",
  REVIEWS: "reviews",
  SELECT_ROOM: "selectRoom",
};

const initialState = {
  state: PageState,
  location: "",
};

const statePageSlide = createSlice({
  name: "statePageSlide",
  initialState,
  reducers: {
    setStatePage: (state, action) => {
      state.state = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { setStatePage, setLocation } = statePageSlide.actions;
export default statePageSlide.reducer;
