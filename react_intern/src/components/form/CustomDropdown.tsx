import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTotalGuest } from "@/app/slide/tourDataSlide";
import { AiOutlineArrowRight } from "react-icons/ai";
import {
  UseFormRegister,
  UseFormHandleSubmit,
  Path,
  UseFormSetValue,
} from "react-hook-form";
import { HotelFormData } from "@/types/hotel";
import { useTranslation } from "react-i18next";
interface CustomDropdownProps<
  T extends { adult: any; child: any; type?: string[] },
> {
  isOpen?: boolean;
  onToggle?: () => void;
  placeholder?: string;
  icon?: ReactNode;
  isTotalGuest?: boolean;
  isSelect: boolean;
  isDuration?: boolean;
  tourDetail?: TourDetail;
  hotelData?: HotelFormData;
  register: UseFormRegister<T>;
  handleSubmit: UseFormHandleSubmit<T>;
  errors?: any;
  type?: string[];
  watch?: any;
  totalGuest?: {
    adult: number;
    child: number;
  };
  setValue?: UseFormSetValue<T>;
}

interface TourDetail {
  startDate: string;
  endDate: string;
}

export const CustomDropdown = <
  T extends { adult: any; child: any; type?: string[] },
>({
  isOpen,
  onToggle,
  placeholder,
  icon,
  isTotalGuest,
  isSelect,
  isDuration,
  tourDetail,
  hotelData,
  register,
  handleSubmit,
  errors,
  type,
  watch,
  totalGuest,
  setValue,
}: CustomDropdownProps<T>) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // State để lưu lựa chọn đã xác nhận cho type
  const [selectedTypeConfirmed, setSelectedTypeConfirmed] = React.useState<
    string[]
  >([]);
  console.log(totalGuest);

  // Lấy giá trị type hiện tại từ react-hook-form
  const selectedTypes = watch && type ? watch("type") : [];
  const onConfirm = (data: any) => {
    dispatch(setTotalGuest({ adult: data.adult, child: data.child }));
    onToggle?.();
  };

  // Hàm xác nhận lựa chọn type
  const onConfirmType = () => {
    if (selectedTypes && selectedTypes.length > 0) {
      setSelectedTypeConfirmed(
        Array.isArray(selectedTypes) ? selectedTypes : [selectedTypes]
      );
      onToggle?.();
    } else {
      setSelectedTypeConfirmed([]);
      onToggle?.();
    }
  };

  useEffect(() => {
    if (isTotalGuest && setValue && totalGuest) {
      if (typeof totalGuest.adult === "number")
        setValue("adult" as Path<T>, totalGuest.adult as any, {
          shouldValidate: true,
        });
      if (typeof totalGuest.child === "number")
        setValue("child" as Path<T>, totalGuest.child as any, {
          shouldValidate: true,
        });
    }
  }, [isTotalGuest, setValue, totalGuest]);

  return (
    <div className="relative bg-white w-full dark:bg-[#2121216b] dark:text-[#ffffff]">
      <div className="absolute left-5 top-1/2 -translate-y-1/2">{icon}</div>
      <div
        onClick={onToggle}
        className="w-full py-5 pl-12 pr-4 text-sm cursor-pointer flex justify-between items-center">
        {/* Hiển thị cho dropdown số khách */}
        {isTotalGuest ? (
          <span
            className={
              totalGuest?.adult !== undefined
                ? "text-black dark:text-[#ffffff]"
                : "text-gray-500 dark:text-[#bbbbbb]"
            }>
            {totalGuest?.adult !== undefined
              ? `${totalGuest?.adult} ${t("formSearch.input.Adult")}, ${totalGuest?.child} ${t("formSearch.input.Child")}`
              : placeholder}
          </span>
        ) : type ? (
          <span
            className={
              selectedTypes && selectedTypes.length > 0
                ? "text-black dark:text-[#ffffff]"
                : "text-gray-500 dark:text-[#bbbbbb]"
            }>
            {selectedTypes && selectedTypes.length > 0
              ? Array.isArray(selectedTypes)
                ? selectedTypes.join(", ")
                : selectedTypes
              : placeholder}
          </span>
        ) : (
          <span className="text-gray-500">{placeholder}</span>
        )}
        {isDuration && (
          <div className="flex-1 flex items-center gap-2">
            {tourDetail?.startDate || hotelData?.startDate}
            <AiOutlineArrowRight /> {tourDetail?.endDate || hotelData?.endDate}
          </div>
        )}
        <div className="absolute right-5 top-1/2 -translate-y-1/2">
          {isSelect && (isOpen ? <AiFillCaretUp /> : <AiFillCaretDown />)}
        </div>
      </div>

      {/* Dropdown chọn loại tour */}
      {type && isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white dark:bg-[#2d2b2b] dark:border-gray-700 border border-gray-200 rounded-md shadow-lg max-h-[200px] overflow-y-auto p-4 flex flex-col gap-2">
          {type.map((item: string) => (
            <label
              key={item}
              className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                value={item}
                {...register("type" as Path<T>)}
                className="accent-[#FF7B42]"
                defaultChecked={selectedTypeConfirmed.includes(item)}
              />
              <span className="text-gray-700 dark:text-[#bbbbbb]">{item}</span>
            </label>
          ))}
          <button
            type="button"
            onClick={onConfirmType}
            className="mt-2 bg-[#FF7B42] w-full font-medium text-white py-2 hover:bg-orange-600 transition-colors rounded-md">
            Confirm
          </button>
        </div>
      )}

      {/* Dropdown chọn số khách */}
      {isTotalGuest && isOpen && (
        <form
          onSubmit={handleSubmit(onConfirm)}
          className="absolute z-20 w-full mt-1 bg-white dark:bg-[#2d2b2b] border border-gray-200 dark:border-gray-700 rounded-md shadow-lg min-h-fit overflow-y-auto">
          <div className="flex flex-col py-5 px-5 gap-6">
            <div className="flex flex-row gap-4">
              <div className="flex flex-col">
                <p className="text-gray-600 text-sm mb-2 font-medium dark:text-white">
                  {t("formSearch.input.Adult")}
                </p>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-200 rounded-md"
                  {...register("adult" as Path<T>, {
                    valueAsNumber: true,
                    min: { value: 0, message: "Must be at least 0" },
                    max: { value: 100, message: "Must be at most 100" },
                  })}
                />
                {errors?.adult && (
                  <span className="text-red-500 text-xs">
                    {errors.adult.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <p className="text-gray-600 text-sm mb-2 font-medium dark:text-white">
                  {t("formSearch.input.Child")}
                </p>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-200 rounded-md"
                  {...register("child" as Path<T>, {
                    valueAsNumber: true,
                    min: { value: 0, message: "Must be at least 0" },
                    max: { value: 100, message: "Must be at most 100" },
                  })}
                />
                {errors?.child && (
                  <span className="text-red-500 text-xs">
                    {errors.child.message}
                  </span>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#FF7B42] w-full font-medium text-white py-5 hover:bg-orange-600 transition-colors rounded-md">
              {t("Confirm")}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
