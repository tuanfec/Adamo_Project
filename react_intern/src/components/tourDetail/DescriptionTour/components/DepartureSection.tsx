import { Departure } from "@/types/tour";

interface DepartureSectionProps {
  departure: Departure[];
}

export const DepartureSection: React.FC<DepartureSectionProps> = ({
  departure,
}) => {
  return (
    <div>
      <div className="text-xl font-medium my-4">Departure & Return</div>
      <div>
        <p className="font-medium text-gray-600 mb-1">Departure Point</p>
        {departure?.[0]?.departurePont?.map((item, index) => (
          <p key={index} className="text-gray-600">
            {index + 1}:{item.address}
          </p>
        ))}
        <div className="flex flex-col my-2">
          <p className="font-medium text-gray-600 mb-1">Departure Time</p>
          <p className="text-gray-600">{departure?.[0]?.departureTime}</p>
        </div>
      </div>
      <div className="border-b border-gray-400 my-5"></div>
    </div>
  );
};
