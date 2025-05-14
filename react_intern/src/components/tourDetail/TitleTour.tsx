import { FaStar } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TourData } from "@/types/tour";
import { HotelFormData } from "@/types/hotel";
import { AiFillStar } from "react-icons/ai";
interface HeaderDetailProps {
  tourData?: TourData;
  hotelData?: HotelFormData;
}
export const HeaderDetail: React.FC<HeaderDetailProps> = ({
  tourData,
  hotelData,
}) => {
  const renderStars = (hotelStar: number) => {
    return [...Array(hotelStar)].map((_, index) => (
      <AiFillStar key={index} className="text-xl lg:text-xl text-[#FFAD32]" />
    ));
  };

  return (
    <div className="flex flex-col gap-4 my-6">
      <div className="lg:text-3xl text-2xl font-medium">
        {tourData?.title || hotelData?.title}
      </div>
      <div className="flex items-center gap-2 mt-2">
        <HiOutlineLocationMarker className="text-2xl text-[#FF7B42]" />
        <p className="text-gray-600 text-sm dark:text-[#bbbbbb]">
          {tourData?.location || hotelData?.location}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {tourData?.reviews?.rating && (
          <div className="bottom-4 flex items-center gap-2 bg-[#FF7B42] h-[30px] w-[65px] text-white">
            <FaStar className="ml-4" />
            <span>{tourData?.reviews?.rating.toFixed(1)}</span>
          </div>
        )}
        {hotelData?.reviews?.rating && (
          <div className="bottom-4 flex items-center font-medium gap-2 bg-[#FF7B42] h-[30px] w-fit px-2 text-white">
            Rating
            <span>{hotelData?.reviews?.rating.toFixed(1)}</span>
          </div>
        )}
        <div className="text-gray-600 text-sm mr-4 dark:text-[#bbbbbb]">
          ({tourData?.reviews?.totalReviews || hotelData?.reviews?.totalReviews}{" "}
          reviews)
        </div>
        {hotelData?.reviews?.rating && renderStars(hotelData?.hotelStar)}
      </div>
    </div>
  );
};
