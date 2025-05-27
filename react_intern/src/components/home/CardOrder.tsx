import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const CardOrder = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col bg-white items-center w-1/2 h-1/2 justify-center gap-15">
      <div className="lg:text-5xl text-3xl text-[#FF7B42] font-bold">
        {t("thanks.thankstext")}
      </div>
      <p className="text-lg text-center text-gray-500">
        {t("thanks.des1")}
        <br /> {t("thanks.des2")}
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-[#FF7B42] py-4 px-15 text-white ">
        {t("thanks.backhome")}
      </button>
    </div>
  );
};
