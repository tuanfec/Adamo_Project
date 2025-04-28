import { Comment, ReviewStats } from "@/types/tour";
import { ReviewCard } from "./component/ReviewCard";
import { Comment as CommentComponent } from "./component/Comment";
import { useNavigate } from "react-router-dom";
import { ListComment } from "./component/ListComment";
import { Pagination } from "@/components/common/Pagination";
import { useState } from "react";
interface ReviewTourProps {
  data: ReviewStats;
  comments: Comment[];
}

export const ReviewTour: React.FC<ReviewTourProps> = ({ data, comments }) => {
  const isLogin = JSON.parse(localStorage.getItem("isLoggedIn") || "false");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(comments?.length / itemsPerPage);
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className="flex flex-col gap-4">
      <ReviewCard stats={data} />
      <div className="border-t border-gray-400 mb-10"></div>
      {isLogin ? (
        <CommentComponent />
      ) : (
        <div
          onClick={() => navigate("/login")}
          className="bg-gray-300 text-center text-black font-medium cursor-pointer p-2 rounded-lg">
          Please login to comment
        </div>
      )}
      <div className="border-t border-gray-400 my-10"></div>
      {comments
        ?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((comment, index) => <ListComment data={comment} key={index} />)}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        onPageChange={handlePageChange}
        isShow={false}
      />
    </div>
  );
};
