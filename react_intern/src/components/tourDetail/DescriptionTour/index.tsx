import { useSelector } from "react-redux";
import { TourItineraryCard } from "./components/TourItineraryCard";
import { OverviewSection } from "./components/OverviewSection";
import { IncludeSection } from "./components/IncludeSection";
import { DepartureSection } from "./components/DepartureSection";
import { MapSection } from "./components/MapSection";
import { TourData } from "@/types/tour";
import { ImageAndVideoSection } from "./components/ImageAndVideoSection";
import { HotelFormData } from "@/types/hotel";
import { Role } from "@/components/hotels/Role";
interface DescriptionTourProps {
  dataTour?: TourData;
  dataHotel?: HotelFormData;
}

export const DescriptionTour: React.FC<DescriptionTourProps> = ({
  dataTour,
  dataHotel,
}) => {
  const location = useSelector((state: any) => state.tourDataSlide.location);
  return (
    <div>
      <OverviewSection
        overviewTour={dataTour?.overview}
        overviewHotel={dataHotel?.tourDescription?.overview ?? []}
      />
      <IncludeSection
        includes={dataTour?.include ?? []}
        includesHotel={dataHotel?.tourDescription.hotelAmenities ?? []}
      />
      {dataHotel && <Role data={dataHotel} />}
      {dataTour && (
        <>
          <DepartureSection departure={dataTour?.departure ?? []} />
          <div>
            <div className="text-xl font-medium my-6">Tour Itinerary</div>
            {dataTour?.tourItinerary.map((itinerary, itineraryIndex) => (
              <div key={itineraryIndex}>
                <TourItineraryCard
                  tourDay={itinerary.tourDay}
                  dayNumber={itineraryIndex + 1}
                />
              </div>
            ))}
          </div>
          <MapSection location={location} />
          <ImageAndVideoSection data={dataTour?.media} />
        </>
      )}
      {dataHotel && (
        <MapSection
          location={{
            locationName: dataHotel?.title,
            coordinates: {
              lat: dataHotel?.tourDescription.map.coordinates.lat,
              lng: dataHotel?.tourDescription.map.coordinates.lng,
            },
          }}
        />
      )}
    </div>
  );
};
