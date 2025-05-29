import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "@/i18n/locales/en/translation.json";
import vi from "@/i18n/locales/vi/translation.json";

i18n
  .use(LanguageDetector) // Tự phát hiện ngôn ngữ trình duyệt
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      vi: { translation: vi },
    },
    fallbackLng: "en", // Ngôn ngữ mặc định
    interpolation: {
      escapeValue: false, // React đã escape sẵn
    },
  });

export default i18n;
