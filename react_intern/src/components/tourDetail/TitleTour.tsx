import { FaStar } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useSelector } from "react-redux";
import { TourData } from "@/types/tour";

export const HeaderDetail: React.FC = () => {
  const tourDetail = useSelector(
    (state: any) => state.tourDataSlide.tourDetail
  ) as TourData;

  return (
    <div className="flex flex-col gap-4 my-6">
      <div className="lg:text-3xl text-2xl font-medium">
        {tourDetail?.title}
      </div>
      <div className="flex items-center gap-2 mt-2">
        <HiOutlineLocationMarker className="text-2xl text-[#FF7B42]" />
        <p className="text-gray-600 text-sm">{tourDetail?.location}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="bottom-4 flex items-center gap-2 bg-[#FF7B42] h-[30px] w-[65px] text-white">
          <FaStar className="ml-4" />
          <span>{tourDetail?.reviews?.rating.toFixed(1)}</span>
        </div>
        <div className="text-gray-600 text-sm">
          {tourDetail?.reviews?.totalReviews} reviews
        </div>
      </div>
    </div>
  );
};
