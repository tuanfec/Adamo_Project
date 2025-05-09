import { Comment } from "@/types/tour";
import { AiFillStar } from "react-icons/ai";
import { AvatarCard } from "./AvatarCard";
import { GoDotFill } from "react-icons/go";

interface CommentProps {
  data: Comment;
  isHotel: boolean;
}
export const ListComment: React.FC<CommentProps> = ({ data, isHotel }) => {
  console.log(data);
  const typeRate = {
    9.5: "Wonderful",
    9: "Very Good",
    8: "Good",
    7: "Pleasant",
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
          <AvatarCard />
        </div>
        <div className="flex flex-col gap-1">
          {isHotel ? (
            <div className=" text-[#FF7B42] text-lg font-medium">
              Rating: {data.rating}
              <GoDotFill className="inline-block text-sm mx-2" />
              {typeRate[data.rating as keyof typeof typeRate]}
            </div>
          ) : (
            <div className="flex justify-center">
              {renderStars(Math.floor(data.rating))}
            </div>
          )}
          <div className="font-medium text-lg">{data?.title}</div>
          <div className="text-gray-500 text-sm">{data?.createdAt}</div>
        </div>
      </div>
      <div className="text-gray-500 text-lg my-5">{data?.content}</div>
      <div className="border-t border-gray-400 mb-10"></div>
    </div>
  );
};
