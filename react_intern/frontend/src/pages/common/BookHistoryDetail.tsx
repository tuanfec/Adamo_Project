import { BookHistoryDetail } from "@/components/bookHistory/bookDetail/Index";
import { DetailLayout } from "@/layouts/DetailLayout";

const BookHistoryDetailPage = () => {
  return (
    <DetailLayout>
      <div className="my-10">
        <BookHistoryDetail />
      </div>
    </DetailLayout>
  );
};
export default BookHistoryDetailPage;
