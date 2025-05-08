import { Overview, ListOverview } from "@/types/tour";

interface OverviewSectionProps {
  overviewTour?: [Overview, { listOverview: ListOverview[] }];
  overviewHotel?: string[];
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  overviewTour,
  overviewHotel,
}) => {
  return (
    <div>
      <div className="text-xl font-medium my-6">Overview</div>
      {overviewTour && (
        <p className="mb-6 text-gray-700">{overviewTour?.[0]?.content}</p>
      )}
      {overviewHotel &&
        overviewHotel.map((item, index) => (
          <p key={index} className="mb-6 text-gray-700">
            {item}
          </p>
        ))}
      <ul>
        {overviewTour?.[1]?.listOverview?.map((item, index) => (
          <li key={index} className="list-disc ml-6 text-gray-700 my-2">
            {item.content}
          </li>
        ))}
      </ul>
      <div className="border-b border-gray-400 my-8"></div>
    </div>
  );
};
