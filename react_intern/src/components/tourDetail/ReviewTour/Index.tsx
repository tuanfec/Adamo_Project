import { Comment, ReviewStats } from "@/types/tour";
import { ReviewCard } from "./component/ReviewCard";
import { Comment as CommentComponent } from "./component/Comment";
import { useNavigate } from "react-router-dom";
import { ListComment } from "./component/ListComment";
import { Pagination } from "@/components/common/Pagination";
import { useState } from "react";
import { ReviewCardHotel } from "./component/ReviewCardHotel";
import { useNotification } from "@/components/notifiction/NotificationProvider";
interface ReviewTourProps {
  data: ReviewStats;
  comments: Comment[];
  isHotel: boolean;
}

export const ReviewTour: React.FC<ReviewTourProps> = ({
  data,
  comments,
  isHotel,
}) => {
  const isLogin = JSON.parse(localStorage.getItem("isLoggedIn") || "false");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [openReview, setOpenReview] = useState(false);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(comments?.length / itemsPerPage);
  const notification = useNotification();
  console.log(comments);
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleOpenReview = () => {
    if (!isLogin) {
      notification.warning({
        message: "Please login to comment",
        onClick: () =>
          navigate("/login", { state: { from: window.location.pathname } }),
      });
    } else {
      setOpenReview(!openReview);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      {isHotel ? (
        <ReviewCardHotel stats={data} onClick={handleOpenReview} />
      ) : (
        <ReviewCard stats={data} />
      )}
      <div className="border-t border-gray-400 dark:border-gray-600 mb-10"></div>
      {isHotel ? (
        openReview && isLogin && <CommentComponent isHotel={isHotel} />
      ) : isLogin ? (
        <CommentComponent isHotel={isHotel} />
      ) : (
        <>
          <div
            onClick={() =>
              navigate("/login", { state: { from: window.location.pathname } })
            }
            className="bg-gray-300 dark:bg-[#575656] text-center text-black font-medium cursor-pointer p-2 rounded-lg">
            Please login to comment
          </div>
          <div className="border-t border-gray-400 dark:border-gray-600 my-10"></div>
        </>
      )}

      {comments
        ?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((comment, index) => (
          <ListComment data={comment} key={index} isHotel={isHotel} />
        ))}
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
