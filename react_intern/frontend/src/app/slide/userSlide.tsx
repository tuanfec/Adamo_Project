import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: any;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};

const userSlide = createSlice({
  name: "userSlide",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setUser, setIsLoggedIn } = userSlide.actions;
export default userSlide.reducer;
