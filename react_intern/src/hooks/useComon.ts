import {
  getBookHistory,
  getVoucher,
  postBooking,
  reduceVoucher,
} from "@/api/homeAPI";
import { ReduceVoucher } from "@/types/tour";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export const useGetBookHistory = () => {
  return useQuery({
    queryKey: ["bookhistory"],
    queryFn: getBookHistory,
  });
};
