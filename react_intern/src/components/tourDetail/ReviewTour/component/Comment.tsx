import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CommentSchemaValue, createCommnetSchema } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Rate } from "antd";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AvatarCard } from "./AvatarCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";

export const Comment: React.FC<{
  isHotel?: boolean;
  onSubmit: (data: CommentSchemaValue) => void;
}> = ({ isHotel, onSubmit }) => {
  const { t } = useTranslation();

  const typeRate = {
    9.5: t("Wonderful"),
    9: t("VeryGood"),
    8: t("Good"),
    7: t("Pleasant"),
  };

  const form = useForm<CommentSchemaValue>({
    resolver: zodResolver(createCommnetSchema(t)),
    defaultValues: {
      rating: undefined,
      title: "",
      content: "",
    },
  });

  const { reset } = form;
  const handleSubmit = (data: CommentSchemaValue) => {
    onSubmit(data);
    reset();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col w-full gap-4">
        <div className="flex w-full flex-row gap-4">
          <div className="w-1/9 h-1/9">
            <AvatarCard isUserCommnet />
          </div>
          <div className="flex flex-col w-full gap-2 items-end">
            {isHotel ? (
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={(val) => field.onChange(Number(val))}>
                        <SelectTrigger className=" text-[#FF7B42] cursor-pointer rounded-sm py-1 px-2 border border-[#FF7B42] font-medium">
                          <SelectValue placeholder={t("ReviewCard.Rating")} />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-[#323131]">
                          {Object.entries(typeRate).map(([key, value]) => (
                            <SelectItem
                              className="dark:text-[#FF7B42]"
                              key={key}
                              value={key}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <div className="flex flex-row items-center gap-4">
                <span className="font-medium mb-1 dark:text-white text-black">
                  {t("ReviewCard.Rating")}
                </span>
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="dark:bg-[#8e8c8c] px-2 py-1 rounded-lg">
                          <Rate
                            allowHalf
                            onChange={field.onChange}
                            value={field.value}
                            defaultValue={1}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
              </div>
            )}

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder={t("ReviewCard.Title")}
                      {...field}
                      className="p-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Textarea
                      placeholder={t("ReviewCard.Addcomment")}
                      className="min-h-[150px] p-5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-[#FF7B42] hover:bg-[#ff8142e3] cursor-pointer w-1/4 text-white">
              {t("ReviewCard.Comment")}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
