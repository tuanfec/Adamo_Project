import React from "react";

interface TourSummaryProps {
  // Add props here later if needed
}

const TourSummary: React.FC<TourSummaryProps> = () => {
  return (
    <div className="bg-[#F4F4F4] p-6 rounded-lg">
      <h2 className=" text-lg font-medium text-[#1C1C1E] mb-4">
        Discover interesting things in the romantic coastal city of Vungtau
      </h2>

      {/* Location */}
      <div className="flex items-center space-x-2 mb-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FF7B42"
          strokeWidth="1.5"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" />
          <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" />
        </svg>
        <span className=" text-sm text-[#636567]">
          Vungtau City, Baria-Vungtau
        </span>
      </div>

      {/* Tour Info */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between">
          <span className=" text-sm text-[#636567]">Duration:</span>
          <span className=" text-sm font-medium text-[#1C1C1E]">
            3 days - 2 nights
          </span>
        </div>
        <div className="flex justify-between">
          <span className=" text-sm text-[#636567]">Tour type:</span>
          <span className=" text-sm font-medium text-[#1C1C1E]">
            Sun - Beach
          </span>
        </div>
      </div>

      {/* Date and People */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-2 bg-white p-3 rounded">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF7B42"
            strokeWidth="1.5"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2V5" />
            <path d="M16 2V5" />
            <path d="M3 8H21" />
            <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" />
          </svg>
          <span className=" text-sm text-[#1C1C1E]">
            25/02/2021 - 28/02/2021
          </span>
        </div>
        <div className="flex items-center space-x-2 bg-white p-3 rounded">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF7B42"
            strokeWidth="1.5"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" />
            <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" />
            <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" />
            <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" />
          </svg>
          <span className=" text-sm text-[#1C1C1E]">2 Adults - 1 Children</span>
        </div>
      </div>

      {/* Promo Code */}
      <div className="bg-white p-4 rounded mb-6">
        <h3 className=" text-sm text-[#636567] mb-2">Promo Code</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            className="flex-1 p-2 border border-[#E5E5E5] rounded text-sm"
            placeholder="Enter promo code"
          />
          <button className="px-4 py-2 bg-[#0AAAEF] text-white rounded border border-[#FF7B42] font-['Poppins'] font-semibold">
            Apply
          </button>
        </div>
      </div>

      {/* Total */}
      <div className="bg-[#1C1C1E] text-white p-4 rounded flex justify-between items-center">
        <span className=" text-xl">Total</span>
        <span className=" text-xl font-bold">$450.00</span>
      </div>
    </div>
  );
};

export default TourSummary;
