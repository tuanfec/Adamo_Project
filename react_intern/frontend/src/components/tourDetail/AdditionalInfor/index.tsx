import { AdditionalInfo } from "@/types/tour";
import { AddtionalListContent } from "./component/AddtionalList";
import { FAQForm } from "./component/FAQForm";

interface AdditionalInfoProps {
  data: AdditionalInfo;
}

export const AdditionaInfor: React.FC<AdditionalInfoProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-10 my-5">
      <AddtionalListContent data={data?.listContent} />
      <FAQForm data={data?.faq} />
    </div>
  );
};
