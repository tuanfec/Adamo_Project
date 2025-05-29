import { useNotification } from "@/components/notifiction/NotificationProvider";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
      .min(10, { message: t("contactForm.zod.phone.min") })
      .max(10, {
        message: t("contactForm.zod.phone.max"),
      }),
    message: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
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
    <Form {...form}>
      <form
        className="flex flex-col gap-4 "
        onSubmit={form.handleSubmit(onSubmit)}>
        <p className="text-3xl font-bold">{t("contactForm.title")}</p>
        <p className="text-md  my-4 ">{t("contactForm.description")}</p>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="py-6"
                  placeholder={t("contactForm.input.name")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="py-6"
                  placeholder={t("contactForm.input.email")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="py-6"
                  placeholder={t("contactForm.input.phone")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="pb-15 pt-6"
                  placeholder={t("contactForm.input.message")}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end">
          <Button className="w-1/2 bg-[#FF7B42] hover:bg-[#ff7b42c6] cursor-pointer text-white py-5 ">
            {t("contactForm.button")}
          </Button>
        </div>
      </form>
    </Form>
  );
};
