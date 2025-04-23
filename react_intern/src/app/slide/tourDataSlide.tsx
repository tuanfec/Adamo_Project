import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  tourData: [],
  header: "",
  filter: {
    budget: [0, 0],
    duration: [],
    typeTour: [],
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
  },
});

export const { setTourData, setHeader, setFilter } = tourDataSlide.actions;
export default tourDataSlide.reducer;
