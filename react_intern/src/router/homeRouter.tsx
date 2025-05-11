import CheckoutForm from "@/components/checkOut/CheckoutForm";
import AboutPage from "@/pages/common/AboutPage";
import { HomePage } from "@/pages/common/HomePage";
import { HotelPage } from "@/pages/hotel/HotelPage";
import { SearchPage } from "@/pages/common/SearchPage";
import { ThanksPage } from "@/pages/common/ThanksPage";
import { TourPage } from "@/pages/tour/TourPage";
import { ViewAllList } from "@/pages/tour/ViewAllList";
import { ViewDetail } from "@/pages/tour/ViewDetail";
import { Route, Routes } from "react-router-dom";
import { HotelDetail } from "@/pages/hotel/HotelDetail";
import { PolicyPage } from "@/pages/common/PolicyPage";
import { ContactPage } from "@/pages/common/ContactPage";

export default function HomeRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/tours" element={<TourPage />} />
      <Route path="/tours/view_all/:source" element={<ViewAllList />} />
      <Route path="/tours/view_detail/:source/:id" element={<ViewDetail />} />
      <Route path="/tours/search" element={<SearchPage />} />
      <Route path="/checkout/tour/:id" element={<CheckoutForm />} />
      <Route path="/checkout/hotel/:id" element={<CheckoutForm />} />
      <Route path="/thanks" element={<ThanksPage />} />
      <Route path="/contact" element={<ContactPage />} />

      <Route path="/hotels" element={<HotelPage />} />
      <Route path="/hotels/view_detail/:id" element={<HotelDetail />} />
      <Route path="/policy" element={<PolicyPage />} />
    </Routes>
  );
}
