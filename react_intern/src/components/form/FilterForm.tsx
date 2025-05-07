import { useState, useEffect } from "react";
import Range from "rc-slider";
import "rc-slider/assets/index.css";
import { useDispatch, useSelector } from "react-redux";
import { setFilter as setTourFilter } from "@/app/slide/tourDataSlide";
import { setFilter as setHotelFilter } from "@/app/slide/hotelDataSlide";
import { TourData } from "@/types/tour";
import { HotelFormData } from "@/types/hotel";
import { AiFillStar } from "react-icons/ai";

interface FilterFormProps {
  tourData?: TourData[];
  hotelData?: HotelFormData[];
}

export const FilterForm: React.FC<FilterFormProps> = ({
  tourData,
  hotelData,
}) => {
  const filterTour = useSelector((state: any) => state.tourDataSlide.filter);
  const filterHotel = useSelector((state: any) => state.hotelDataSlide.filter);
  const dispatch = useDispatch();
  const durationFiltered = [...new Set(tourData?.map((item) => item.duration))];
  const typeTourFiltered = [...new Set(tourData?.map((item) => item.type))];

  // Tính min/max price
  let minPrice = 0;
  let maxPrice = 0;

  if (tourData && tourData.length > 0) {
    minPrice = Math.min(...tourData.map((item) => item.price));
    maxPrice = Math.max(...tourData.map((item) => item.price));
  } else if (hotelData && hotelData.length > 0) {
    // Lấy tất cả giá phòng của tất cả hotel
    const allRoomPrices = hotelData.flatMap((item) =>
      item.rooms.map((room) => room.price)
    );
    minPrice = Math.min(...allRoomPrices);
    maxPrice = Math.max(...allRoomPrices);
  }

  const scoreFiltered = [
    { label: "Wonderful : 9.5+", value: 9.5 },
    { label: "Very Good : 9+", value: 9 },
    { label: "Good : 8+", value: 8 },
    { label: "Pleasant : 7+", value: 7 },
  ];

  // Local state for form values
  const [budget, setBudget] = useState<[number, number]>(() => {
    if (tourData && tourData.length > 0) {
      return filterTour?.budget &&
        filterTour?.budget[0] !== 0 &&
        filterTour?.budget[1] !== 0
        ? filterTour.budget
        : [minPrice, maxPrice];
    } else if (hotelData && hotelData.length > 0) {
      return filterHotel?.budget &&
        filterHotel?.budget[0] !== 0 &&
        filterHotel?.budget[1] !== 0
        ? filterHotel.budget
        : [minPrice, maxPrice];
    }
    return [minPrice, maxPrice];
  });
  const [duration, setDuration] = useState<string[]>(
    filterTour?.duration || []
  );
  const [typeTour, setTypeTour] = useState<string[]>(
    filterTour?.typeTour || []
  );
  const [hotelStar, setHotelStar] = useState<string[]>(
    filterTour?.hotelStar || []
  );
  const [score, setScore] = useState<number[]>(filterHotel?.score || []);
  // Update local state when filterTour changes
  useEffect(() => {
    if (tourData && tourData.length > 0) {
      setBudget(
        filterTour?.budget &&
          filterTour?.budget[0] !== 0 &&
          filterTour?.budget[1] !== 0
          ? filterTour.budget
          : [minPrice, maxPrice]
      );
      setDuration(filterTour?.duration || []);
      setTypeTour(filterTour?.typeTour || []);
      setHotelStar([]);
      setScore([]);
    } else if (hotelData && hotelData.length > 0) {
      setBudget(
        filterHotel?.budget &&
          filterHotel?.budget[0] !== 0 &&
          filterHotel?.budget[1] !== 0
          ? filterHotel.budget
          : [minPrice, maxPrice]
      );
      setDuration([]);
      setTypeTour([]);
      setHotelStar(filterHotel?.hotelStar || []);
      setScore(filterHotel?.score || []);
    }
  }, [filterTour, filterHotel, minPrice, maxPrice, tourData, hotelData]);

  const handleBudgetChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setBudget(value as [number, number]);
    }
  };
  const handleDurationChange = (item: string) => {
    setDuration((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleTypeTourChange = (item: string) => {
    setTypeTour((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleHotelStarChange = (item: string) => {
    setHotelStar((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const hotelStarFiltered = [
    ...new Set(hotelData?.map((item) => item.hotelStar)),
  ];

  const handleScoreChange = (item: number) => {
    setScore([item]);
  };

  const renderStars = (hotelStar: number) => {
    return [...Array(hotelStar)].map((_, index) => (
      <AiFillStar key={index} className=" text-lg text-[#FFAD32]" />
    ));
  };

  const resetFilter = () => {
    const defaultFilter = {
      budget: [minPrice, maxPrice] as [number, number],
      duration: [] as string[],
      typeTour: [] as string[],
      hotelStar: [] as string[],
      score: [] as number[],
      isApplied: false,
    };
    setBudget(defaultFilter.budget);
    setDuration(defaultFilter.duration);
    setTypeTour(defaultFilter.typeTour);
    setHotelStar(defaultFilter.hotelStar);
    setScore(defaultFilter.score);

    if (tourData && tourData.length > 0) {
      dispatch(setTourFilter(defaultFilter));
    }
    if (hotelData && hotelData.length > 0) {
      dispatch(setHotelFilter(defaultFilter));
    }
  };

  const handleApplyFilter = (isHotel: boolean) => {
    const appliedBudget =
      budget[0] === 0 && budget[1] === 0 ? [minPrice, maxPrice] : budget;
    if (isHotel) {
      dispatch(
        setHotelFilter({
          budget: appliedBudget,
          hotelStar,
          score,
          isApplied: true,
        })
      );
    } else {
      dispatch(
        setTourFilter({
          budget: appliedBudget,
          duration,
          typeTour,
          isApplied: true,
        })
      );
    }
  };

  return (
    <div className="bg-white flex flex-col gap-4 p-4">
      {/* header section */}
      <div className="flex flex-row justify-between items-center">
        <div className="text-[#03387D] font-bold text-md">FILTER BY</div>
        <button
          onClick={resetFilter}
          className="text-[#C4C4C4] font-medium text-md hover:text-gray-600">
          CLEAR
        </button>
      </div>

      {/* budget section */}
      <div className="space-y-4">
        <p className="font-medium text-md">Budget</p>
        <div className="px-2">
          <Range
            range
            min={minPrice}
            max={maxPrice}
            value={budget}
            onChange={handleBudgetChange}
            railStyle={{ backgroundColor: "#E5E7EB" }}
            trackStyle={[{ backgroundColor: "#FF8682" }]}
            handleStyle={[
              {
                backgroundColor: "white",
                borderColor: "#FF8682",
                opacity: 1,
              },
              {
                backgroundColor: "white",
                borderColor: "#FF8682",
                opacity: 1,
              },
            ]}
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>${budget[0] || minPrice}</span>
            <span>${budget[1] || maxPrice}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 "></div>

      {tourData && (
        <>
          {/* duration section */}
          <div className="space-y-4">
            <p className="font-medium text-md">Duration</p>
            <div className="flex flex-col gap-2">
              {durationFiltered.map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-[#FF8682]"
                    checked={duration.includes(item || "")}
                    onChange={() => handleDurationChange(item || "")}
                  />
                  <span className="text-sm text-gray-600">{item}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-200 "></div>

          {/* Type Tour Section */}
          <div className="space-y-4">
            <p className="font-medium text-md">Type of Tours</p>
            <div className="flex flex-col gap-2">
              {typeTourFiltered.map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-[#FF8682]"
                    checked={typeTour.includes(item || "")}
                    onChange={() => handleTypeTourChange(item || "")}
                  />
                  <span className="text-sm text-gray-600">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}
      {hotelData && (
        <>
          {/* duration section */}
          <div className="space-y-4">
            <p className="font-medium text-md">Hotel star</p>
            <div className="flex flex-col gap-2">
              {hotelStarFiltered.map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-[#FF8682]"
                    checked={hotelStar.includes(item.toString())}
                    onChange={() => handleHotelStarChange(item.toString())}
                  />
                  <span className=" flex gap-1 text-sm text-gray-600">
                    {renderStars(item)}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-200 "></div>
          {/* score section */}
          <div className="space-y-4">
            <p className="font-medium text-md">Score</p>
            <div className="flex flex-col gap-2">
              {scoreFiltered.map((item) => (
                <label key={item.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="score-radio"
                    className="accent-[#FF8682]"
                    checked={score[0] === item.value}
                    onChange={() => handleScoreChange(item.value)}
                  />
                  <span className="text-sm text-gray-600">{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}
      <button
        onClick={() => handleApplyFilter(tourData ? false : true)}
        className="bg-[#FF7B42] text-white px-4 py-2 cursor-pointer hover:bg-[#ff8d5c] transition-colors">
        Apply Filter
      </button>
    </div>
  );
};
