import React from "react";
import TravelerForm from "./TravelerForm";
import TourSummary from "./TourSummary";
import PaymentMethod from "./PaymentMethod";

interface CheckoutFormProps {
  // Add props here later if needed
}

const CheckoutForm: React.FC<CheckoutFormProps> = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className=" text-[36px] font-medium text-[#2A2A2A] mb-4">
            Booking Submission
          </h1>
          <div className="flex items-center space-x-4">
            <span className=" text-2xl font-medium text-[#2A2A2A]">
              Traveler Details
            </span>
            <div className="h-[1px] w-8 bg-[#E5E5E5] opacity-70"></div>
            <span className=" text-2xl font-medium text-[#2A2A2A]">
              Payment Method
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-8">
            <TravelerForm />
            <PaymentMethod />
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-1">
            <TourSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
