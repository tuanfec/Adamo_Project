import React from "react";
import { FaFacebook } from "react-icons/fa";
import { ActionButton } from "./ActionButton";
import InputForm from "./InputForm";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { setIsLoggedIn, setUser } from "@/app/slide/userSlide";
import { loginUser, loginWithFacebook } from "@/services/authService";
import { useNotification } from "@/components/notifiction/NotificationProvider";
interface AuthResponse {
  success: boolean;
  user?: {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  };
  error?: string;
}
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
});

type FormData = z.infer<typeof schema>;

export const NewPassword: React.FC = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const navigate = useNavigate();
  const statePage = useLocation().pathname;
  const notification = useNotification();
  const location = useLocation();
  console.log(location);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const authMutation = useMutation<AuthResponse, Error, FormData>({
    mutationFn: (data: FormData) => loginUser(data.email, data.password),
    onSuccess: (response) => {
      if (response.success && response.user) {
        // Only dispatch if login was successful
        dispatch(setUser(response.user));
        dispatch(setIsLoggedIn(true));
        localStorage.setItem("user", JSON.stringify(response.user));
        notification.success({
          title: "Success",
          message: "Login successful!",
        });
        if (location.state?.from) {
          navigate(location.state.from);
        } else navigate("/");
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
      } else {
        // Handle unsuccessful login
        notification.error({
          title: "Error",
          message: response.error || "Login failed",
        });
      }
    },
    onError: (error) => {
      notification.error({
        title: "Error",
        message: error.message,
      });
    },
  });

  const facebookMutation = useMutation<AuthResponse, Error, void>({
    mutationFn: () => loginWithFacebook(),
    onSuccess: (response) => {
      if (response.success && response.user) {
        dispatch(setUser(response.user));
        localStorage.setItem("user", JSON.stringify(response.user));
        dispatch(setIsLoggedIn(true));
        notification.success({
          title: "Success",
          message: "Login successful!",
        });
        if (location.state?.from) {
          navigate(location.state.from);
        } else navigate("/");
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
      } else {
        notification.error({
          title: "Error",
          message: "Login failed!",
        });
      }
    },
  });

  const onSubmit = (data: FormData) => {
    setErrorMessage(""); // Clear any previous error messages
    authMutation.mutate(data);
  };

  const navigatePage = (isRegister: boolean) => {
    if (isRegister) {
      navigate("/sign-up");
    } else {
      navigate("/forgot-password");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col lg:my-24 lg:ml-30 lg:mr-16 gap-6 [320px]:gap-4 sm:gap-6 md:gap-8">
      <h1 className="text-2xl font-medium leading-tight text-zinc-900 dark:text-white [320px]:text-xl [375px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl lg:w-full">
        {statePage === "/reset-password-confirm" ? "New Password" : "Sign in"}
      </h1>
      <p className="text-sm leading-relaxed text-neutral-700 dark:text-[#bbbbbb] [320px]:text-xs [375px]:text-sm sm:text-base sm:leading-7 md:text-lg">
        {statePage == "/reset-password-confirm"
          ? "Create your new password"
          : "Welcome to NgaoduVietnam"}
      </p>

      {errorMessage && (
        <div className="text-red-500 text-sm p-2 bg-red-100 rounded">
          {errorMessage}
        </div>
      )}

      <div className="flex flex-col gap-4">
        <InputForm
          title={
            statePage == "/reset-password-confirm"
              ? "New Password"
              : "Email Address"
          }
          type={statePage == "/reset-password-confirm" ? "password" : "email"}
          name={statePage == "/reset-password-confirm" ? "password" : "email"}
          register={register}
          error={errors.email?.message}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />

        <InputForm
          title={
            statePage == "/reset-password-confirm"
              ? "Confirm Password"
              : "Password"
          }
          type="password"
          name="password"
          register={register}
          error={errors.password?.message}
          showPassword={showConfirmPassword}
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
        />

        <p
          onClick={() => navigatePage(false)}
          className="text-end text-sm text-[#636567] dark:text-[#e9e8e8] cursor-pointer">
          Forgot password?
        </p>
      </div>

      <div className="w-full flex flex-col items-center gap-3 [320px]:gap-2 sm:gap-3 md:gap-4">
        <ActionButton
          type="submit"
          disabled={authMutation.isPending}
          className="w-full py-3 px-4 rounded-lg bg-[#FF7B42] text-white font-medium transition-all duration-200 text-sm [320px]:text-xs [320px]:py-2 [375px]:text-sm [375px]:py-2.5 sm:text-base sm:py-3 md:text-lg md:py-4 lg:text-base lg:py-3">
          {authMutation.isPending ? "Loading..." : "Sign in"}
        </ActionButton>

        <ActionButton
          onClick={() => facebookMutation.mutate()}
          type="button"
          className="w-full py-3 px-4 rounded-lg border-2 border-[#4E86DB] text-white bg-[#4E86DB] font-medium transition-all duration-200 text-sm [320px]:text-xs [320px]:py-2 [375px]:text-sm [375px]:py-2.5 sm:text-base sm:py-3 md:text-lg md:py-4 lg:text-base lg:py-3">
          <div className="flex items-center gap-2 justify-center">
            <FaFacebook />
            Sign in with Facebook
          </div>
        </ActionButton>
      </div>

      <div className="flex gap-2 items-center justify-start">
        <p>Don't have an account?</p>
        <p
          onClick={() => navigatePage(true)}
          className="font-bold text-md text-[#FF7B42] cursor-pointer">
          Sign up
        </p>
      </div>
    </form>
  );
};
