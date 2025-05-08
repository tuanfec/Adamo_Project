import React, { useState } from "react";
import paycard from "@/assets/paycard.png";
import paypal from "@/assets/paypal.png";
import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldErrors,
} from "react-hook-form";

import { FormValues } from "./CheckoutForm";

interface PaymentMethodProps {
  register: UseFormRegister<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  errors: FieldErrors<FormValues>;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  register,
  handleSubmit,
  errors,
}) => {
  const onSubmit = () => {};

  return (
    <div onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <p className="text-2xl font-medium text-[#2A2A2A] mb-3">Payment Method</p>
      <p>Pay securely—we use SSL encryption to keep your data safe</p>
      {/* Payment Options */}
      <div className="flex flex-row">
        <div className="flex flex-col  gap-6">
          <div className="flex flex-row  gap-2">
            <input
              type="radio"
              {...register("paymentMethod")}
              value="credit_card"
            />
            <p className="text-base font-medium">Credit Card</p>
          </div>

          <div className="flex flex-row  gap-2">
            <input type="radio" {...register("paymentMethod")} value="paypal" />
            <p className="text-base font-medium">Paypal</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <img
            className="h-[33px] ml-5 object-cover"
            src={paycard}
            alt="Credit Card"
          />
          <img
            className="h-[33px] w-fit ml-5 object-cover"
            src={paypal}
            alt="Paypal"
          />
        </div>
      </div>
      {errors.paymentMethod && (
        <p className="text-red-500 text-sm"> Please select a payment method</p>
      )}

      {/* Security Info */}
      <p className="text-[#4F4F4F]  text-sm">
        Pay securely—we use SSL encryption to keep your data safe
      </p>

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
            experience, local time. By clicking ‘Pay with PayPal,’ you are
            acknowledging that you have read and are bound by Ojimah’s
          </p>
        </div>
        <div className="flex items-start space-x-2">
          <div className="w-2 h-2 rounded-full bg-[#4F4F4F] mt-2" />
          <p>
            Customer Terms of Use, Privacy Policy, plus the tour operator’s
            rules & regulations (see the listing for more details).
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
