import { useQuery } from "@tanstack/react-query";
import {
  getAttractiveTours,
  getTourDetail,
  getTraditionalCultureTours,
} from "@/api/homeAPI";

export const useAttractiveTours = () => {
  return useQuery({
    queryKey: ["attractiveTours"],
    queryFn: getAttractiveTours,
  });
};

export const useTraditionalTours = () => {
  return useQuery({
    queryKey: ["traditionalTours"],
    queryFn: getTraditionalCultureTours,
  });
};

export const useTourDetail = (id: string, isAttractive: boolean) => {
  return useQuery({
    queryKey: ["tourDetail", id],
    queryFn: () => getTourDetail(id, isAttractive),
  });
};
