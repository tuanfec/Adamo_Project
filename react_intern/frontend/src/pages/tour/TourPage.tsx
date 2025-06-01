import { setAllTour } from "@/app/slide/tourDataSlide";
import banner from "@/assets/banner_img.jpg";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ViewAll } from "@/components/home/ViewAll";
import { useGetAllTours } from "@/hooks/useTours";
import { CommonLayout } from "@/layouts/CommonLayout";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const TourPage: React.FC = () => {
  const dispath = useDispatch();
  const { t } = useTranslation();

  const { data: tourData, isLoading } = useGetAllTours();

  useEffect(() => {
    if (tourData) {
      dispath(setAllTour(tourData));
    }
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
