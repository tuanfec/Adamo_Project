import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FilterForm } from "@/components/form/FilterForm";
import { HotelFormData } from "@/types/hotel";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setSortBy } from "@/app/slide/hotelDataSlide";
import { SortDropdown } from "@/components/hotels/SortDropdown";

export const Header: React.FC<{
  hotelData: HotelFormData[];
}> = ({ hotelData }) => {
  const dispatch = useDispatch();
  const [isFilter, setIsFilter] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const [sortBy] = useState([
    "Price high to low",
    "Price low to high",
    "Rating",
    "Star",
  ]);
  const [sortByIndex, setSortByIndex] = useState(0);

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between  lg:items-center relative my-10">
      <p className="text-4xl mb-6 lg:mb-0 md:mb-6 font-medium">Hotels</p>
      <div className="flex justify-between items-center gap-8">
        <div
          onClick={() => setIsSort((prev) => !prev)}
          className="flex items-center gap-2 cursor-pointer select-none">
          <p className="text-lg font-medium text-[#FF7B42]">SORT BY:</p>
          <div className="flex gap-2 relative items-center">
            <p className="text-lg font-md text-[#4F4F4F]">
              {sortBy[sortByIndex]}
            </p>
            <span>{isSort ? <FaAngleUp /> : <FaAngleDown />}</span>
            {isSort && (
              <SortDropdown
                options={sortBy}
                selectedIndex={sortByIndex}
                onSelect={(index) => {
                  setSortByIndex(index);
                  dispatch(setSortBy(sortBy[index]));
                }}
              />
            )}
          </div>
        </div>
        {isFilter ? (
          <button
            onClick={() => setIsFilter(false)}
            className="bg-white flex items-center justify-around cursor-pointer px-2 gap-2 text-black h-[38px] w-[85px] border border-black">
            Filter <IoMdClose />
          </button>
        ) : (
          <button
            onClick={() => setIsFilter(true)}
            className="bg-black h-[38px] w-[75px] cursor-pointer text-white">
            Filter
          </button>
        )}
        {isFilter && (
          <div className="absolute lg:w-1/3 md:w-1/2 w-full top-20 lg:right-0 md:right-0 z-10 shadow-lg">
            <FilterForm hotelData={hotelData} />
          </div>
        )}
      </div>
    </div>
  );
};
