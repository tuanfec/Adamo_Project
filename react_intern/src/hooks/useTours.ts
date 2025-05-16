import { useQuery } from "@tanstack/react-query";
import {
  getAttractiveTours,
  getTourDetail,
  getTraditionalCultureTours,
} from "@/api/homeAPI";
import { useSelector } from "react-redux";

export const useAttractiveTours = () => {
  const tourData = useSelector((state: any) => state.tourDataSlide.tourData);
  console.log(tourData);

  return useQuery({
    queryKey: ["attractiveTours"],
    queryFn: getAttractiveTours,
    enabled: !tourData || tourData.length === 0,
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
