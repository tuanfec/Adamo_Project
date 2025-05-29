import { BiSolidCircleHalf } from "react-icons/bi";
import { ContentCard } from "./ContentCard";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { QRImage } from "../common/QR";

interface DataBook {
  data: any;
}

export const CardBook: React.FC<DataBook> = ({ data }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/booking_history/${data.id}`, {
      state: {
        data: data,
      },
    });
  };
  const isHotel = data?.hotelData ? true : false;
  const { t } = useTranslation();
  return (
    <div
      onClick={handleClick}
      className="flex gap-1 rounded-md transition-all duration-300 hover:scale-102 cursor-pointer">
      <img
        src={isHotel ? data?.hotelData?.image[0] : data?.tourDetail?.image[0]}
        alt={data.name}
        className="object-cover aspect-[1/1]  lg:w-1/5 lg:h-1/4 md:w-1/3 w-1/3 rounded-l-md"
      />

      <div className="dark:bg-[#515158] bg-[#e2e2e3] w-full rounded-r-md relative">
        <div className="p-3 md:p-3 lg:p-5">
          <ContentCard isHotel={isHotel} data={data} />
        </div>
        <BiSolidCircleHalf className="size-4 md:size-7 absolute left-[-10px] md:left-[-16px] rotate-90 md:top-[-17px] top-[-8px] lg:top-[-14px] dark:text-[#1E1E1E] text-white" />
        <BiSolidCircleHalf className="size-4 md:size-7 absolute left-[-10px] md:left-[-16px] -rotate-90 md:bottom-[-17px] bottom-[-8px] lg:bottom-[-14px] dark:text-[#1E1E1E] text-white" />
        <div className="absolute top-0 right-0 dark:bg-[#333B4C] bg-[#c2c2c4] text-white rounded-bl-md px-6 py-1 italic text-xs font-medium md:text-sm lg:text-base">
          {isHotel ? t("booking.Hotel") : t("booking.Tour")}
        </div>
      </div>
      <div className="hidden relative lg:block md:block  bg-[#e2e2e3] rounded-md w-1/3">
        <GoDotFill className="absolute size-4 md:size-7 left-[-10px] md:left-[-16px] md:top-[25%] top-[-8px] lg:top-[25%] dark:text-[#1E1E1E] text-white" />
        <GoDotFill className="absolute size-4 md:size-7 left-[-10px] md:left-[-16px] md:top-[45%] top-[-8px] lg:top-[45%] dark:text-[#1E1E1E] text-white" />
        <GoDotFill className="absolute size-4 md:size-7 left-[-10px] md:left-[-16px] md:top-[65%] top-[-8px] lg:top-[65%] dark:text-[#1E1E1E] text-white" />
        <BiSolidCircleHalf className="size-4 md:size-7 absolute left-[-10px] md:left-[-16px] rotate-90 md:top-[-17px] top-[-8px] lg:top-[-14px] dark:text-[#1E1E1E] text-white" />
        <BiSolidCircleHalf className="size-4 md:size-7 absolute left-[-10px] md:left-[-16px] -rotate-90 md:bottom-[-17px] bottom-[-8px] lg:bottom-[-14px] dark:text-[#1E1E1E] text-white" />
        <div className="flex justify-center  items-center h-full">
          <QRImage
            value={`${import.meta.env.VITE_BASE_URL}/booking_history/${data.id}`}
          />
        </div>
      </div>
    </div>
  );
};
