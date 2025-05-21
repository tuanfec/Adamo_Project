import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ViewAll } from "@/components/home/ViewAll";
import { useGetAllTours } from "@/hooks/useTours";
import { CommonLayout } from "@/layouts/CommonLayout";
import banner from "@/assets/banner_img.jpg";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTourData } from "@/app/slide/tourDataSlide";
const TourPage: React.FC = () => {
  const dispath = useDispatch();
  const { data: tourData, isLoading } = useGetAllTours();
  const { t } = useTranslation();

  useEffect(() => {
    dispath(setTourData(tourData));
  }, [tourData]);

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
      <Breadcrumb />
      <ViewAll
        tourData={tourData}
        isLoading={isLoading}
        header={t("homePage.listTour_2")}
      />
    </CommonLayout>
  );
};
export default TourPage;
