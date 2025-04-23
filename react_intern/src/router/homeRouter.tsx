import CheckoutForm from "@/components/CheckoutForm";
import AboutPage from "@/pages/AboutPage";
import { HomePage } from "@/pages/HomePage";
import { TourPage } from "@/pages/TourPage";
import { ViewAllList } from "@/pages/ViewAllList";
import { Route, Routes } from "react-router-dom";

export default function HomeRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/tours" element={<TourPage />} />
      <Route path="/hotels" element={<CheckoutForm />} />
      <Route path="/view_all" element={<ViewAllList />} />
    </Routes>
  );
}
