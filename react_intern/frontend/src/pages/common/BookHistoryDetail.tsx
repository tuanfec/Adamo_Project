import { BookHistoryDetail } from "@/components/bookHistory/bookDetail/Index";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { DetailLayout } from "@/layouts/DetailLayout";

const BookHistoryDetailPage = () => {
  return (
    <DetailLayout>
      <div className="my-10">
        <Breadcrumb />
        <BookHistoryDetail />
      </div>
    </DetailLayout>
  );
};
export default BookHistoryDetailPage;
