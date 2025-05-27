import { BookHistory } from "@/components/bookHistory/Index";
import { DetailLayout } from "@/layouts/DetailLayout";

const BookHistoryPage = () => {
  return (
    <DetailLayout>
      <div className="my-10">
        <BookHistory />
      </div>
    </DetailLayout>
  );
};
export default BookHistoryPage;
