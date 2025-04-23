"use client";

import React, { useState } from "react";
import { ActionButton } from "./ActionButton";
import InputForm from "./InputForm";
import { setStatePage } from "@app/slide/statePageSlide";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/services/authService";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof schema>;

interface ResetPasswordResponse {
  error?: string;
  success?: boolean;
  message?: string;
}

export const ForgotPasswordForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const resetPasswordMutation = useMutation<
    ResetPasswordResponse,
    Error,
    string
  >({
    mutationFn: (email: string) => resetPassword(email),
    onSuccess: (data) => {
      if (data.success) {
        setSuccessMessage(
          data.message || "Password reset email sent successfully!"
        );
        setErrorMessage("");
        dispatch(setStatePage("newPassword"));
        navigate("/reset-password-confirm");
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
    dispatch(setStatePage("signIn"));
    navigate("/login");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col lg:mt-30 lg:ml-30 lg:mr-16 gap-6 [320px]:gap-4 sm:gap-6 md:gap-8">
      <h1 className="text-2xl font-medium leading-tight text-zinc-900 [320px]:text-xl [375px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl lg:w-full">
        Forgot Password
      </h1>
      <p className="text-sm leading-relaxed text-neutral-700 [320px]:text-xs [375px]:text-sm sm:text-base sm:leading-7 md:text-lg">
        Enter the e-mail address associated with the account. We'll e-mail a
        link to reset your password.
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
        title="Email Address"
        type="email"
        name="email"
        register={register}
        error={errors.email?.message}
      />

      <div className="w-full flex flex-col items-center gap-3 [320px]:gap-2 sm:gap-3 md:gap-4">
        <ActionButton
          type="submit"
          className="w-full py-3 px-4 rounded-lg bg-[#FF7B42] text-white font-medium transition-all duration-200 text-sm [320px]:text-xs [320px]:py-2 [375px]:text-sm [375px]:py-2.5 sm:text-base sm:py-3 md:text-lg md:py-4 lg:text-base lg:py-3">
          Send Reset
        </ActionButton>

        <ActionButton
          onClick={() => navigatePage()}
          type="button"
          className="w-full py-3 px-4 rounded-lg border-2 border-[#FF7B42] text-[#FF7B42] font-medium transition-all duration-200 text-sm [320px]:text-xs [320px]:py-2 [375px]:text-sm [375px]:py-2.5 sm:text-base sm:py-3 md:text-lg md:py-4 lg:text-base lg:py-3">
          <div className="flex items-center gap-2 justify-center">
            Back to sign in
          </div>
        </ActionButton>
      </div>
    </form>
  );
};
