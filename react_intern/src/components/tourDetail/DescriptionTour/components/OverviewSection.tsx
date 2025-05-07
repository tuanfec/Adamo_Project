import { Overview, ListOverview } from "@/types/tour";

interface OverviewSectionProps {
  overview: [Overview, { listOverview: ListOverview[] }];
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  overview,
}) => {
  return (
    <div>
      <div className="text-xl font-medium my-6">Overview</div>
      <p className="mb-6 text-gray-700">{overview?.[0]?.content}</p>
      <ul>
        {overview?.[1]?.listOverview?.map((item, index) => (
          <li key={index} className="list-disc ml-6 text-gray-700 my-2">
            {item.content}
          </li>
        ))}
      </ul>
      <div className="border-b border-gray-400 my-8"></div>
    </div>
  );
};
