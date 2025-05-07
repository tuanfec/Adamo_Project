import { Comment } from "@/types/tour";
import { AiFillStar } from "react-icons/ai";
import { AvatarCard } from "./AvatarCard";
interface CommentProps {
  data: Comment;
}
export const ListComment: React.FC<CommentProps> = ({ data }) => {
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
          <div className="flex justify-center">
            {renderStars(Math.floor(data.rating))}
          </div>
          <div className="font-medium text-lg">{data?.title}</div>
          <div className="text-gray-500 text-sm">{data?.createdAt}</div>
        </div>
      </div>
      <div className="text-gray-500 text-lg my-5">{data?.content}</div>
      <div className="border-t border-gray-400 mb-10"></div>
    </div>
  );
};
