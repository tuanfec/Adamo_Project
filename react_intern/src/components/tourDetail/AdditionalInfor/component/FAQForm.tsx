import { DropContent } from "@/components/common/DropContent/Index";
import { FAQ } from "@/types/tour";
import { useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";

interface FAQFormProps {
  data: FAQ[];
}

export const FAQForm: React.FC<FAQFormProps> = ({ data }) => {
  const [openStates, setOpenStates] = useState<{ [key: number]: boolean }>({});

  const toggleOpen = (index: number) => {
    setOpenStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div>
      {data?.map((item, index) => (
        <DropContent
          icon={<FaRegQuestionCircle />}
          onClick={() => toggleOpen(index)}
          key={index}
          isOpen={openStates[index] || false}
          headerTitle={item.question}
          content={
            <div>
              <p>{item.answer}</p>
            </div>
          }
        />
      ))}
    </div>
  );
};
