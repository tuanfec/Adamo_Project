import { useState } from "react";
import { CardTour } from "./CardTour";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FilterForm } from "../form/FilterForm";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface CardTourProps {
  image?: string;
  title?: string;
  description?: string;
  experiences?: number;
  location?: string;
  votes?: number;
  duration?: string;
  price?: number;
  isSave?: boolean;
  type?: string;
}

interface ViewAllProps {
  data: CardTourProps[];
}

export const ViewAll: React.FC<ViewAllProps> = ({ data }) => {
  const header = useSelector((state: any) => state.tourDataSlide.header);
  const filter = useSelector((state: any) => state.tourDataSlide.filter);
  console.log(data);

  const [currentPage, setCurrentPage] = useState(1);
  const [isFilter, setIsFilter] = useState(false);
  const [itemsPerPage] = useState(21);
  const navigate = useNavigate();
  // Check if filter has been applied (after clicking Apply Filter)
  const isFilterApplied = filter?.isApplied;

  const displayData = isFilterApplied
    ? data.filter((item) => {
        const priceMatch =
          !filter.budget ||
          ((item.price ?? 0) >= filter.budget[0] &&
            (item.price ?? 0) <= filter.budget[1]);

        const durationMatch =
          !filter.duration?.length ||
          filter.duration.includes(item.duration ?? "");

        const typeMatch =
          !filter.typeTour?.length || filter.typeTour.includes(item.type ?? "");

        return priceMatch && durationMatch && typeMatch;
      })
    : data;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = displayData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(displayData.length / itemsPerPage);

  // Reset to first page when filter changes
  React.useEffect(() => {
    if (isFilterApplied) {
      setCurrentPage(1);
    }
  }, [filter, isFilterApplied]);

  React.useEffect(() => {
    if (data.length === 0) {
      navigate(-1);
    }
  }, [data]);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const renderPaginationButtons = () => {
    if (totalPages <= 1) return null;

    const handleViewDetail = (id: string) => {
      navigate(`/view_detail/${id}`);
    };

    return (
      <div className="flex justify-between items-center w-full gap-2 my-4">
        <div className="text-gray-500 md:ml-[45%]  lg:ml-[45%]">
          Showing {currentPage}/{totalPages}
        </div>
        <div className="flex items-center gap-2">
          {currentPage > 1 && (
            <span
              onClick={handlePrevPage}
              className="bg-gray-200 h-[40px] w-[40.6px] flex items-center justify-center cursor-pointer hover:bg-gray-300">
              <FaArrowLeft />
            </span>
          )}

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
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
              className="bg-gray-200 h-[40px] w-[40.6px] flex items-center justify-center cursor-pointer hover:bg-gray-300">
              <FaArrowRight />
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="lg:mb-10 w-full font-medium flex flex-col lg:flex-row md:flex-col">
        <p className="lg:w-[50%] md:w-[80%] w-full text-4xl">{header}</p>
        <div className="flex flex-row-reverse md:flex-row lg:flex-row justify-end flex-1 relative">
          {isFilter ? (
            <button
              onClick={() => setIsFilter(!isFilter)}
              className="bg-white flex items-center justify-around px-2 gap-2 text-black h-[38px] w-[85px] lg:mt-10 mt-4 border border-black">
              Filter <IoMdClose />
            </button>
          ) : (
            <button
              onClick={() => setIsFilter(!isFilter)}
              className="bg-black h-[38px] w-[75px] lg:mt-10 mt-4 text-white">
              Filter
            </button>
          )}
          {isFilter && (
            <div className="absolute w-1/2 top-20  lg:right-0 z-10 shadow-lg">
              <FilterForm />
            </div>
          )}
        </div>
      </div>

      {isFilterApplied && displayData.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-2xl text-gray-500">
            No tours found matching your filters
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentItems.map((item, index) => (
              <CardTour
                key={index}
                image={item.image}
                title={item.title}
                description={item.description}
                experiences={item.experiences}
                location={item.location}
                votes={item.votes}
                duration={item.duration}
                price={item.price}
                isSave={item.isSave}
              />
            ))}
          </div>
          {renderPaginationButtons()}
        </>
      )}
    </div>
  );
};
