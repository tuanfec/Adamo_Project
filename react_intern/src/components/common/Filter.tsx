import React from "react";
import { IoMdClose } from "react-icons/io";

interface FilterProps {
  isFilter: boolean;
  setIsFilter: (value: boolean) => void;
}

export const Filter: React.FC<FilterProps> = ({ isFilter, setIsFilter }) => {
  return isFilter ? (
    <button
      onClick={() => setIsFilter(!isFilter)}
      className="bg-white flex items-center justify-around px-2 gap-2 text-black h-[38px] w-[85px]  mt-4 border border-black">
      Filter <IoMdClose />
    </button>
  ) : (
    <button
      onClick={() => setIsFilter(!isFilter)}
      className="bg-black dark:bg-[#FF7B42] dark:text-white cursor-pointer h-[38px] w-[75px]  mt-4 text-white">
      Filter
    </button>
  );
};
