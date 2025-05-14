import { ContentPolicy, Policy } from "@/types/policy";
import { lineSeparation } from "@/hooks/usePolicy";
export const Content: React.FC<{ data: Policy }> = ({ data }) => {
  return (
    <div className="flex flex-col gap-10 w-full my-8">
      {data?.contentPolicy?.map((item: ContentPolicy, index: number) => (
        <div key={index}>
          <p id={item.title} className="text-2xl font-bold">
            {item.title}
          </p>
          <div>
            {item.description.map((description, index) => (
              <div className="mt-4 flex flex-col gap-2" key={index}>
                <div className="flex flex-col gap-5 text-[#1E1E1ECC] dark:text-[#bbbbbb]">
                  {lineSeparation(description.content).map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
                <div className="ml-5 text-[#1E1E1ECC]">
                  {description.listContent.map((listContent, index) => (
                    <li className="my-4 dark:text-[#bbbbbb]" key={index}>
                      {listContent}
                    </li>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div>
            {item.information.map((information, index) => (
              <div className="mt-4 flex flex-col gap-2" key={index}>
                <div id={information.title} className="text-lg font-bold my-3">
                  {information.title}
                </div>
                <div className="flex flex-col gap-6 text-[#1E1E1ECC] dark:text-[#bbbbbb]">
                  {lineSeparation(information.description).map(
                    (line, index) => (
                      <div key={index}>{line}</div>
                    )
                  )}
                </div>
                <div className="ml-5 text-[#1E1E1ECC] dark:text-[#bbbbbb]">
                  {information.listDescription.map((listDescription, index) => (
                    <li className="my-4" key={index}>
                      {listDescription}
                    </li>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
