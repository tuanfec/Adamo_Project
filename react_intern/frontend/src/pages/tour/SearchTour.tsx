import { setAllTour } from "@/app/slide/tourDataSlide";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ViewAll } from "@/components/home/ViewAll";
import { useGetAllTours } from "@/hooks/useTours";
import { CommonLayout } from "@/layouts/CommonLayout";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import banner from "@/assets/banner_img.jpg";
import { useTranslation } from "react-i18next";

const SearchTour = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const searchTour = useSelector(
    (state: any) => state.tourDataSlide.searchTour
  );
  const dataTour = useSelector((state: any) => state.tourDataSlide.allTour);

  const { data } = useGetAllTours();

  useEffect(() => {
    {
      if (data) {
        dispatch(setAllTour(data));
      }
    }
  }, [data, dispatch]);

  const dataFilter = dataTour?.filter((item: any) => {
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
  console.log(dataFilter);

  return (
    <CommonLayout
      title={t("banner.tourPage.title")}
      content={t("banner.tourPage.content")}
      isDisplaySearchTour={true}
      isDisplayFeatured={false}
      img={banner}
      isHeader={false}
      isTour={true}
      isShow={true}>
      <div className="py-8 ">
        <Breadcrumb />
        {dataFilter.length > 0 ? (
          <ViewAll
            tourData={dataFilter}
            isLoading={false}
            header={t("banner.tourPage.header")}
          />
        ) : (
          <div className="flex justify-center items-center py-20">
            <p className="text-2xl text-gray-500">{t("NotFoundSearchTour")}</p>
          </div>
        )}
      </div>
    </CommonLayout>
  );
};
export default SearchTour;
