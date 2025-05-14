import React from "react";
import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldErrors,
} from "react-hook-form";
import type { FormValues } from "../checkOut/CheckoutForm";

interface TravelerFormProps {
  register: UseFormRegister<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  errors: FieldErrors<FormValues>;
}

const TravelerForm: React.FC<TravelerFormProps> = ({
  register,
  handleSubmit,
  errors,
}) => {
  const onSubmit = (data: FormValues) => {};
  return (
    <div onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Lead Traveler Section */}
      <div>
        <h2 className=" text-xl font-medium text-[#2A2A2A] dark:text-white mb-4">
          Lead Traveler (Adult)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-base font-semibold text-[#2A2A2A] dark:text-[#bbbbbb] mb-2">
              First Name*
            </label>
            <input
              {...register("firstName")}
              type="text"
              placeholder="First Name"
              className="w-full p-3 border border-[#E5E5E5] rounded text-[#888888] dark:border-gray-600"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label className="block text-base font-semibold text-[#2A2A2A] dark:text-[#bbbbbb] mb-2">
              Last Name*
            </label>
            <input
              {...register("lastName")}
              type="text"
              placeholder="Last Name"
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
              Phone Number*
            </label>
            <input
              {...register("phone")}
              type="number"
              placeholder="Your Phone"
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
          Address
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block  text-base font-medium text-[#2A2A2A] dark:text-[#bbbbbb] mb-2">
              Your Address
            </label>
            <input
              {...register("address")}
              type="text"
              placeholder="Your Address"
              className="w-full p-3 border border-[#E5E5E5] rounded text-[#888888] dark:border-gray-600"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block  text-base font-medium text-[#2A2A2A] dark:text-[#bbbbbb] mb-2">
                City
              </label>
              <input
                {...register("city")}
                type="text"
                placeholder="Your City"
                className="w-full p-3 border border-[#E5E5E5] rounded text-[#888888] dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block  text-base font-medium text-[#2A2A2A] dark:text-[#bbbbbb] mb-2">
                State/Province/Region
              </label>
              <input
                {...register("state")}
                type="text"
                placeholder="Your State/Province/Region"
                className="w-full p-3 border border-[#E5E5E5] rounded text-[#888888] dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block  text-base font-medium text-[#2A2A2A] dark:text-[#bbbbbb] mb-2">
                Zip Code/Postal Code
              </label>
              <input
                {...register("zipCode")}
                type="text"
                placeholder="Zip Code/Postal Code"
                className="w-full p-3 border border-[#E5E5E5] rounded text-[#888888] dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block  text-base font-medium text-[#2A2A2A] dark:text-[#bbbbbb] mb-2">
                Country
              </label>
              <input
                {...register("country")}
                type="text"
                placeholder="Your Country"
                className="w-full p-3 border border-[#E5E5E5] rounded text-[#888888] dark:border-gray-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Special Requirement Section */}
      <div>
        <h2 className=" text-xl font-medium text-[#2A2A2A] dark:text-[#bbbbbb] mb-4">
          Special Requirement
        </h2>
        <textarea
          {...register("specialRequirement")}
          placeholder="Special Requirement"
          rows={4}
          className="w-full p-3 border border-[#E5E5E5] rounded text-[#888888] dark:border-gray-600"
        />
      </div>
    </div>
  );
};

export default TravelerForm;
