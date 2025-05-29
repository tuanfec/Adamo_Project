import { Overview, ListOverview } from "@/types/tour";
import { useTranslation } from "react-i18next";

interface OverviewSectionProps {
  overviewTour?: [Overview, { listOverview: ListOverview[] }];
  overviewHotel?: string[];
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  overviewTour,
  overviewHotel,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="text-xl font-medium my-6">{t("Infomation.Overview")}</div>
      {overviewTour && (
        <p className="mb-6 text-gray-700 dark:text-[#bbbbbb]">
          {overviewTour?.[0]?.content}
        </p>
      )}
      {overviewHotel &&
        overviewHotel.map((item, index) => (
          <p key={index} className="mb-6 text-gray-700 dark:text-[#bbbbbb]">
            {item}
          </p>
        ))}
      <ul>
        {overviewTour?.[1]?.listOverview?.map((item, index) => (
          <li
            key={index}
            className="list-disc ml-6 text-gray-700 dark:text-[#bbbbbb] my-2">
            {item.content}
          </li>
        ))}
      </ul>
      <div className="border-b border-gray-400 dark:border-gray-600 my-8"></div>
    </div>
  );
};
