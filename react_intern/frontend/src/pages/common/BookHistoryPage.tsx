import { BookHistory } from "@/components/bookHistory/Index";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { DetailLayout } from "@/layouts/DetailLayout";

const BookHistoryPage = () => {
  return (
    <DetailLayout>
      <div className="my-10">
        <Breadcrumb />
        <BookHistory />
      </div>
    </DetailLayout>
  );
};
export default BookHistoryPage;
