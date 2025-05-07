import { getHotels } from "@/api/homeAPI";

import { getHotelDetail } from "@/api/homeAPI";
import { useQuery } from "@tanstack/react-query";

export const useHotels = () => {
  return useQuery({
    queryKey: ["hotels"],
    queryFn: getHotels,
  });
};

export const useHotelDetail = (id: string) => {
  return useQuery({
    queryKey: ["hotelDetail", id],
    queryFn: () => getHotelDetail(id),
  });
};
