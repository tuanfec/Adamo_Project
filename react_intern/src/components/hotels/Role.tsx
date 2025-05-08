import { HotelFormData } from "@/types/hotel";

interface RoleProps {
  data: HotelFormData;
}

export const Role: React.FC<RoleProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-medium">Rules</p>
      <div className="flex gap-10 mr-10">
        <div className="w-full">
          <p className="font-medium text-lg text-[#FF7B42] mb-2">Checkin</p>
          <div className="text-center text-xl font-medium bg-[#F5F5F5] px-1 py-3">
            {data.tourDescription.rules.time.checkIn}
          </div>
        </div>
        <div className="w-full">
          <p className="font-medium text-lg text-[#FF7B42] mb-2">Checkout</p>
          <div className="text-center text-xl font-medium bg-[#F5F5F5] px-1 py-3">
            {data.tourDescription.rules.time.checkOut}
          </div>
        </div>
      </div>
      <div>
        {data.tourDescription.rules.roleInformation.map((item, index) => (
          <li className="text-md text-[#4F4F4F] mb-1" key={index}>
            {item}
          </li>
        ))}
      </div>
    </div>
  );
};
