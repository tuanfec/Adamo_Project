import { useNotification } from "@/components/notifiction/NotificationProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import z from "zod";

export const ContactForm = () => {
  const { t } = useTranslation();

  const contactSchema = z.object({
    name: z.string().min(1, { message: t("contactForm.zod.name.required") }),
    email: z.string().email({ message: t("contactForm.zod.email.required") }),
    phone: z
      .string()
      .min(1, { message: t("contactForm.zod.phone.min") })
      .max(10, {
        message: t("contactForm.zod.phone.max"),
      }),
    message: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormType>({
    resolver: zodResolver(contactSchema),
  });

  const notify = useNotification();
  const onSubmit = (data: ContactFormType) => {
    console.log(data);
    notify.success({
      message: "Message sent successfully",
    });
  };
  type ContactFormType = z.infer<typeof contactSchema>;
  return (
    <form className="flex flex-col gap-4 " onSubmit={handleSubmit(onSubmit)}>
      <p className="text-3xl font-bold">{t("contactForm.title")}</p>
      <p className="text-md  my-4 ">{t("contactForm.description")}</p>
      <div className="flex flex-col gap-2">
        <input
          placeholder={t("contactForm.input.name")}
          className="bg-[#F5F5F5] rounded-md p-4 dark:bg-[#7a7a7a9d]"
          type="text"
          {...register("name")}
        />
        <div className="text-red-500">
          {errors.name && <p>{errors.name.message}</p>}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <input
          placeholder={t("contactForm.input.email")}
          className="bg-[#F5F5F5] rounded-md p-4 dark:bg-[#7a7a7a9d]"
          type="email"
          {...register("email")}
        />
        <div className="text-red-500">
          {errors.email && <p>{errors.email.message}</p>}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <input
          placeholder={t("contactForm.input.phone")}
          className="bg-[#F5F5F5] rounded-md p-4 dark:bg-[#7a7a7a9d]"
          type="number"
          {...register("phone")}
        />
        <div className="text-red-500">
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <textarea
          placeholder={t("contactForm.input.message")}
          className="bg-[#F5F5F5] rounded-md p-4 min-h-[100px] dark:bg-[#7a7a7a9d]"
          {...register("message")}
        />
        <div className="text-red-500">
          {errors.message && <p>{errors.message.message}</p>}
        </div>
      </div>

      <button
        className="font-medium cursor-pointer bg-[#FF7B42] text-white py-3 px-4 w-1/2"
        type="submit">
        {t("contactForm.button")}
      </button>
    </form>
  );
};
