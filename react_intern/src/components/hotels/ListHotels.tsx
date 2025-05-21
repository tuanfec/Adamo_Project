import { HotelFormData } from "@/types/hotel";
import { HotelCard } from "../home/HotelCard";
import { Pagination } from "../common/Pagination";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useChangeSaveHotel } from "@/hooks/useHotels";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setIsSave } from "@/app/slide/hotelDataSlide";
import { useTranslation } from "react-i18next";
import { useNotification } from "@/components/notifiction/NotificationProvider";
export const ListHotels: React.FC<{
  hotels: HotelFormData[];
  isFilterApplied: boolean;
}> = ({ hotels, isFilterApplied }) => {
  const { t } = useTranslation();
  const notification = useNotification();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
  const totalPages = Math.ceil(hotels.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = hotels.slice(indexOfFirstItem, indexOfLastItem);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  React.useEffect(() => {
    if (isFilterApplied) {
      setCurrentPage(1);
    }
  }, [isFilterApplied]);

  const handleViewDetail = (id: string) => {
    navigate(`/hotels/view_detail/${id}`);
  };

  const changeSave = useChangeSaveHotel();
  const useQueyClient = useQueryClient();
  const handleChangeSaveHotel = (id: string) => {
    const oldSave = hotels?.find((hotel) => hotel.id === id)?.isSave;
    const newSave = !oldSave;
    dispatch(setIsSave(true));
    changeSave.mutate(
      {
        id,
        isSave: !hotels?.find((hotel) => hotel.id === id)?.isSave,
      },
      {
        onSuccess: () => {
          dispatch(setIsSave(false));
          useQueyClient.invalidateQueries({ queryKey: ["hotels"] });
          notification.success({
            message: newSave
              ? t("notification.saveHotlel")
              : t("notification.unsaveHotel"),
          });
        },
        onError: (error) => {
          console.error("Error updating save status:", error);
        },
      }
    );
  };
  return (
    <>
      {hotels.length !== 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentItems?.map((hotel: HotelFormData) => (
            <HotelCard
              key={hotel.id}
              data={hotel}
              onClick={() => handleViewDetail(hotel.id)}
              handleChangeSaveHotel={() => handleChangeSaveHotel(hotel.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center py-20">
          <p className="text-2xl text-gray-500">{t("NoFoundHotel")}</p>
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        onPageChange={onPageChange}
        isShow={true}
      />
    </>
  );
};
