import { Include } from "@/types/tour";
import { FaCheck } from "react-icons/fa6";

interface IncludeSectionProps {
  includes: Include[][];
}

export const IncludeSection: React.FC<IncludeSectionProps> = ({ includes }) => {
  return (
    <div>
      <div className="text-xl font-medium my-5">What's Included</div>
      <div>
        {includes?.[0]?.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <FaCheck className="text-[#28B554]" />
            <p>{item.content}</p>
          </div>
        ))}
      </div>
      <div className="border-b border-gray-400 my-8"></div>
    </div>
  );
};
