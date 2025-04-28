import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { ReactNode, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTotalGuest } from "@/app/slide/tourDataSlide";
import { AiOutlineArrowRight } from "react-icons/ai";

interface CustomDropdownProps {
  isOpen?: boolean;
  onToggle?: () => void;
  placeholder?: string;
  icon?: ReactNode;
  isTotalGuest?: boolean;
  isSelect: boolean;
  isDuration?: boolean;
  tourDetail?: TourDetail;
}

interface TourDetail {
  startDate: string;
  endDate: string;
}

export const CustomDropdown = ({
  isOpen,
  onToggle,
  placeholder,
  icon,
  isTotalGuest,
  isSelect,
  isDuration,
  tourDetail,
}: CustomDropdownProps) => {
  const dispatch = useDispatch();
  const [adult, setAdult] = useState<number>(0);
  const [child, setChild] = useState<number>(0);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const totalGuest = useSelector(
    (state: any) => state.tourDataSlide.totalGuest
  );
  return (
    <div className="relative bg-white w-full">
      <div className="absolute left-5 top-1/2 -translate-y-1/2">{icon}</div>
      <div
        onClick={onToggle}
        className="w-full py-5 pl-12 pr-4 text-sm cursor-pointer flex justify-between items-center">
        <span className={confirmed ? "text-black" : "text-gray-500"}>
          {isTotalGuest && confirmed
            ? `${totalGuest?.adult} Adult, ${totalGuest?.child} Child`
            : placeholder}
        </span>
        {isDuration && (
          <div className="flex-1 flex items-center gap-2">
            {tourDetail?.endDate} <AiOutlineArrowRight />{" "}
            {tourDetail?.startDate}
          </div>
        )}
        <div className="absolute right-5 top-1/2 -translate-y-1/2">
          {isSelect && (isOpen ? <AiFillCaretUp /> : <AiFillCaretDown />)}
        </div>
      </div>
      {isTotalGuest && isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-[200px] overflow-y-auto">
          <div className="flex flex-col py-5 px-5 gap-6">
            <div className="flex flex-row gap-4">
              <div className="flex flex-col">
                <p className="text-gray-600 text-sm mb-2 font-medium">Adult</p>
                <input
                  type="number"
                  value={adult}
                  onChange={(e) => setAdult(Number(e.target.value))}
                  className="w-full p-2 border border-gray-200 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-gray-600 text-sm mb-2 font-medium">Child</p>
                <input
                  type="number"
                  value={child}
                  onChange={(e) => setChild(Number(e.target.value))}
                  className="w-full p-2 border border-gray-200 rounded-md"
                />
              </div>
            </div>
            <button
              onClick={() => {
                dispatch(setTotalGuest({ adult, child }));
                setConfirmed(true);
                onToggle?.();
              }}
              className="bg-[#FF7B42] w-full font-medium text-white py-5 hover:bg-orange-600 transition-colors rounded-md">
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
