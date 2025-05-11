import { useNotification } from "@/components/notifiction/NotificationProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1).max(10),
  message: z.string().min(1),
});
type ContactFormType = z.infer<typeof contactSchema>;
export const ContactForm = () => {
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
  return (
    <form className="flex flex-col gap-4 " onSubmit={handleSubmit(onSubmit)}>
      <p className="text-3xl font-bold">We'd love to hear from you</p>
      <p className="text-md  my-4 ">
        Send us a message and we'll respond as soon as possible
      </p>
      <div className="flex flex-col gap-2">
        <input
          placeholder="Your Name"
          className="bg-[#F5F5F5] rounded-md p-4"
          type="text"
          {...register("name")}
        />
        <div className="text-red-500">
          {errors.name && <p>{errors.name.message}</p>}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <input
          placeholder="Your Email"
          className="bg-[#F5F5F5] rounded-md p-4"
          type="email"
          {...register("email")}
        />
        <div className="text-red-500">
          {errors.email && <p>{errors.email.message}</p>}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <input
          placeholder="Your Phone"
          className="bg-[#F5F5F5] rounded-md p-4"
          type="number"
          {...register("phone")}
        />
        <div className="text-red-500">
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <textarea
          placeholder="Message"
          className="bg-[#F5F5F5] rounded-md p-4 min-h-[100px]"
          {...register("message")}
        />
        <div className="text-red-500">
          {errors.message && <p>{errors.message.message}</p>}
        </div>
      </div>

      <button
        className="font-medium cursor-pointer bg-[#FF7B42] text-white py-3 px-4 w-1/2"
        type="submit">
        Send Message
      </button>
    </form>
  );
};
