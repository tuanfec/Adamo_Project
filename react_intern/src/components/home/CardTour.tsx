import { FaStar, FaBookmark } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { LuCalendarClock } from "react-icons/lu";

interface CardTourProps {
  image?: string;
  title?: string;
  description?: string;
  experiences?: number;
  location?: string;
  votes?: number;
  duration?: string;
  price?: number;
  isSave?: boolean;
  onClick?: () => void;
  isHover?: boolean;
}

export const CardTour: React.FC<CardTourProps> = ({
  image,
  title,
  description,
  experiences,
  location,
  votes,
  duration,
  price,
  isSave,
  onClick,
  isHover,
}) => {
  return (
    <div
      className={`flex flex-col w-full ${isHover ? "hover:scale-105 transition-all duration-300" : ""}`}
      onClick={onClick}>
      <div className="relative aspect-[4/3] w-full overflow-hidden min-h-[291px]">
        {votes && votes > 0 && (
          <div className="absolute bottom-4 left-0 flex items-center  gap-2 bg-[#FF7B42] h-[30px] w-[65px] text-white">
            <FaStar className=" ml-2" />
            <span>{votes}</span>
          </div>
        )}

        {price && location && (
          <div
            className={`absolute top-0 right-4 ${isSave ? "text-[#FF7B42]" : "text-[#FFFFFF]"}`}>
            <FaBookmark className="text-3xl" />
          </div>
        )}

        <img
          className="h-full w-full object-cover"
          src={image}
          alt={title}
          loading="lazy"
        />
      </div>

      {location && (
        <div className="flex items-center gap-2 mt-2">
          <HiOutlineLocationMarker className="text-2xl text-[#FF7B42]" />
          <p className="text-gray-600 dark:text-[#bbbbbb] text-sm">
            {location}
          </p>
        </div>
      )}

      <p className="lg:text-xl dark:text-[#ffffff] md:text-lg text-base font-medium mt-1">
        {title}
      </p>

      <div className="flex items-center justify-between lg:mt-1">
        {duration && (
          <div className="flex items-center gap-2 ">
            <LuCalendarClock className="text-xl text-[#FF7B42]" />
            <p className="text-gray-600 dark:text-[#bbbbbb]">{duration}</p>
          </div>
        )}
        {price && (
          <div className="flex items-center gap-2">
            <p className="text-gray-600 dark:text-[#bbbbbb] text-sm">from </p>
            <span className="font-medium dark:text-[#ffffff] text-xl mb-1">
              ${price}
            </span>
          </div>
        )}
      </div>

      {description && <p className="text-gray-600">{description}</p>}

      {experiences && (
        <p className="font-thin text-[#1C1C1E] ">{experiences} experiences</p>
      )}
    </div>
  );
};
