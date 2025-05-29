import { Comment } from "@/types/tour";
import { AiFillStar } from "react-icons/ai";
import { AvatarCard } from "./AvatarCard";
import { GoDotFill } from "react-icons/go";
import { useTranslation } from "react-i18next";

interface CommentProps {
  data: Comment;
  isHotel: boolean;
}
export const ListComment: React.FC<CommentProps> = ({ data, isHotel }) => {
  const { t } = useTranslation();
  const typeRate = {
    9.5: t("ReviewCard.Wonderful"),
    9: t("ReviewCard.VeryGood"),
    8: t("ReviewCard.Good"),
    7: t("ReviewCard.Pleasant"),
  };
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <AiFillStar
        key={index}
        className={`text-2xl ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };
  return (
    <div className="flex flex-col">
      <div className="flex w-full flex-row gap-4">
        <div className="w-1/8 h-1/8">
          <AvatarCard user={data.user} isUserCommnet={false} />
        </div>
        <div className="flex flex-col gap-1">
          {isHotel ? (
            <div className=" text-[#FF7B42] text-lg font-medium">
              {t("ReviewCard.Rating")}: {data.rating}
              <GoDotFill className="inline-block text-sm mx-2" />
              {typeRate[data.rating as keyof typeof typeRate]}
            </div>
          ) : (
            <div className="flex justify-center">
              {renderStars(Math.floor(data.rating))}
            </div>
          )}
          <div className="font-medium text-lg">{data?.title}</div>
          <div className="text-gray-500 dark:text-[#bbbbbb] text-sm">
            {data?.createdAt.split("T")[0]}
          </div>
        </div>
      </div>
      <div className="text-gray-500 dark:text-[#bbbbbb] text-lg my-5">
        {data?.content}
      </div>
      <div className="border-t border-gray-400 dark:border-gray-600 mb-10"></div>
    </div>
  );
};
