import React from "react";
import { useForm } from "react-hook-form";
import type { CheckoutFormValues } from "@/types/zod";
import { useTranslation } from "react-i18next";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface TravelerFormProps {
  form: ReturnType<typeof useForm<CheckoutFormValues>>;
}

const TravelerForm: React.FC<TravelerFormProps> = ({ form }) => {
  const { t } = useTranslation();

  return (
    <Form {...form}>
      <div className="space-y-8">
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
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="dark:text-[#bbbbbb] py-6"
                        placeholder={t("checkOut.firstName")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-[#2A2A2A] dark:text-[#bbbbbb] mb-2">
                {t("checkOut.lastName")}*
              </label>
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="dark:text-[#bbbbbb] py-6"
                        placeholder={t("checkOut.lastName")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-[#2A2A2A] mb-2 dark:text-[#bbbbbb]">
                Email*
              </label>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="dark:text-[#bbbbbb] py-6"
                        placeholder="email@domain.com"
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-[#2A2A2A] dark:text-[#bbbbbb] mb-2">
                {t("checkOut.phoneNumber")}*
              </label>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="dark:text-[#bbbbbb] py-6"
                        placeholder={t("checkOut.phoneNumber")}
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="dark:text-[#bbbbbb] py-6"
                        placeholder={t("checkOut.address")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block  text-base font-medium text-[#2A2A2A] dark:text-[#bbbbbb] mb-2">
                {t("checkOut.city")}
              </label>
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="dark:text-[#bbbbbb] py-6"
                        placeholder={t("checkOut.city")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <label className="block  text-base font-medium text-[#2A2A2A] dark:text-[#bbbbbb] mb-2">
                {t("checkOut.State")}
              </label>
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="dark:text-[#bbbbbb] py-6"
                        placeholder={t("checkOut.State")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <label className="block  text-base font-medium text-[#2A2A2A] dark:text-[#bbbbbb] mb-2">
                {t("checkOut.ZipCode")}
              </label>
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="dark:text-[#bbbbbb] py-6"
                        placeholder={t("checkOut.ZipCode")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <label className="block  text-base font-medium text-[#2A2A2A] dark:text-[#bbbbbb] mb-2">
                {t("checkOut.Country")}
              </label>
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="dark:text-[#bbbbbb] py-6"
                        placeholder={t("checkOut.Country")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Special Requirement Section */}
        <div>
          <h2 className=" text-xl font-medium text-[#2A2A2A] dark:text-[#bbbbbb] mb-4">
            {t("checkOut.SpecialRequirement")}
          </h2>
          <FormField
            control={form.control}
            name="specialRequirement"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="dark:text-[#bbbbbb] pb-15 pt-6"
                    placeholder={t("checkOut.SpecialRequirement")}
                    {...field}
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </Form>
  );
};

export default TravelerForm;
