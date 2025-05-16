import { useTranslation } from "react-i18next";
import { GoDotFill } from "react-icons/go";

export const Featured: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col px-10 lg:gap-2 bg-white dark:bg-[#212121e2] dark:text-[#ffffff] md:px-5 md:py-1 lg:px-20 lg:py-6 ">
      <p className="flex items-center gap-2">
        <GoDotFill className="text-[#FF6600]" />
        {t("featured.title")}
      </p>
      <div className="flex flex-row gap-4 lg:gap-2 ">
        <div className="flex flex-row gap-2 items-center">
          <p className="lg:text-2xl text-sm font-bold">200+</p>
          <p className="lg:text-sm text-xs">{t("featured.description")}</p>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <p className="lg:text-2xl text-sm font-bold">100+</p>
          <p className="lg:text-sm text-xs">{t("featured.description_2")}</p>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <p className="lg:text-2xl text-sm font-bold">8+</p>
          <p className="lg:text-sm text-xs">{t("featured.description_3")}</p>
        </div>
      </div>
    </div>
  );
};
