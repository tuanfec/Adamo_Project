import { DetailLayout } from "@/layouts/DetailLayout";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Policy } from "@/components/common/Policy/Index";
const PolicyPage = () => {
  return (
    <DetailLayout>
      <div className="mt-6 mb-12">
        <Breadcrumb />
      </div>
      <div className="flex flex-col gap-4">
        <Policy />
      </div>
    </DetailLayout>
  );
};
export default PolicyPage;
