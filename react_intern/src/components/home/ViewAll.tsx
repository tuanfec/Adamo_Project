import { useState } from "react";
import { CardTour } from "./CardTour";
import { useDispatch, useSelector } from "react-redux";
import { FilterForm } from "../form/FilterForm";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { Pagination } from "../common/Pagination";
import { Loading } from "../common/Loading";
import { TourData } from "@/types/tour";
import { FloatButton } from "antd";
import { Filter } from "../common/Filter";
import { useTranslation } from "react-i18next";
import { useChangeSaveTour } from "@/hooks/useTours";
import { useQueryClient } from "@tanstack/react-query";
import { set } from "react-hook-form";
import { setIsSave } from "@/app/slide/tourDataSlide";

interface ViewAllProps {
  tourData: TourData[];
  isLoading: boolean;
  header: string;
  from?: string;
}

export const ViewAll: React.FC<ViewAllProps> = ({ tourData, header, from }) => {
  const filter = useSelector((state: any) => state.tourDataSlide.filter);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilter, setIsFilter] = useState(false);
  const [itemsPerPage] = useState(21);
  const { source } = useParams();
  const dispatch = useDispatch();
  const sourceView = source || from;
  // Check if filter has been applied (after clicking Apply Filter)
  const isFilterApplied = filter?.isApplied;
  const { t } = useTranslation();

  const displayData =
    isFilterApplied && tourData
      ? tourData.filter((item) => {
          const priceMatch =
            !filter.budget ||
            ((item.price ?? 0) >= filter.budget[0] &&
              (item.price ?? 0) <= filter.budget[1]);

          const durationMatch =
            !filter.duration?.length ||
            filter.duration.includes(item.duration ?? "");

          const typeMatch =
            !filter.typeTour?.length ||
            filter.typeTour.includes(item.type ?? "");

          return priceMatch && durationMatch && typeMatch;
        })
      : tourData || [];

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

  // Function to handle the previous page button click
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const viewDetail = (id: string, source: string) => {
    navigate(`/tours/view_detail/${sourceView || source}/${id}`, {
      state: { previousHeader: header, id },
    });
  };
  const renderPaginationButtons = () => {
    if (totalPages <= 1) return null;

    return (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        onPageChange={setCurrentPage}
        isShow={true}
      />
    );
  };

  const changeSave = useChangeSaveTour();
  const useQueyClient = useQueryClient();
  const handleChangeSaveTour = (id: string) => {
    dispatch(setIsSave(true));
    changeSave.mutate(
      {
        id,
        isSave: !tourData.find((item) => item.id === id)?.isSave,
        isAttractive: sourceView === "attractive",
      },
      {
        onSuccess: () => {
          useQueyClient.invalidateQueries({
            queryKey: ["tours"],
          });
          useQueyClient.invalidateQueries({
            queryKey: ["attractiveTours"],
          });
          dispatch(setIsSave(false));
        },
        onError: (error) => {
          console.error("Error updating save status:", error);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="lg:mb-10 w-full font-medium flex flex-col lg:flex-row md:flex-col">
        <p className="lg:w-[50%] md:w-[80%] w-full text-4xl dark:text-[#ffffff]">
          {header}
        </p>
        <div className="flex flex-row-reverse md:flex-row lg:flex-row justify-end flex-1 relative">
          <Filter isFilter={isFilter} setIsFilter={setIsFilter} />
          {isFilter && (
            <div className="absolute lg:w-1/2 w-full top-20 lg:right-0 z-10 shadow-lg">
              <FilterForm tourData={tourData} />
            </div>
          )}
        </div>
      </div>

      {isFilterApplied && displayData.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-2xl text-gray-500">{t("NotFound")}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map((item: TourData, index) => (
              <CardTour
                onClick={() => viewDetail(item.id, item.source || "")}
                key={index}
                image={item.image?.[0]}
                title={item.title}
                description={item.description}
                experiences={item.experiences}
                location={item.location}
                votes={item.reviews.rating}
                duration={item.duration}
                price={item.price}
                isSave={item.isSave}
                isHover={true}
                handleChangeSaveTour={() => handleChangeSaveTour(item.id || "")}
              />
            ))}
          </div>
          {renderPaginationButtons()}
        </>
      )}
      <FloatButton.BackTop visibilityHeight={1000} />
    </div>
  );
};
