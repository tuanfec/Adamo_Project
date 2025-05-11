import AboutPage from "@/pages/common/AboutPage";
import { HomePage } from "@/pages/common/HomePage";
import { SearchPage } from "@/pages/common/SearchPage";
import { ThanksPage } from "@/pages/common/ThanksPage";
import { Route, Routes } from "react-router-dom";
import { ContactPage } from "@/pages/common/ContactPage";

export default function HomeRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/tours/search" element={<SearchPage />} />
      <Route path="/thanks" element={<ThanksPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}
