import { Include } from "@/types/tour";
import { useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa6";

interface IncludeSectionProps {
  includes: Include[][];
  includesHotel: string[][];
}

export const IncludeSection: React.FC<IncludeSectionProps> = ({
  includes,
  includesHotel,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="text-xl font-medium my-5">{t("Infomation.Included")}</div>
      {includes &&
        includes?.[0]?.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <FaCheck className="text-[#28B554]" />
            <p className="dark:text-[#bbbbbb]">{item.content}</p>
          </div>
        ))}
      <div className="grid grid-cols-2 gap-1">
        {includesHotel &&
          includesHotel?.[0]?.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <FaCheck className="text-[#28B554]" />
              <p className="dark:text-[#bbbbbb]">{item}</p>
            </div>
          ))}
      </div>
      <div className="border-b border-gray-400 dark:border-gray-600 my-8"></div>
    </div>
  );
};
