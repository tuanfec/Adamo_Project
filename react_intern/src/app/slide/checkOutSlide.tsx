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
  voucher: [];
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
  voucher: [],
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
    setVoucher: (state, action) => {
      state.voucher = action.payload;
    },
  },
});

export const { setBookingForm, setPaymentMethod, setVoucher } =
  BookingSlide.actions;
export default BookingSlide.reducer;
