import { useState, useEffect } from "react";
import Range from "rc-slider";
import "rc-slider/assets/index.css";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "@/app/slide/tourDataSlide";

interface TourData {
  duration: string;
  type: string;
  price: number;
}

export const FilterForm: React.FC = () => {
  const tourData = useSelector(
    (state: any) => state.tourDataSlide.tourData
  ) as TourData[];
  const filter = useSelector((state: any) => state.tourDataSlide.filter);
  const dispatch = useDispatch();

  const durationFiltered = [...new Set(tourData.map((item) => item.duration))];
  const typeTourFiltered = [...new Set(tourData.map((item) => item.type))];
  const minPrice = Math.min(...tourData.map((item) => item.price));
  const maxPrice = Math.max(...tourData.map((item) => item.price));

  // Local state for form values
  const [budget, setBudget] = useState<[number, number]>(
    filter?.budget || [minPrice, maxPrice]
  );
  const [duration, setDuration] = useState<string[]>(filter?.duration || []);
  const [typeTour, setTypeTour] = useState<string[]>(filter?.typeTour || []);

  // Update local state when filter changes
  useEffect(() => {
    setBudget(filter?.budget || [minPrice, maxPrice]);
    setDuration(filter?.duration || []);
    setTypeTour(filter?.typeTour || []);
  }, [filter, minPrice, maxPrice]);

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

  const resetFilter = () => {
    const defaultFilter = {
      budget: [minPrice, maxPrice] as [number, number],
      duration: [] as string[],
      typeTour: [] as string[],
      isApplied: false,
    };
    setBudget(defaultFilter.budget);
    setDuration(defaultFilter.duration);
    setTypeTour(defaultFilter.typeTour);
    dispatch(setFilter(defaultFilter));
  };

  const handleApplyFilter = () => {
    dispatch(
      setFilter({
        budget,
        duration,
        typeTour,
        isApplied: true,
      })
    );
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

      {/* duration section */}
      <div className="space-y-4">
        <p className="font-medium text-md">Duration</p>
        <div className="flex flex-col gap-2">
          {durationFiltered.map((item) => (
            <label key={item} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-[#FF8682]"
                checked={duration.includes(item)}
                onChange={() => handleDurationChange(item)}
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
                checked={typeTour.includes(item)}
                onChange={() => handleTypeTourChange(item)}
              />
              <span className="text-sm text-gray-600">{item}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleApplyFilter}
        className="bg-[#FF7B42] text-white px-4 py-2 cursor-pointer hover:bg-[#ff8d5c] transition-colors">
        Apply Filter
      </button>
    </div>
  );
};
