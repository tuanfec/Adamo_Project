import { useSelector } from "react-redux";
import { TourItineraryCard } from "./components/TourItineraryCard";
import { OverviewSection } from "./components/OverviewSection";
import { IncludeSection } from "./components/IncludeSection";
import { DepartureSection } from "./components/DepartureSection";
import { MapSection } from "./components/MapSection";
import { TourData } from "@/types/tour";
import { ImageAndVideoSection } from "./components/ImageAndVideoSection";

interface DescriptionTourProps {
  data: TourData;
}

export const DescriptionTour: React.FC<DescriptionTourProps> = ({ data }) => {
  const location = useSelector((state: any) => state.tourDataSlide.location);
  return (
    <div>
      <OverviewSection overview={data?.overview} />
      <IncludeSection includes={data?.include} />
      <DepartureSection departure={data?.departure} />

      <div>
        <div className="text-xl font-medium my-6">Tour Itinerary</div>
        {data?.tourItinerary.map((itinerary, itineraryIndex) => (
          <div key={itineraryIndex}>
            <TourItineraryCard
              tourDay={itinerary.tourDay}
              dayNumber={itineraryIndex + 1}
            />
          </div>
        ))}
      </div>

      <MapSection location={location} />
      <ImageAndVideoSection data={data?.media} />
    </div>
  );
};
