import CheckoutForm from "@/components/checkOut/CheckoutForm";
import AboutPage from "@/pages/AboutPage";
import { HomePage } from "@/pages/HomePage";
import { HotelPage } from "@/pages/HotelPage";
import { SearchPage } from "@/pages/SearchPage";
import { ThanksPage } from "@/pages/ThanksPage";
import { TourPage } from "@/pages/TourPage";
import { ViewAllList } from "@/pages/ViewAllList";
import { ViewDetail } from "@/pages/ViewDetail";
import { Route, Routes } from "react-router-dom";

export default function HomeRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/tours" element={<TourPage />} />
      <Route path="/Hotels" element={<HotelPage />} />
      {/* <Route path="/hotels" element={} /> */}
      <Route path="/Tours/View_all/:header" element={<ViewAllList />} />
      <Route path="/Tours/View_detail/:id" element={<ViewDetail />} />
      <Route path="/Tours/Search" element={<SearchPage />} />
      <Route path="/Checkout/:id" element={<CheckoutForm />} />
      <Route path="/Thanks" element={<ThanksPage />} />
    </Routes>
  );
}
