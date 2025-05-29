"use client";

import * as React from "react";
interface ActionButtonProps {
  className?: string;
  children: React.ReactNode;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  className = "",
  children,
  type,
  onClick,
  disabled = false,
}) => {
  const baseStyles =
    "w-full py-3 px-4 rounded-lg font-medium transition-all duration-200";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles}  ${className}
        text-sm cursor-pointer 
        [320px]:text-xs [320px]:py-2
        [375px]:text-sm [375px]:py-2.5
        sm:text-base sm:py-3
        md:text-lg md:py-4
        lg:text-base lg:py-4 `}>
      {children}
    </button>
  );
};
