import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const FooterInfor: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row items-start justify-center gap-8 md:gap-12 lg:gap-25">
      <div className="flex flex-col gap-4">
        <Link to="/" className="hover:text-[#FF7B42] transition-colors">
          {t("navbar.home")}
        </Link>
        <Link to="/about" className="hover:text-[#FF7B42] transition-colors">
          {t("navbar.about")}
        </Link>
        <Link to="/tours" className="hover:text-[#FF7B42] transition-colors">
          {t("navbar.tour")}
        </Link>
        <Link to="/hotels" className="hover:text-[#FF7B42] transition-colors">
          {t("navbar.hotels")}
        </Link>
        <Link to="/contact" className="hover:text-[#FF7B42] transition-colors">
          {t("navbar.contact")}
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <p className="cursor-pointer hover:text-[#FF7B42] transition-colors">
          {t("footer.partner")}
        </p>
        <p className="cursor-pointer hover:text-[#FF7B42] transition-colors">
          {t("footer.terms")}
        </p>
        <Link
          to="/policy"
          className="cursor-pointer hover:text-[#FF7B42] transition-colors">
          {t("footer.privacyPolicy")}
        </Link>
        <p className="cursor-pointer hover:text-[#FF7B42] transition-colors">
          {t("footer.guestPolicy")}
        </p>
      </div>
    </div>
  );
};
