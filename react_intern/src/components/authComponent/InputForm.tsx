import React from "react";
import { UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputFormProps {
  type?: "text" | "password" | "email";
  placeholder?: string;
  className?: string;
  title: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  icon?: {
    component: IconType;
    position?: "left" | "right";
    onClick?: () => void;
  };
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

const InputForm: React.FC<InputFormProps> = ({
  type = "text",
  className,
  title,
  name,
  register,
  error,
  icon,
  showPassword,
  onTogglePassword,
  placeholder,
}) => {
  const IconComponent = icon?.component;
  const isPassword = type === "password";

  return (
    <div className="w-full">
      <div
        className={`w-full mt-4 relative
            [320px]:mt-3
            [375px]:mt-4
            sm:mt-6
            md:mt-8
            lg:mt-0 lg:mb-0`}>
        <p className="text-sm leading-relaxed text-neutral-500 sm:text-base sm:leading-7 pb-0 font-medium">
          {title}
        </p>
        <div className="relative">
          {icon?.position === "left" && IconComponent && (
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-2">
              <IconComponent
                className="text-gray-500 cursor-pointer"
                onClick={icon.onClick}
              />
            </div>
          )}
          <input
            type={isPassword ? (showPassword ? "text" : "password") : type}
            {...register(name)}
            className={`w-full border-b border-stone-300 pb-3 text-sm sm:pb-3 md:pb-4 lg:pb-0 focus:outline-none focus:border-orange-400 transition-all duration-200 ${
              error ? "border-red-500" : ""
            } ${icon?.position === "left" ? "pl-8" : ""} ${
              icon?.position === "right" || isPassword ? "pr-8" : ""
            }`}
            placeholder={placeholder}
          />
          {icon?.position === "right" && IconComponent && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <IconComponent
                className="text-gray-500 cursor-pointer"
                onClick={icon.onClick}
              />
            </div>
          )}
          {isPassword && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              {showPassword ? (
                <FaEyeSlash
                  className="text-gray-500 cursor-pointer"
                  onClick={onTogglePassword}
                />
              ) : (
                <FaEye
                  className="text-gray-500 cursor-pointer"
                  onClick={onTogglePassword}
                />
              )}
            </div>
          )}
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputForm;
