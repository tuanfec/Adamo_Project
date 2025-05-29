import { useState } from "react";
import { CardTour } from "./CardTour";
import { useDispatch, useSelector } from "react-redux";
import { FilterForm } from "../form/FilterForm";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../common/Pagination";
import { TourData } from "@/types/tour";
import { FloatButton } from "antd";
import { Filter } from "../common/Filter";
import { useTranslation } from "react-i18next";
import { useChangeSaveTour } from "@/hooks/useTours";
import { useQueryClient } from "@tanstack/react-query";
import { setIsSave } from "@/app/slide/tourDataSlide";
import { useNotification } from "@/components/notifiction/NotificationProvider";

interface ViewAllProps {
  tourData: TourData[];
  isLoading: boolean;
  header: string;
  isDestination?: boolean;
  isAllDestination?: boolean;
}

export const ViewAll: React.FC<ViewAllProps> = ({
  tourData,
  header,
  isDestination,
  isAllDestination,
}) => {
  const filter = useSelector((state: any) => state.tourDataSlide.filter);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilter, setIsFilter] = useState(false);
  const [itemsPerPage] = useState(21);
  const dispatch = useDispatch();
  console.log(isAllDestination);

  // Check if filter has been applied (after clicking Apply Filter)
  const isFilterApplied = filter?.isApplied;
  const { t } = useTranslation();
  const notification = useNotification();

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
  const viewDetail = (id: string, source: string, location?: string) => {
    if (isAllDestination) {
      navigate(`/tours/view_all/destination/${location}`, {
        state: { location },
      });
    } else
      navigate(`/tours/view_detail/${source}/${id}`, {
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
    const oldIsSave = tourData.find((item) => item.id === id)?.isSave;
    const newIsSave = !oldIsSave;
    dispatch(setIsSave(true));
    changeSave.mutate(
      {
        id,
        isSave: newIsSave,
      },
      {
        onSuccess: () => {
          useQueyClient.setQueryData(["tours"], (oldData: any) => {
            if (!oldData) return oldData;
            return oldData.map((tour: any) => {
              if (tour.id === id) {
                return { ...tour, isSave: newIsSave };
              }
              return tour;
            });
          });
          useQueyClient.setQueryData(["allTours"], (oldData: any) => {
            if (!oldData) return oldData;
            return oldData.map((tour: any) => {
              if (tour.id === id) {
                return { ...tour, isSave: newIsSave };
              }
              return tour;
            });
          });
          if (isDestination) {
            useQueyClient.invalidateQueries({
              queryKey: ["tourByLocation"],
            });
          }
          dispatch(setIsSave(false));
          notification.success({
            message: newIsSave
              ? t("notification.saveTour")
              : t("notification.unsaveTour"),
          });
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
        <p className="lg:w-[50%] md:w-[80%] w-full lg:text-4xl md:text-3xl text-2xl mt-[7px] dark:text-[#ffffff]">
          {header}
        </p>
        <div className="flex flex-row-reverse md:flex-row lg:flex-row justify-end flex-1 relative">
          <Filter isFilter={isFilter} setIsFilter={setIsFilter} />
          {isFilter && (
            <div className="absolute lg:w-1/2 w-full top-20 lg:right-0 z-100 shadow-lg">
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
                onClick={() =>
                  viewDetail(item.id, item.tourType || "", item.location || "")
                }
                key={index}
                image={item.image?.[0]}
                title={item?.title}
                description={item?.description}
                experiences={item?.experiences}
                location={item?.location}
                votes={item?.reviews?.rating}
                duration={item?.duration}
                price={item?.price}
                isSave={item?.isSave}
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
