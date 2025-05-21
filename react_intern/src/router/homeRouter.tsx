import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const AboutPage = lazy(() => import("@/pages/common/AboutPage"));
const HomePage = lazy(() => import("@/pages/common/HomePage"));
const HotelPage = lazy(() => import("@/pages/hotel/HotelPage"));
const ThanksPage = lazy(() => import("@/pages/common/ThanksPage"));
const SearchTour = lazy(() => import("@/pages/tour/SearchTour"));
const TourPage = lazy(() => import("@/pages/tour/TourPage"));
const ViewAllList = lazy(() => import("@/pages/tour/ViewAllList"));
const ViewDetail = lazy(() => import("@/pages/tour/ViewDetail"));
const HotelDetail = lazy(() => import("@/pages/hotel/HotelDetail"));
const PolicyPage = lazy(() => import("@/pages/common/PolicyPage"));
const ContactPage = lazy(() => import("@/pages/common/ContactPage"));
const SearchHotel = lazy(() => import("@/pages/hotel/SearchHotel"));
const CheckOutPage = lazy(() => import("@/pages/common/CheckOutPage"));
const NotFoundPage = lazy(() => import("@/pages/common/NotFoundPage"));
import { Loading } from "@/components/common/Loading";

export default function HomeRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/tours" element={<TourPage />} />
        <Route path="/tours/view_all/:source" element={<ViewAllList />} />
        <Route path="/tours/view_detail/:source/:id" element={<ViewDetail />} />
        <Route path="/tours/search" element={<SearchTour />} />
        <Route path="/checkout/tour/:id" element={<CheckOutPage />} />
        <Route path="/checkout/hotel/:id" element={<CheckOutPage />} />
        <Route path="/thanks" element={<ThanksPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/tours/view_all/destination/:location"
          element={<ViewAllList />}
        />
        <Route path="/tours/view_all_destination" element={<ViewAllList />} />

        <Route path="/hotels" element={<HotelPage />} />
        <Route path="/hotels/search" element={<SearchHotel />} />
        <Route path="/hotels/view_detail/:id" element={<HotelDetail />} />
        <Route path="/policy" element={<PolicyPage />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Suspense>
  );
}
