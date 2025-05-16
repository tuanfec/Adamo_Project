import { ReviewStats } from "@/types/tour";
import { useTranslation } from "react-i18next";

interface ReviewCardHotelProps {
  stats: ReviewStats;
  onClick: () => void;
}

export const ReviewCardHotel: React.FC<ReviewCardHotelProps> = ({
  stats,
  onClick,
}) => {
  const { t } = useTranslation();
  const typeRate = {
    9.5: t("ReviewCard.Wonderful"),
    9: t("ReviewCard.VeryGood"),
    8: t("ReviewCard.Good"),
    7: t("ReviewCard.Pleasant"),
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
          <p className="text-gray-600 dark:text-[#bbbbbb]">
            {t("ReviewCard.Baseon")}
          </p>
          <span className="font-medium text-[#4F4F4F] dark:text-[#d8d8d8]">
            {" "}
            {stats.totalReviews} {t("ReviewCard.reviews")}
          </span>
        </div>
        <div
          onClick={onClick}
          className="text-[#FF7B42] font-medium mt-2 cursor-pointer bg-white border dark:bg-[#575656] dark:border-gray-300 dark:text-[#d8d8d8] border-[#FF7B42] text-center px-4 py-2">
          {t("ReviewCard.Writereview")}{" "}
        </div>
      </div>
    </div>
  );
};
