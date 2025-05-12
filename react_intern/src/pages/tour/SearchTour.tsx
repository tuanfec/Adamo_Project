import { setAllTour } from "@/app/slide/tourDataSlide";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Loading } from "@/components/common/Loading";
import { ViewAll } from "@/components/home/ViewAll";
import { useAttractiveTours, useTraditionalTours } from "@/hooks/useTours";
import { CommonLayout } from "@/layouts/CommonLayout";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import banner from "@/assets/banner_img.jpg";

export const SearchTour = () => {
  const dispatch = useDispatch();
  const searchTour = useSelector(
    (state: any) => state.tourDataSlide.searchTour
  );
  const dataTour = useSelector((state: any) => state.tourDataSlide.allTour);

  const { data: attractiveData, isLoading: isLoadingAttractive } =
    useAttractiveTours();
  const { data: traditionalData, isLoading: isLoadingTraditional } =
    useTraditionalTours();

  const attractiveToursWithSource = (attractiveData || []).map((tour: any) => ({
    ...tour,
    source: "attractive",
  }));
  const traditionalToursWithSource = (traditionalData || []).map(
    (tour: any) => ({
      ...tour,
      source: "traditional",
    })
  );

  useEffect(() => {
    const allTourData = [
      ...(attractiveToursWithSource || []),
      ...(traditionalToursWithSource || []),
    ];

    dispatch(setAllTour(allTourData));
  }, [attractiveData, traditionalData, dispatch]);

  if (isLoadingAttractive || isLoadingTraditional) {
    return <Loading />;
  }

  const dataFilter = dataTour.filter((item: any) => {
    const matchLocation =
      !searchTour.location ||
      item.location
        .trim()
        .toLowerCase()
        .includes(searchTour.location.trim().toLowerCase());

    const matchStartDate =
      !searchTour.startDate ||
      (item.startDate &&
        new Date(item.startDate) >= new Date(searchTour.startDate));
    const matchEndDate =
      !searchTour.endDate ||
      (item.endDate && new Date(item.endDate) <= new Date(searchTour.endDate));
    const matchType =
      !searchTour.type ||
      searchTour.type.length === 0 ||
      searchTour.type.some((t: string) => item.type.includes(t));

    return matchLocation && matchType && matchStartDate && matchEndDate;
  });

  return (
    <CommonLayout
      title="Attractive tour and interesting experiences"
      content="Search hundreds of tours and more"
      isDisplaySearchTour={true}
      isDisplayFeatured={false}
      img={banner}
      isHeader={false}
      isTour={true}
      isShow={true}>
      <div className="py-8 ">
        <Breadcrumb />
        <ViewAll tourData={dataFilter} isLoading={false} header={"Search"} />
      </div>
    </CommonLayout>
  );
};
