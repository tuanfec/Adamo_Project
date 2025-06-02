import {
  changeSaveTours,
  getAllTourByLocation,
  getAllTours,
  getComment,
  getDestinations,
  getSaveHotel,
  getSaveTour,
  postComment,
} from "@/api/homeAPI";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAttractiveTours, getTourDetail } from "@/api/homeAPI";
import { useSelector } from "react-redux";
import { ChangeSave, PostComment } from "@/types/tour";

export const useDataTours = (tourType: string) => {
  const attractiveTourRedux = useSelector(
    (state: any) => state.tourDataSlide.attractiveTour || []
  );
  const traditionalTourRedux = useSelector(
    (state: any) => state.tourDataSlide.traditionalTour || []
  );

  return useQuery({
    queryKey: ["tourData", tourType],
    queryFn: () => getAttractiveTours(tourType),
    enabled:
      tourType === "attractive"
        ? attractiveTourRedux.length === 0
        : traditionalTourRedux.length === 0,
    retry: 1,
  });
};

export const useGetAllTours = () => {
  const allToursData = useSelector((state: any) => state.tourDataSlide.allTour);
  const isSave = useSelector((state: any) => state.tourDataSlide.isSave);

  return useQuery({
    queryKey: ["allTours"],
    queryFn: getAllTours,
    enabled: allToursData?.length === 0 || isSave,
  });
};

export const useTourDetail = (id: string, tourType: string) => {
  return useQuery({
    queryKey: ["tourDetail", id],
    queryFn: () => getTourDetail(id, tourType),
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
    mutationFn: async ({ isSave, id }: ChangeSave) => {
      return await changeSaveTours(id, isSave);
    },
  });
};

export const useGetTourByLocation = (location: string) => {
  return useQuery({
    queryKey: ["tourByLocation", location],
    queryFn: () => {
      return getAllTourByLocation(location);
    },
  });
};

export const useAllDestinations = () => {
  const allDestinationsRedux = useSelector(
    (state: any) => state.tourDataSlide.destination || []
  );
  return useQuery({
    queryKey: ["allDestinations"],
    queryFn: getDestinations,
    enabled: allDestinationsRedux.length === 0,
    retry: 1,
  });
};

export const useGetSaveTour = () => {
  return useQuery({
    queryKey: ["saveTour"],
    queryFn: getSaveTour,
  });
};

export const useGetSaveHotel = () => {
  return useQuery({
    queryKey: ["saveHotel"],
    queryFn: getSaveHotel,
  });
};
