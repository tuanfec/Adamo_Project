import {
  getBookHistoryByUser,
  getBookHistoryDetail,
  getVoucher,
  postBooking,
  reduceVoucher,
} from "@/api/homeAPI";
import { ReduceVoucher } from "@/types/tour";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useGetVoucher = () => {
  return useQuery({
    queryKey: ["voucher"],
    queryFn: getVoucher,
  });
};

export const usePostBooking = () => {
  return useMutation({
    mutationKey: ["postBooking"],
    mutationFn: async (data: any) => {
      return await postBooking(data);
    },
  });
};

export const useReduceVoucher = () => {
  return useMutation({
    mutationKey: ["reduceVoucher"],
    mutationFn: async ({ remaining, id }: ReduceVoucher) => {
      return await reduceVoucher(remaining, id);
    },
  });
};

export const useGetBookHistory = (userId: string) => {
  const BookingHistoryDataRedux = useSelector(
    (state: any) => state.bookingSlide.bookHistory
  );
  return useQuery({
    queryKey: ["bookHistory"],
    queryFn: () => getBookHistoryByUser(userId),
    enabled: !BookingHistoryDataRedux || BookingHistoryDataRedux.length === 0,
  });
};

export const useGetBookHistoryDetail = (id: string | undefined) => {
  return useQuery({
    queryKey: ["bookHistoryDetail", id],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;
      return getBookHistoryDetail(id);
    },
  });
};
