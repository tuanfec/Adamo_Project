import { HotelFormData } from "@/types/hotel";
import { HotelCard } from "../home/HotelCard";
import { Pagination } from "../common/Pagination";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
export const ListHotels: React.FC<{
  hotels: HotelFormData[];
  isFilterApplied: boolean;
}> = ({ hotels, isFilterApplied }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
  const totalPages = Math.ceil(hotels.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = hotels.slice(indexOfFirstItem, indexOfLastItem);
  const navigate = useNavigate();
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  console.log(currentItems);
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
  return (
    <>
      {hotels.length !== 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentItems?.map((hotel: HotelFormData) => (
            <HotelCard
              key={hotel.id}
              data={hotel}
              onClick={() => handleViewDetail(hotel.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center py-20">
          <p className="text-2xl text-gray-500">
            No hotels found matching your filters
          </p>
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
