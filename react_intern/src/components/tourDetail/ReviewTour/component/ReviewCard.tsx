import { ReviewStats } from "@/types/tour";
import { useTranslation } from "react-i18next";
import { AiFillStar } from "react-icons/ai";

interface ReviewCardProps {
  stats: ReviewStats;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ stats }) => {
  const { t } = useTranslation();

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <AiFillStar
        key={index}
        className={`text-xl lg:text-2xl ${
          index < rating ? "text-[#FFAD32]" : "text-gray-300"
        }`}
      />
    ));
  };

  const calculatePercentage = (count: number) => {
    return (count / stats.totalReviews) * 100;
  };

  return (
    <div className="border border-gray-200 dark:border-gray-600 rounded-lg my-10 p-6 max-w-2xl">
      <div className="flex flex-col lg:flex-row md:flex-row items-center lg:gap-12 md:gap-6">
        {/* Left side - Overall rating */}
        <div className="text-center mb-6 lg:mb-0">
          <div className="text-3xl lg:text-5xl font-bold mb-2">
            {stats.rating}
            <span className="text-xl lg:text-3xl text-gray-400">/5</span>
          </div>
          <div className="flex justify-center mb-2">
            {renderStars(Math.floor(stats.rating))}
          </div>
          <p className="text-gray-600 dark:text-[#bbbbbb]">
            Based on {stats.totalReviews} reviews
          </p>
        </div>

        {/* Right side - Rating breakdown */}
        <div className="flex-1 w-full min-w-0">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-2 mb-2">
              <span className="w-3">{star}</span>
              <AiFillStar className="text-yellow-400" />
              <div className="flex-1 h-2 bg-gray-200 rounded-full w-full min-w-0">
                <div
                  className="h-full bg-yellow-400 rounded-full"
                  style={{
                    width: `${calculatePercentage(stats.ratingBreakdown[star] || 0)}%`,
                  }}
                />
              </div>
              <span className="w-20 text-right text-gray-600 dark:text-[#bbbbbb]">
                {stats.ratingBreakdown[star] || 0} reviews
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
