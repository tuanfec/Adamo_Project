import { ReviewStats } from "@/types/tour";

interface ReviewCardHotelProps {
  stats: ReviewStats;
  onClick: () => void;
}

export const ReviewCardHotel: React.FC<ReviewCardHotelProps> = ({
  stats,
  onClick,
}) => {
  const typeRate = {
    9.5: "Wonderful",
    9: "Very Good",
    8: "Good",
    7: "Pleasant",
  };
  return (
    <div className="flex gap-5 items-center">
      <div className="text-5xl my-10 font-bold size-30 bg-[#FF7B42] text-white justify-center items-center flex ">
        {stats.rating}
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-3xl font-medium">
          {typeRate[stats.rating as keyof typeof typeRate]}
        </div>
        <div className="flex items-center gap-2">
          <p className="text-gray-600">Base on</p>
          <span className="font-medium text-[#4F4F4F]">
            {" "}
            {stats.totalReviews} reviews
          </span>
        </div>
        <div
          onClick={onClick}
          className="text-[#FF7B42] font-medium mt-2 cursor-pointer bg-white border border-[#FF7B42] text-center px-4 py-2">
          Write a review
        </div>
      </div>
    </div>
  );
};
