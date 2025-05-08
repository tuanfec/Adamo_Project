import { createSlice } from "@reduxjs/toolkit";

interface BookingSlideState {
  bookingForm: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    specialRequirement: string;
  };
  paymentMethod: string;
}

const initialState: BookingSlideState = {
  bookingForm: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    specialRequirement: "",
  },
  paymentMethod: "",
};

const BookingSlide = createSlice({
  name: "bookingSlide",
  initialState,
  reducers: {
    setBookingForm: (state, action) => {
      state.bookingForm = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
  },
});

export const { setBookingForm, setPaymentMethod } = BookingSlide.actions;
export default BookingSlide.reducer;
