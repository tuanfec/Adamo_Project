"use client";

import * as React from "react";

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const EmailInput: React.FC<EmailInputProps> = ({
  value,
  onChange,
  className = "",
}) => {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      <label
        htmlFor="email"
        className="text-neutral-500 
          text-base
          [320px]:text-xs [320px]:mb-2
          [375px]:text-sm [375px]:mb-3
          sm:text-sm sm:mb-4
          md:text-base md:mb-5
          lg:text-sm lg:mb-0">
        Email Address
      </label>
      <div className="relative w-full">
        <input
          type="email"
          id="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border-b border-stone-300 pb-3
            text-lg
            [320px]:text-sm [320px]:pb-2
            [375px]:text-base [375px]:pb-2.5
            sm:text-lg sm:pb-3
            md:text-xl md:pb-4
            lg:text-lg lg:pb-3
            focus:outline-none focus:border-orange-400
            transition-all duration-200"
          aria-label="Email Address"
          required
        />
      </div>
    </div>
  );
};
