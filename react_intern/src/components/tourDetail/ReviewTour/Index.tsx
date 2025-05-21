import { Comment, ReviewStats, User } from "@/types/tour";
import { ReviewCard } from "./component/ReviewCard";
import { Comment as CommentComponent } from "./component/Comment";
import { useNavigate } from "react-router-dom";
import { ListComment } from "./component/ListComment";
import { Pagination } from "@/components/common/Pagination";
import { useState } from "react";
import { ReviewCardHotel } from "./component/ReviewCardHotel";
import { useNotification } from "@/components/notifiction/NotificationProvider";
import { useTranslation } from "react-i18next";
import { useComment, usePostComment } from "@/hooks/useTours";
import { CommentSchemaValue } from "@/types/zod";
import { useQueryClient } from "@tanstack/react-query";
interface ReviewTourProps {
  data: ReviewStats;
  isHotel: boolean;
  id: string;
}

export const ReviewTour: React.FC<ReviewTourProps> = ({
  data,
  isHotel,
  id,
}) => {
  const isLogin = JSON.parse(localStorage.getItem("isLoggedIn") || "false");
  const { data: commemt } = useComment(id);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [openReview, setOpenReview] = useState(false);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(commemt?.length / itemsPerPage);
  const notification = useNotification();
  const { t } = useTranslation();

  // Hàm xử lý phân trang
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
        message: t("notification.Login"),
        onClick: () =>
          navigate("/login", { state: { from: window.location.pathname } }),
      });
    } else {
      setOpenReview(!openReview);
    }
  };

  // Lấy thông tin người dùng từ localStorage
  const user: User | null = (() => {
    try {
      const stored = localStorage.getItem("user");
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      return {
        id: parsed.uid,
        name: parsed.displayName,
        avatar: parsed.photoURL,
      };
    } catch (error) {
      return null;
    }
  })();

  const postComment = usePostComment();
  const useQueyClient = useQueryClient();

  //ham post comment
  const handPostComment = (data: CommentSchemaValue) => {
    const postData = {
      ...data,
      createdAt: new Date().toISOString(),
      keyId: id,
      user: user,
    };
    postComment.mutate(
      { id, postData },
      {
        onSuccess: () => {
          useQueyClient.invalidateQueries({ queryKey: ["comment", id] });
          notification.success({
            message: t("notification.postCommentSuccess"),
          });
        },
      }
    );
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
        openReview &&
        isLogin && (
          <CommentComponent isHotel={isHotel} onSubmit={handPostComment} />
        )
      ) : isLogin ? (
        <CommentComponent isHotel={isHotel} onSubmit={handPostComment} />
      ) : (
        <>
          <div
            onClick={() =>
              navigate("/login", { state: { from: window.location.pathname } })
            }
            className="bg-gray-300 dark:bg-[#575656] text-center text-black font-medium cursor-pointer p-2 rounded-lg">
            {t("Infomation.checkLogin")}
          </div>
          <div className="border-t border-gray-400 dark:border-gray-600 my-10"></div>
        </>
      )}

      {commemt
        ?.sort((a: Comment, b: Comment) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        })
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((comment: Comment, index: number) => (
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
