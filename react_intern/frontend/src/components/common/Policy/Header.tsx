import { lineSeparation } from "@/hooks/usePolicy";
import { Policy } from "@/types/policy";
import { FiDownload } from "react-icons/fi";

export const Header: React.FC<{ data: Policy }> = ({ data }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-2/7 flex flex-col gap-2">
        <div className="text-4xl font-bold">{data?.title}</div>
        <div className="text-sm mt-4 text-[#5E6D77] dark:text-[#bbbbbb] font-medium">
          Last update: {data?.lastUpdate}
        </div>
        <div className="flex w-full mt-2 justify-center cursor-pointer items-center gap-2 bg-[#FF7B42] text-white px-4 py-2 rounded-md ">
          <FiDownload />
          <div>Download</div>
        </div>
      </div>
      <div className="w-full">
        <div>
          {lineSeparation(data.description).map((line, index) => (
            <div
              className="mt-4 italic text-[#1E1E1ECC] dark:text-[#bbbbbb]"
              key={index}>
              {line}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1 mt-5 text-[#1E1E1ECC] dark:text-[#bbbbbb]">
          {data.questions.map((question, index) => (
            <div key={index}>{question}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
