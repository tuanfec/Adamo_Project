import { Departure } from "@/types/tour";
import { useTranslation } from "react-i18next";

interface DepartureSectionProps {
  departure: Departure[];
}

export const DepartureSection: React.FC<DepartureSectionProps> = ({
  departure,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="text-xl font-medium my-4">
        {t("Infomation.Departure")}
      </div>
      <div>
        <p className="font-medium text-gray-600 dark:text-white mb-1">
          {t("Infomation.DeparturePoint")}
        </p>
        {departure?.[0]?.departurePont?.map((item, index) => (
          <p key={index} className="text-gray-600 dark:text-[#bbbbbb]">
            {index + 1}:{item.address}
          </p>
        ))}
        <div className="flex flex-col my-2">
          <p className="font-medium text-gray-600 dark:text-white mb-1">
            {t("Infomation.DepartureTime")}
          </p>
          <p className="text-gray-600 dark:text-[#bbbbbb]">
            {departure?.[0]?.departureTime}
          </p>
        </div>
      </div>
      <div className="border-b border-gray-400 dark:border-gray-600 my-5"></div>
    </div>
  );
};
