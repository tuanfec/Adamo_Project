import TravelerForm from "@/components/checkOut/TravelerForm";
import TourSummary from "@/components/checkOut/TourSummary";
import PaymentMethod from "@/components/checkOut/PaymentMethod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CheckoutFormValues, createCheckoutSchema } from "@/types/zod";

const CheckoutForm = () => {
  const { t } = useTranslation();
  const schema = createCheckoutSchema(t);
  const navigate = useNavigate();
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      paymentMethod: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });
  const onSubmit = (data: CheckoutFormValues) => {
    console.log(data);
    navigate("/Thanks");
  };
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="min-h-screen bg-white text-[#2A2A2A] dark:bg-[#1e1e1e] ">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className=" text-[36px] font-medium text-[#2A2A2A] dark:text-white mb-4 ">
            {t("checkOut.bookingSubmission")}
          </h1>
          <div className="border-b border-gray-200 w-2/3 mb-6 dark:border-gray-600"></div>
          <div className="flex flex-col  space-x-4">
            <span className=" text-2xl font-medium text-[#2A2A2A] dark:text-white">
              {t("checkOut.travelerDetails")}
            </span>
            <p className="text-gray-500 dark:text-[#bbbbbb]">
              {t("checkOut.information")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 order-first lg:order-last">
            <TourSummary />
          </div>

          {/* Form Section */}
          <div className="lg:col-span-2 space-y-8 order-last lg:order-first">
            <TravelerForm form={form} />
            <div className="border-b border-gray-200 dark:border-gray-600 w-full mb-6"></div>

            <PaymentMethod
              register={form.register}
              handleSubmit={form.handleSubmit}
              errors={form.formState.errors}
            />
            {/* Complete Booking Button */}
            <button
              type="submit"
              className="w-full bg-[#FF7B42] text-white py-3 font-medium text-lg">
              {t("checkOut.completeBooking")}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
