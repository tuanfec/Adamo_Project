import { useState } from "react";
import { FilterForm } from "@/components/form/FilterForm";
import { HotelFormData } from "@/types/hotel";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setSortBy } from "@/app/slide/hotelDataSlide";
import { SortDropdown } from "@/components/hotels/SortDropdown";
import { Filter } from "@/components/common/Filter";
import { useTranslation } from "react-i18next";

export const Header: React.FC<{
  hotelData: HotelFormData[];
  header: string;
}> = ({ hotelData, header }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isFilter, setIsFilter] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const sortBy = [
    t("Sort.Type.lowH"),
    t("Sort.Type.highL"),
    t("Sort.Type.rate"),
    t("Sort.Type.star"),
  ];

  const [sortByIndex, setSortByIndex] = useState(0);
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between  lg:items-center relative mb-10">
      <p className="text-4xl mb-6 dark:text-white text-black lg:mb-0 md:mb-6 font-medium">
        {header}
      </p>
      <div className="flex justify-between items-center gap-8">
        <div
          onClick={() => setIsSort((prev) => !prev)}
          className="flex items-center gap-2 cursor-pointer select-none">
          <p className="text-lg font-medium text-[#FF7B42]">SORT BY:</p>
          <div className="flex gap-2 relative items-center">
            <p className="text-lg font-md text-[#4F4F4F] dark:text-[#bbbbbb]">
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
        <Filter isFilter={isFilter} setIsFilter={setIsFilter} />

        {isFilter && (
          <div className="absolute lg:w-1/3 md:w-1/2 w-full top-30 lg:right-0 md:right-0 z-10 shadow-lg">
            <FilterForm hotelData={hotelData} />
          </div>
        )}
      </div>
    </div>
  );
};
