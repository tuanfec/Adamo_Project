import React from "react";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";

interface FilterProps {
  isFilter: boolean;
  setIsFilter: (value: boolean) => void;
}

export const Filter: React.FC<FilterProps> = ({ isFilter, setIsFilter }) => {
  const { t } = useTranslation();
  return isFilter ? (
    <button
      onClick={() => setIsFilter(!isFilter)}
      className="bg-white flex items-center justify-around px-2 gap-2 text-black h-[38px] w-fit  mt-4 border border-black">
      {t("filter.title")} <IoMdClose />
    </button>
  ) : (
    <button
      onClick={() => setIsFilter(!isFilter)}
      className="bg-black dark:bg-[#FF7B42] dark:text-white cursor-pointer h-[38px] w-[75px]  mt-4 text-white">
      {t("filter.title")}
    </button>
  );
};
