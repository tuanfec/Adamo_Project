import React, { useState } from "react";
import paycard from "@/assets/paycard.png";
import paypal from "@/assets/paypal.png";
import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldErrors,
} from "react-hook-form";
import { GoDotFill } from "react-icons/go";
import { useTranslation } from "react-i18next";
import { CheckoutFormValues } from "@/types/zod";

interface PaymentMethodProps {
  register: UseFormRegister<CheckoutFormValues>;
  handleSubmit: UseFormHandleSubmit<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  register,
  handleSubmit,
  errors,
}) => {
  const { t } = useTranslation();
  const onSubmit = () => {};

  return (
    <div onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <p className="text-2xl font-medium text-[#2A2A2A] dark:text-white mb-3">
        {t("checkOut.paymentMethod")}
      </p>
      <p className="dark:text-[#bbbbbb]">
        {t("checkOut.paymentMethodDescription")}
      </p>
      {/* Payment Options */}
      <div className="flex flex-row">
        <div className="flex flex-col  gap-6">
          <div className="flex flex-row  gap-2">
            <input
              type="radio"
              {...register("paymentMethod")}
              value="credit_card"
            />
            <p className="text-base font-medium dark:text-[#bbbbbb]">
              {t("checkOut.creditCard")}
            </p>
          </div>

          <div className="flex flex-row  gap-2">
            <input type="radio" {...register("paymentMethod")} value="paypal" />
            <p className="text-base font-medium dark:text-[#bbbbbb]">
              {t("checkOut.paypal")}
            </p>
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
        <p className="text-red-500 text-sm">
          {t("checkOut.pleaseSelectAPaymentMethod")}
        </p>
      )}

      {/* Security Info */}
      <p className="text-[#4F4F4F] dark:text-white text-sm">
        {t("checkOut.securityInfo")}
      </p>

      {/* Terms and Conditions */}
      <div className="space-y-4 text-[#4F4F4F] dark:text-[#bbbbbb] text-sm">
        <div className="flex items-start space-x-2">
          <GoDotFill className="min-w-4 min-h-2" />{" "}
          <p>{t("checkOut.description")}</p>
        </div>
        <div className="flex items-start space-x-2">
          <GoDotFill className="min-w-4 min-h-2" />{" "}
          <p>{t("checkOut.description2")}</p>
        </div>
        <div className="flex items-start space-x-2">
          <GoDotFill className="min-w-4 min-h-2" />{" "}
          <p>{t("checkOut.description3")}</p>
        </div>
        <div className="flex items-start space-x-2">
          <GoDotFill className="min-w-4 min-h-2" />{" "}
          <p>{t("checkOut.description4")}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
