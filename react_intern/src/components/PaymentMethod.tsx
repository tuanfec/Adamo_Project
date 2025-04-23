import React, { useState } from "react";

interface PaymentMethodProps {
  // Add props here later if needed
}

const PaymentMethod: React.FC<PaymentMethodProps> = () => {
  const [selectedMethod, setSelectedMethod] = useState<"credit" | "paypal">(
    "credit"
  );

  return (
    <div className="space-y-6">
      {/* Payment Options */}
      <div className="flex space-x-4">
        <button
          className={`flex items-center space-x-2 px-6 py-3 rounded ${
            selectedMethod === "credit"
              ? "bg-[#C4C4C4] border border-[#C4C4C4]"
              : "bg-white border border-[#E5E5E5]"
          }`}
          onClick={() => setSelectedMethod("credit")}>
          <img
            src="/images/credit_card.png"
            alt="Credit Card"
            className="h-6 w-auto"
          />
          <span className=" text-base font-medium">Credit Card</span>
        </button>
        <button
          className={`flex items-center space-x-2 px-6 py-3 rounded ${
            selectedMethod === "paypal"
              ? "bg-[#C4C4C4] border border-[#C4C4C4]"
              : "bg-white border border-[#E5E5E5]"
          }`}
          onClick={() => setSelectedMethod("paypal")}>
          <img src="/images/paypal.png" alt="PayPal" className="h-6 w-auto" />
          <span className=" text-base font-medium">PayPal</span>
        </button>
      </div>

      {/* Security Info */}
      <p className="text-[#4F4F4F]  text-sm">
        Pay securely—we use SSL encryption to keep your data safe
      </p>

      {/* Complete Booking Button */}
      <button className="w-full bg-[#FF7B42] text-white py-3 rounded font-['Poppins'] font-semibold">
        Complete Booking
      </button>

      {/* Terms and Conditions */}
      <div className="space-y-4 text-[#4F4F4F]  text-sm">
        <div className="flex items-start space-x-2">
          <div className="w-2 h-2 rounded-full bg-[#4F4F4F] mt-2" />
          <p>
            You will be charged the total amount once your order is confirmed.
          </p>
        </div>
        <div className="flex items-start space-x-2">
          <div className="w-2 h-2 rounded-full bg-[#4F4F4F] mt-2" />
          <p>
            If confirmation isn't received instantly, an authorization for the
            total amount will be held until your booking is confirmed.
          </p>
        </div>
        <div className="flex items-start space-x-2">
          <div className="w-2 h-2 rounded-full bg-[#4F4F4F] mt-2" />
          <p>
            You can cancel for free up to 24 hours before the day of the
            experience, local time.
          </p>
        </div>
        <div className="flex items-start space-x-2">
          <div className="w-2 h-2 rounded-full bg-[#4F4F4F] mt-2" />
          <p>
            By clicking 'Pay with PayPal,' you are acknowledging that you have
            read and are bound by Ojimah's Customer Terms of Use, Privacy
            Policy, plus the tour operator's rules & regulations (see the
            listing for more details).
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
