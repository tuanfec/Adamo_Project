import { setLocation } from "@/app/slide/tourDataSlide";
import { DropContent } from "@/components/common/DropContent/Index";
import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { TourItineraryCardProps } from "@/types/tour";

export const TourItineraryCard: React.FC<TourItineraryCardProps> = ({
  tourDay,
  dayNumber,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const totalLocation = tourDay?.location?.length;
  const dispatch = useDispatch();
  const selectedLocation = useSelector(
    (state: any) => state.tourDataSlide.location
  );
  return (
    <DropContent
      onClick={() => setIsOpen(!isOpen)}
      headerTitle={`Day ${dayNumber}: ${tourDay.content} (${totalLocation} stops)`}
      isOpen={isOpen}
      content={
        <div>
          {isOpen &&
            tourDay?.location?.map((location, index) => (
              <div className="flex flex-row gap-2 py-4" key={index}>
                <div>
                  <CiLocationOn className="text-2xl text-[#04316A]" />
                </div>
                <div className="flex flex-col">
                  {location.locationName && (
                    <p
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(
                          setLocation({
                            coordinates: location.coordinates,
                            locationName: location.locationName,
                          })
                        );
                      }}
                      className={`text-md font-medium mb-2 ${selectedLocation.locationName === location.locationName ? "text-[#FF7B42]" : "text-[#04316A]"}`}>
                      {location.locationName}
                    </p>
                  )}
                  {location.content && <p>{location.content}</p>}
                  {location.duration?.map((duration, idx) => (
                    <div key={idx}>
                      {duration.durationTime && (
                        <div className="flex flex-row gap-2 mt-4">
                          <span className="text-gray-600 font-medium">
                            Duration:
                          </span>
                          {duration.durationTime}
                        </div>
                      )}
                      {duration.durationDescription && (
                        <p>{duration.durationDescription}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      }
    />
  );
};
