import React from "react";
import { ActionButton } from "./ActionButton";
import { FaFacebook } from "react-icons/fa";
import InputForm from "./InputForm";
import { setStatePage } from "@app/slide/statePageSlide";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@services/authService";
import { loginWithFacebook } from "@/services/authService";
import { setIsLoggedIn, setUser } from "@/app/slide/userSlide";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
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

interface RegisterResponse {
  success: boolean;
  user?: any;
  error?: string;
}

export const RegisterFrom: React.FC = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const registerMutation = useMutation<RegisterResponse, Error, FormData>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data.success) {
        dispatch(setStatePage("signIn"));
      } else {
        setErrorMessage(data.error || "Registration failed");
      }
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const facebookMutation = useMutation<RegisterResponse, Error, void>({
    mutationFn: loginWithFacebook,
    onSuccess: (data) => {
      if (data.success) {
        dispatch(setUser(data.user));
        dispatch(setIsLoggedIn(true));
        navigate("/home");
      } else {
        setErrorMessage(data.error || "Registration failed");
      }
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const onSubmit = (data: FormData) => {
    setErrorMessage("");
    // Format data according to UserData interface
    const userData = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    };
    console.log(userData);

    registerMutation.mutate(userData);
  };

  const navigatePage = () => {
    dispatch(setStatePage("signIn"));
    navigate("/login");
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col lg:mt-20 lg:ml-30 lg:mr-16 gap-6 [320px]:gap-4 sm:gap-6 md:gap-8">
      <h1 className="text-2xl font-medium leading-tight text-zinc-900 [320px]:text-xl [375px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl lg:w-full">
        Register
      </h1>
      <p className="text-sm leading-relaxed text-neutral-700 [320px]:text-xs [375px]:text-sm sm:text-base sm:leading-7 md:text-lg">
        Welcome to NgaoduVietnam
      </p>

      {errorMessage && (
        <div className="text-red-500 text-sm p-2 bg-red-100 rounded">
          {errorMessage}
        </div>
      )}

      <div className="flex flex-row gap-4">
        <InputForm
          title="First Name"
          type="text"
          name="firstName"
          register={register}
          error={errors.firstName?.message}
        />
        <InputForm
          title="Last Name"
          type="text"
          name="lastName"
          register={register}
          error={errors.lastName?.message}
        />
      </div>

      <InputForm
        title="Email Address"
        type="email"
        name="email"
        register={register}
        error={errors.email?.message}
      />

      <InputForm
        title="Password"
        type={showPassword ? "text" : "password"}
        name="password"
        register={register}
        error={errors.password?.message}
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword(!showPassword)}
      />

      <div className="w-full flex flex-col items-center gap-3 [320px]:gap-2 sm:gap-3 md:gap-4">
        <ActionButton
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full py-3 px-4 rounded-lg bg-[#FF7B42] text-white font-medium transition-all duration-200 text-sm [320px]:text-xs [320px]:py-2 [375px]:text-sm [375px]:py-2.5 sm:text-base sm:py-3 md:text-lg md:py-4 lg:text-base lg:py-3">
          {registerMutation.isPending ? "Loading..." : "Sign up"}
        </ActionButton>

        <ActionButton
          onClick={() => facebookMutation.mutate()}
          type="button"
          className="w-full py-3 px-4 rounded-lg border-2 border-[#4E86DB] text-white bg-[#4E86DB] font-medium transition-all duration-200 text-sm [320px]:text-xs [320px]:py-2 [375px]:text-sm [375px]:py-2.5 sm:text-base sm:py-3 md:text-lg md:py-4 lg:text-base lg:py-3">
          <div className="flex items-center gap-2 justify-center">
            <FaFacebook />
            Sign up with Facebook
          </div>
        </ActionButton>
      </div>

      <div className="flex gap-2 items-center justify-start">
        <p>Member already?</p>
        <p
          onClick={() => navigatePage()}
          className="font-bold text-md text-[#FF7B42] cursor-pointer">
          Sign in
        </p>
      </div>
    </form>
  );
};
