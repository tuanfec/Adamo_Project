import React from "react";
import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldErrors,
} from "react-hook-form";
import type { CheckoutFormValues } from "@/types/zod";
import { useTranslation } from "react-i18next";

interface TravelerFormProps {
  register: UseFormRegister<CheckoutFormValues>;
  handleSubmit: UseFormHandleSubmit<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
}

const TravelerForm: React.FC<TravelerFormProps> = ({
  register,
  handleSubmit,
  errors,
}) => {
  const onSubmit = (data: CheckoutFormValues) => {};
  const { t } = useTranslation();
  return (
    <div onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Lead Traveler Section */}
      <div>
        <h2 className=" text-xl font-medium text-[#2A2A2A] dark:text-white mb-4">
          {t("checkOut.LeadTraveler")} ({t("checkOut.Adult")})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-base font-semibold text-[#2A2A2A] dark:text-[#bbbbbb] mb-2">
              {t("checkOut.firstName")}*
            </label>
            <input
              {...register("firstName")}
              type="text"
              placeholder={t("checkOut.firstName")}
              className="w-full p-3 border border-[#E5E5E5] rounded text-[#888888] dark:border-gray-600"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label className="block text-base font-semibold text-[#2A2A2A] dark:text-[#bbbbbb] mb-2">
              {t("checkOut.lastName")}*
            </label>
            <input
              {...register("lastName")}
              type="text"
              placeholder={t("checkOut.lastName")}
              className="w-full p-3 border border-[#E5E5E5] rounded text-[#888888] dark:border-gray-600"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
          <div>
            <label className="block text-base font-semibold text-[#2A2A2A] mb-2 dark:text-[#bbbbbb]">
              Email*
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="email@domain.com"
              className="w-full p-3 border border-[#E5E5E5] rounded text-[#888888] dark:border-gray-600"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-base font-semibold text-[#2A2A2A] dark:text-[#bbbbbb] mb-2">
              {t("checkOut.phoneNumber")}*
            </label>
            <input
              {...register("phone")}
              type="number"
              placeholder={t("checkOut.phoneNumber")}
              className="w-full p-3 border border-[#E5E5E5] rounded text-[#888888] dark:border-gray-600"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div>
        <h2 className=" text-xl font-medium text-[#2A2A2A] mb-4 dark:text-white">
          {t("checkOut.address")}
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block  text-base font-medium text-[#2A2A2A] dark:text-[#bbbbbb] mb-2">
              {t("checkOut.address")}
            </label>
            <input
              {...register("address")}
              type="text"
              placeholder={t("checkOut.address")}
              className="w-full p-3 border border-[#E5E5E5] rounded text-[#888888] dark:border-gray-600"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block  text-base font-medium text-[#2A2A2A] dark:text-[#bbbbbb] mb-2">
                {t("checkOut.city")}
              </label>
              <input
                {...register("city")}
                type="text"
                placeholder={t("checkOut.city")}
                className="w-full p-3 border border-[#E5E5E5] rounded text-[#888888] dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block  text-base font-medium text-[#2A2A2A] dark:text-[#bbbbbb] mb-2">
                {t("checkOut.State")}
              </label>
              <input
                {...register("state")}
                type="text"
                placeholder={t("checkOut.State")}
                className="w-full p-3 border border-[#E5E5E5] rounded text-[#888888] dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block  text-base font-medium text-[#2A2A2A] dark:text-[#bbbbbb] mb-2">
                {t("checkOut.ZipCode")}
              </label>
              <input
                {...register("zipCode")}
                type="text"
                placeholder={t("checkOut.ZipCode")}
                className="w-full p-3 border border-[#E5E5E5] rounded text-[#888888] dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block  text-base font-medium text-[#2A2A2A] dark:text-[#bbbbbb] mb-2">
                {t("checkOut.Country")}
              </label>
              <input
                {...register("country")}
                type="text"
                placeholder={t("checkOut.Country")}
                className="w-full p-3 border border-[#E5E5E5] rounded text-[#888888] dark:border-gray-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Special Requirement Section */}
      <div>
        <h2 className=" text-xl font-medium text-[#2A2A2A] dark:text-[#bbbbbb] mb-4">
          {t("checkOut.SpecialRequirement")}
        </h2>
        <textarea
          {...register("specialRequirement")}
          placeholder={t("checkOut.SpecialRequirement")}
          rows={4}
          className="w-full p-3 border border-[#E5E5E5] rounded text-[#888888] dark:border-gray-600"
        />
      </div>
    </div>
  );
};

export default TravelerForm;
