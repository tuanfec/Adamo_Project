import { LuCalendarClock } from "react-icons/lu";

import { FiUsers } from "react-icons/fi";
import { CustomDropdown } from "./CustomDropdown";
import { useSelector } from "react-redux";
import { useState } from "react";

export const DetailCardForm: React.FC = () => {
  const tourDetail = useSelector(
    (state: any) => state.tourDataSlide.tourDetail
  );
  const totalGuest = useSelector(
    (state: any) => state.tourDataSlide.totalGuest
  );
  const [isOpenTotalGuest, setIsOpenTotalGuest] = useState(false);
  const total =
    tourDetail?.price * totalGuest?.adult +
    (tourDetail?.price * totalGuest?.child) / 2;
  return (
    <div className="w-full h-full ">
      <div className="w-full bg-[#F4F4F4] backdrop-blur-md ">
        <div className="flex flex-col gap-4 py-7 px-7">
          <div className="flex items-center gap-2 ">
            <p className="text-gray-600 text-sm"> from </p>
            <span className="font-medium text-gray-600 text-xl mb-1">
              ${tourDetail?.price}
            </span>
          </div>

          <div className="border-b border-gray-400"></div>
          <div className="flex items-center gap-[30%]">
            <div className="flex flex-col">
              <p className="text-gray-600 text-sm">Duration:</p>
              <span className="font-medium">{tourDetail?.duration}</span>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-600 text-sm">Type:</p>
              <span className="font-medium">{tourDetail?.type}</span>
            </div>
          </div>
          <div className="flex flex-col ">
            <div className="flex flex-col gap-6 py-5">
              <CustomDropdown
                icon={<LuCalendarClock className="text-xl text-[#FF7B42]" />}
                isSelect={false}
                isDuration={true}
                tourDetail={tourDetail}
              />

              <CustomDropdown
                isOpen={isOpenTotalGuest}
                isTotalGuest={true}
                onToggle={() => setIsOpenTotalGuest(!isOpenTotalGuest)}
                placeholder="Number of guests"
                icon={<FiUsers className="text-xl text-[#FF7B42]" />}
                isSelect={true}
              />
            </div>
            <div className="flex items-center justify-between my-3 gap-2 mb-10">
              <p className="text-gray-600 text-xl font-medium">Total: </p>{" "}
              <p className="font-bold text-xl ">
                ${total || tourDetail?.price}
              </p>
            </div>

            <button className="bg-[#FF7B42] font-medium text-white py-5 hover:bg-orange-600 transition-colors rounded-md">
              Book now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
