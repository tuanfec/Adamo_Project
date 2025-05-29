import { changeSaveHotel, getHotels } from "@/api/homeAPI";
import { getHotelDetail } from "@/api/homeAPI";
import { ChangeSave } from "@/types/tour";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useHotels = () => {
  const hotelData = useSelector((state: any) => state.hotelDataSlide.hotelData);
  const isSave = useSelector((state: any) => state.hotelDataSlide.isSave);

  return useQuery({
    queryKey: ["hotels"],
    queryFn: getHotels,
    enabled: !hotelData || hotelData.length === 0 || isSave,
  });
};

export const useHotelDetail = (id: string) => {
  return useQuery({
    queryKey: ["hotelDetail", id],
    queryFn: () => getHotelDetail(id),
  });
};
export const useChangeSaveHotel = () => {
  return useMutation({
    mutationKey: ["changeSaveHotel"],
    mutationFn: async ({ isSave, id }: ChangeSave) => {
      return await changeSaveHotel(id, isSave);
    },
  });
};
