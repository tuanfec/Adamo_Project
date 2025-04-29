import TravelerForm from "@/components/checkOut/TravelerForm";
import TourSummary from "@/components/checkOut/TourSummary";
import PaymentMethod from "@/components/checkOut/PaymentMethod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

const zodSchema = z.object({
  paymentMethod: z.string().min(1, "Payment method is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
  specialRequirement: z.string().optional(),
});
type FormValues = z.infer<typeof zodSchema>;
export type { FormValues };

const CheckoutForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(zodSchema) });
  const onSubmit = (data: FormValues) => {
    console.log(data);
    navigate("/Thanks");
  };
  return (
    <div className="min-h-screen bg-white text-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className=" text-[36px] font-medium text-[#2A2A2A] mb-4 ">
            Booking Submission
          </h1>
          <div className="border-b border-gray-200 w-2/3 mb-6"></div>
          <div className="flex flex-col  space-x-4">
            <span className=" text-2xl font-medium text-[#2A2A2A]">
              Traveler Details
            </span>
            <p>Information we need to confirm your tour or activity</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 order-first lg:order-last">
            <TourSummary />
          </div>

          {/* Form Section */}
          <div className="lg:col-span-2 space-y-8 order-last lg:order-first">
            <TravelerForm
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
            />
            <div className="border-b border-gray-200 w-full mb-6"></div>

            <PaymentMethod
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
            />
            {/* Complete Booking Button */}
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="w-full bg-[#FF7B42] text-white py-3 font-medium text-lg">
              Complete Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
