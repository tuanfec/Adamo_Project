import React from "react";

interface TravelerFormProps {
  // Add props here later if needed
}

const TravelerForm: React.FC<TravelerFormProps> = () => {
  return (
    <div className="space-y-8">
      {/* Lead Traveler Section */}
      <div>
        <h2 className=" text-xl font-medium text-[#2A2A2A] mb-4">
          Lead Traveler (Adult)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-['Poppins'] text-base font-semibold text-[#2A2A2A] mb-2">
              First Name*
            </label>
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-3 border border-[#E5E5E5] rounded text-[#888888] "
            />
          </div>
          <div>
            <label className="block font-['Poppins'] text-base font-semibold text-[#2A2A2A] mb-2">
              Last Name*
            </label>
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-3 border border-[#E5E5E5] rounded text-[#888888] "
            />
          </div>
          <div>
            <label className="block font-['Poppins'] text-base font-semibold text-[#2A2A2A] mb-2">
              Email*
            </label>
            <input
              type="email"
              placeholder="email@domain.com"
              className="w-full p-3 border border-[#E5E5E5] rounded text-[#888888] "
            />
          </div>
          <div>
            <label className="block font-['Poppins'] text-base font-semibold text-[#2A2A2A] mb-2">
              Phone Number*
            </label>
            <input
              type="tel"
              placeholder="Your Phone"
              className="w-full p-3 border border-[#E5E5E5] rounded text-[#888888] "
            />
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div>
        <h2 className=" text-xl font-medium text-[#2A2A2A] mb-4">Address</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block  text-base font-medium text-[#2A2A2A] mb-2">
              Your Address
            </label>
            <input
              type="text"
              placeholder="Your Address"
              className="w-full p-3 border border-[#E5E5E5] rounded text-[#888888] "
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block  text-base font-medium text-[#2A2A2A] mb-2">
                City
              </label>
              <input
                type="text"
                placeholder="Your City"
                className="w-full p-3 border border-[#E5E5E5] rounded text-[#888888] "
              />
            </div>
            <div>
              <label className="block  text-base font-medium text-[#2A2A2A] mb-2">
                State/Province/Region
              </label>
              <input
                type="text"
                placeholder="Your State/Province/Region"
                className="w-full p-3 border border-[#E5E5E5] rounded text-[#888888] "
              />
            </div>
            <div>
              <label className="block  text-base font-medium text-[#2A2A2A] mb-2">
                Zip Code/Postal Code
              </label>
              <input
                type="text"
                placeholder="Zip Code/Postal Code"
                className="w-full p-3 border border-[#E5E5E5] rounded text-[#888888] "
              />
            </div>
            <div>
              <label className="block  text-base font-medium text-[#2A2A2A] mb-2">
                Country
              </label>
              <input
                type="text"
                placeholder="Your Country"
                className="w-full p-3 border border-[#E5E5E5] rounded text-[#888888] "
              />
            </div>
          </div>
        </div>
      </div>

      {/* Special Requirement Section */}
      <div>
        <h2 className=" text-xl font-medium text-[#2A2A2A] mb-4">
          Special Requirement
        </h2>
        <textarea
          placeholder="Special Requirement"
          rows={4}
          className="w-full p-3 border border-[#E5E5E5] rounded text-[#888888] "
        />
      </div>
    </div>
  );
};

export default TravelerForm;
