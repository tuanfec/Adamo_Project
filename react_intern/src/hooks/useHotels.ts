import { getHotels } from "@/api/homeAPI";
import { getHotelDetail } from "@/api/homeAPI";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useHotels = () => {
  const hotelData = useSelector((state: any) => state.hotelDataSlide.hotelData);

  return useQuery({
    queryKey: ["hotels"],
    queryFn: getHotels,
    enabled: !hotelData || hotelData.length === 0,
  });
};

export const useHotelDetail = (id: string) => {
  return useQuery({
    queryKey: ["hotelDetail", id],
    queryFn: () => getHotelDetail(id),
  });
};
