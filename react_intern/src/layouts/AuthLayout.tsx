"use client";

import * as React from "react";

interface FormImageLayoutProps {
  formComponent: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  className?: string;
}

export const AuthLayout: React.FC<FormImageLayoutProps> = ({
  formComponent,
  imageSrc,
  imageAlt,
  className = "",
}) => {
  return (
    <div className={`w-full min-h-screen ${className}`}>
      <div className="flex flex-col lg:flex-row w-full h-full ">
        {/* Form Section - 4/10 on desktop, full width on mobile */}
        <div className=" flex-[0_0_40%] w-full p-6 lg:p-8  bg-white dark:bg-[#1e1e1e] dark:text-white">
          <div className="w-full">{formComponent}</div>
        </div>

        {/* Image Section - 6/10 on desktop, hidden on mobile */}
        <div className="flex-[0_0_60%] h-screen hidden md:block">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-[100%] h-full min-h-screen object-cover"
            style={{ display: "block" }}
          />
        </div>
      </div>
    </div>
  );
};
