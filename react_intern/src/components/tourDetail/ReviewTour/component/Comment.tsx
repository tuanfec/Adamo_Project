import { AvatarCard } from "./AvatarCard";

export const Comment: React.FC = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex w-full flex-row gap-4">
        <div className="w-1/9 h-1/9">
          <AvatarCard />
        </div>
        <div className="flex flex-col w-full gap-2 items-end">
          <textarea
            className="border w-full border-gray-300 rounded-lg p-5 min-h-[150px]"
            placeholder="Add a comment"
          />
          <button className="bg-[#FF7B42] font-medium text-white w-1/4 p-2">
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};
