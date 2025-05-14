import { HotelFormData } from "@/types/hotel";
import { AiFillStar } from "react-icons/ai";
import { FaBookmark } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";

interface HotelCardProps {
  data: HotelFormData;
  onClick?: () => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({ data, onClick }) => {
  const renderStars = (hotelStar: number) => {
    return [...Array(hotelStar)].map((_, index) => (
      <AiFillStar key={index} className="text-xl lg:text-xl text-[#FFAD32]" />
    ));
  };
  const minPrice = Math.min(...(data?.rooms?.map((item) => item.price) || []));
  return (
    <div
      className="flex flex-col w-full cursor-pointer hover:scale-105 transition-all duration-300"
      onClick={onClick}>
      <div className="relative aspect-[4/3] w-full overflow-hidden min-h-[249px]">
        {data?.reviews?.rating && data?.reviews?.rating > 0 && (
          <div className="absolute bottom-4 left-0 flex items-center gap-2 ml-5">
            {renderStars(data?.hotelStar)}
          </div>
        )}

        <div
          className={`absolute top-0 right-4 ${data?.isSave ? "text-[#FF7B42]" : "text-[#FFFFFF]"}`}>
          <FaBookmark className="text-3xl" />
        </div>

        <img
          className="h-full w-full object-cover"
          src={data?.image[0]}
          alt={data?.title}
          loading="lazy"
        />
      </div>

      <div className="flex flex-col gap-2">
        {data?.location && (
          <div className="flex items-center gap-2 mt-2">
            <HiOutlineLocationMarker className="text-2xl text-[#FF7B42]" />
            <p className="text-gray-600 dark:text-[#bbbbbb] text-sm">
              {data?.location}
            </p>
          </div>
        )}
        <p className=" text-lg font-medium">{data?.title}</p>

        <div className="flex items-center justify-between mt-2 ">
          <div className="flex items-center gap-1">
            <p className=" text-sm font-medium text-white bg-[#FF7B42] w-fit px-2 py-1">
              Rating: {data?.reviews?.rating}
            </p>
            <p className="text-sm text-gray-500 dark:text-[#bbbbbb]">
              ({data?.reviews?.totalReviews} reviews)
            </p>
          </div>
          <p className="text-sm text-gray-500 dark:text-[#bbbbbb]">
            from
            <span className="text-xl font-medium ml-1 text-black dark:text-white">
              ${minPrice}
            </span>
            /night
          </p>
        </div>
      </div>
    </div>
  );
};
