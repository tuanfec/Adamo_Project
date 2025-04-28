import { CiLocationOn } from "react-icons/ci";
import { LuCalendarClock } from "react-icons/lu";
import { IoFlagOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { useState } from "react";
import { CustomDropdown } from "./CustomDropdown";
import { FormTitle } from "./FormTitle";
import { FormHeader } from "./FormHeader";

interface SearchTourProps {
  isHeader: boolean;
}

export const SearchTour: React.FC<SearchTourProps> = ({ isHeader }) => {
  const [isOpenTour, setIsOpenTour] = useState(false);
  const [isOpenGuests, setIsOpenGuests] = useState(false);
  const [selectedTour, setSelectedTour] = useState("");
  const [selectedGuests, setSelectedGuests] = useState("");

  const tourTypes = [
    "Adventure Tour",
    "Cultural Tour",
    "Beach Tour",
    "Food Tour",
    "Eco Tour",
  ];

  const handleTourClick = () => {
    setIsOpenTour(!isOpenTour);
    setIsOpenGuests(false);
  };

  const handleGuestsClick = () => {
    setIsOpenGuests(!isOpenGuests);
    setIsOpenTour(false);
  };

  const formatGuestCount = (value: string) => {
    const count = parseInt(value);
    return `${count} ${count === 1 ? "Guest" : "Guests"}`;
  };

  return (
    <div className="w-full h-full lg:w-[70%]">
      <div className="w-full bg-gray-300/60 backdrop-blur-md h-full">
        {isHeader && <FormHeader title1="Tours" title2="Hotels" />}
        <div className="flex flex-col gap-5 p-6">
          <FormTitle title="Discover beautiful Vietnam" />

          <div className="flex flex-col gap-5">
            <div className="relative bg-white w-full">
              <div className="absolute left-5 top-1/2 -translate-y-1/2">
                <CiLocationOn className="text-xl text-[#FF7B42]" />
              </div>
              <input
                type="text"
                placeholder="Location"
                className="w-full py-5 pl-12 pr-4 text-sm outline-none"
              />
            </div>
            <div className="relative bg-white w-full">
              <div className="absolute left-5 top-1/2 -translate-y-1/2">
                <LuCalendarClock className="text-xl text-[#FF7B42]" />
              </div>
              <input
                placeholder="Departure time"
                className="w-full py-5 pl-12 pr-4 text-sm outline-none cursor-pointer"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <CustomDropdown
              isOpen={isOpenTour}
              onToggle={handleTourClick}
              placeholder="Type of tour"
              isSelect={true}
              icon={<IoFlagOutline className="text-xl text-[#FF7B42]" />}
            />

            <CustomDropdown
              isOpen={isOpenGuests}
              isTotalGuest={true}
              onToggle={handleGuestsClick}
              isSelect={true}
              placeholder="Number of guests"
              icon={<FiUsers className="text-xl text-[#FF7B42]" />}
            />
          </div>

          <button className="bg-[#FF7B42] font-medium text-white py-5 hover:bg-orange-600 transition-colors rounded-md">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};
