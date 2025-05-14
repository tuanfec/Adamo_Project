import { FaArrowRight } from "react-icons/fa";

import { FaArrowLeft } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  onPageChange: (page: number) => void;
  isShow?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
  onPageChange,
  isShow,
}) => {
  return (
    <div className="flex justify-between items-center w-full gap-2 my-4">
      {isShow && (
        <div className="text-gray-500 md:ml-[45%] lg:ml-[45%]">
          Showing {currentPage}/{totalPages}
        </div>
      )}
      <div className="flex items-center gap-2">
        {currentPage > 1 && (
          <span
            onClick={handlePrevPage}
            className="bg-gray-200 dark:text-black h-[40px] w-[40.6px] flex items-center justify-center cursor-pointer hover:bg-gray-300">
            <FaArrowLeft />
          </span>
        )}

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            className={`px-4 py-2 ${
              currentPage === index + 1
                ? "bg-black text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}>
            {index + 1}
          </button>
        ))}
        {currentPage < totalPages && (
          <span
            onClick={handleNextPage}
            className="bg-gray-200 dark:text-black h-[40px] w-[40.6px] flex items-center justify-center cursor-pointer hover:bg-gray-300">
            <FaArrowRight />
          </span>
        )}
      </div>
    </div>
  );
};
