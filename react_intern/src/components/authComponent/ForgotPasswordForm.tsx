"use client";

import React, { useState } from "react";
import { ActionButton } from "./ActionButton";
import InputForm from "./InputForm";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { useNotification } from "@/components/notifiction/NotificationProvider";
import { useTranslation } from "react-i18next";

interface ResetPasswordResponse {
  error?: string;
  success?: boolean;
  message?: string;
}

export const ForgotPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { t } = useTranslation();
  const schema = z.object({
    email: z.string().email(t("FogotPage.zodEmail")),
  });

  type FormData = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const notification = useNotification();
  const resetPasswordMutation = useMutation<
    ResetPasswordResponse,
    Error,
    string
  >({
    mutationFn: (email: string) => resetPassword(email),
    onSuccess: (data) => {
      if (data.success) {
        setSuccessMessage(t("notification.forgotPassword"));
        setErrorMessage("");
        notification.success({
          title: "Success",
          message: t("notification.forgotPassword"),
        });
        // Optionally redirect after a delay
      } else if (data.error) {
        setErrorMessage(data.error);
        setSuccessMessage("");
      }
    },
    onError: (error) => {
      setErrorMessage(error.message);
      setSuccessMessage("");
    },
  });

  const onSubmit = (data: FormData) => {
    setErrorMessage("");
    setSuccessMessage("");
    resetPasswordMutation.mutate(data.email);
  };

  const navigatePage = () => {
    navigate("/login");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col lg:mt-30 lg:ml-30 lg:mr-16 gap-6 [320px]:gap-4 sm:gap-6 md:gap-8">
      <h1 className="text-2xl font-medium leading-tight dark:text-white text-zinc-900 [320px]:text-xl [375px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl lg:w-full">
        {t("FogotPage.title")}
      </h1>
      <p className="text-sm leading-relaxed text-neutral-700 dark:text-[#bbbbbb] [320px]:text-xs [375px]:text-sm sm:text-base sm:leading-7 md:text-lg">
        {t("FogotPage.content")}
      </p>

      {errorMessage && (
        <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="text-green-500 text-sm p-2 bg-green-50 rounded">
          {successMessage}
        </div>
      )}

      <InputForm
        title={t("FogotPage.email")}
        type="email"
        name="email"
        register={register}
        error={errors.email?.message}
      />

      <div className="w-full flex flex-col items-center gap-3 [320px]:gap-2 sm:gap-3 md:gap-4">
        <ActionButton
          type="submit"
          className="w-full py-3 px-4 rounded-lg bg-[#FF7B42] text-white  dark:hover:text-white] 
          font-medium transition-all duration-200 text-sm [320px]:text-xs [320px]:py-2 [375px]:text-sm [375px]:py-2.5 sm:text-base sm:py-3 md:text-lg md:py-4 lg:text-base lg:py-3">
          {t("FogotPage.SendButton")}
        </ActionButton>

        <ActionButton
          onClick={() => navigatePage()}
          type="button"
          className="w-full py-3 px-4 rounded-lg border-2 border-[#FF7B42] text-[#FF7B42] font-medium transition-all duration-200 text-sm [320px]:text-xs [320px]:py-2 [375px]:text-sm [375px]:py-2.5 sm:text-base sm:py-3 md:text-lg md:py-4 lg:text-base lg:py-3">
          <div className="flex items-center gap-2 justify-center">
            {t("FogotPage.Backtosignin")}
          </div>
        </ActionButton>
      </div>
    </form>
  );
};
