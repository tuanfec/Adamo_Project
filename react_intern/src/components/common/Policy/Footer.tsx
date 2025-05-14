import { Policy } from "@/types/policy";
import { Link } from "react-router";

export const Footer: React.FC<{ data: Policy }> = ({ data }) => {
  return (
    <div className="flex flex-col gap-6 w-full my-8">
      {data.endPolicy.map((item, index) => (
        <div className="text-[#1E1E1ECC] dark:text-[#bbbbbb]" key={index}>
          {item}
        </div>
      ))}
      <p className="text-[#1E1E1ECC] dark:text-[#bbbbbb]">
        If you have questions about this Privacy Policy, Ojimah’s practices or
        your transactions at Ojimah’s page
        <Link
          className="text-blue-600 mx-2"
          to="https://www.ojimah.com/aboutus">
          www.Ojimah.com/aboutus
        </Link>
        please contact us in “My Account” or “My Booking”.
      </p>
    </div>
  );
};
