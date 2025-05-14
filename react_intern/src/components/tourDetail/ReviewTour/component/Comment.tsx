import { AvatarCard } from "./AvatarCard";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const zodSchema = z.object({
  rating: z.number().min(1, { message: "Rating is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
});

type FormValues = z.infer<typeof zodSchema>;
export const Comment: React.FC<{ isHotel?: boolean }> = ({ isHotel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(zodSchema),
  });
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex w-full flex-row gap-4">
        <div className="w-1/9 h-1/9">
          <AvatarCard />
        </div>
        <div className="flex flex-col w-full gap-2 items-end">
          {isHotel && (
            <div className="flex flex-row gap-2">
              <span>Rating</span>
              <div className="flex flex-row gap-2"></div>
            </div>
          )}
          {isHotel && (
            <textarea
              className="border w-full border-gray-300 dark:border-gray-600 rounded-lg p-5"
              placeholder="Title"
              {...register("title")}
            />
          )}
          <textarea
            className="border w-full border-gray-300 dark:border-gray-600 rounded-lg p-5 min-h-[150px]"
            placeholder="Add a comment"
            {...register("content")}
          />
          <button className="bg-[#FF7B42] font-medium text-white w-1/4 p-2">
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};
