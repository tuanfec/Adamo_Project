import { GoDotFill } from "react-icons/go";

interface DataList {
  data: string[];
}

export const AddtionalListContent: React.FC<DataList> = ({ data }) => {
  return (
    <div>
      {data?.map((item, index) => (
        <div
          className="flex items-start gap-2 text-md text-gray-700 dark:text-[#bbbbbb]"
          key={index}>
          <p>
            <GoDotFill className="mt-1 text-sm" />
          </p>

          <span>{item}</span>
        </div>
      ))}
    </div>
  );
};
