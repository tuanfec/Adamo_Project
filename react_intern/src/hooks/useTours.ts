import { TourData } from "./../types/tour";
import {
  changeSaveHotel,
  changeSaveTourAttractive,
  changeSaveTourTraditional,
  getComment,
  postComment,
} from "./../api/homeAPI";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAttractiveTours,
  getTourDetail,
  getTraditionalCultureTours,
} from "@/api/homeAPI";
import { useSelector } from "react-redux";
import { ChangeSave, PostComment } from "@/types/tour";

export const useAttractiveTours = () => {
  const tourData = useSelector((state: any) => state.tourDataSlide.tourData);
  const isSave = useSelector((state: any) => state.tourDataSlide.isSave);

  return useQuery({
    queryKey: ["attractiveTours"],
    queryFn: getAttractiveTours,
    enabled: !tourData || tourData.length === 0 || isSave,
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

export const useComment = (id: string) => {
  return useQuery({
    queryKey: ["comment", id],
    queryFn: () => getComment(id),
    enabled: !!id,
  });
};

export const usePostComment = () => {
  return useMutation({
    mutationKey: ["postCommentTour"],
    mutationFn: async ({ postData }: PostComment) => {
      return await postComment(postData);
    },
  });
};

export const useChangeSaveTour = () => {
  return useMutation({
    mutationKey: ["changeSaveTour"],
    mutationFn: async ({ isSave, id, isAttractive }: ChangeSave) => {
      if (isAttractive) {
        return await changeSaveTourAttractive(id, isSave);
      } else {
        return await changeSaveTourTraditional(id, isSave);
      }
    },
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
