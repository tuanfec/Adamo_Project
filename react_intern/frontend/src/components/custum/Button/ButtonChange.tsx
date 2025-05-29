import { useTranslation } from "react-i18next";
import "./css.css";

export const ButtonChange = () => {
  const { i18n } = useTranslation();
  const isVi = i18n.language === "vi";
  const handToggleLanguage = () => {
    i18n.changeLanguage(isVi ? "en" : "vi");
  };
  return (
    <label className="switch" aria-label="Toggle Filter">
      <input type="checkbox" id="filter" checked={isVi} />
      <span onClick={() => handToggleLanguage()}>EN</span>
      <span onClick={() => handToggleLanguage()}>VI</span>
    </label>
  );
};
