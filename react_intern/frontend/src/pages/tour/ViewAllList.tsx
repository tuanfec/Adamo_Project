import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ViewAll } from "@/components/home/ViewAll";
import {
  useAllDestinations,
  useDataTours,
  useGetTourByLocation,
} from "@/hooks/useTours";
import { CommonLayout } from "@/layouts/CommonLayout";
import banner from "@assets/banner_img.jpg";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const ViewAllList: React.FC = () => {
  const { t } = useTranslation();
  const header = useLocation().state?.header;
  const location = useLocation().state.location;

  //Get data from API
  const {
    data: attractiveData,
    isLoading: attractiveLoading,
    error: errorAttractive,
  } = useDataTours("attractive");
  const {
    data: traditionalData,
    isLoading: traditionalLoading,
    error: errorTraditional,
  } = useDataTours("traditional");
  const {
    data: tourByDestination,
    isLoading: isLoadingDes,
    error: errorDestinations,
  } = useGetTourByLocation(useLocation().state?.location);
  const {
    data: allDestinations,
    isLoading: isLoadingAllDes,
    error: errorAllDestinations,
  } = useAllDestinations();

  const isAllDestination = useLocation().state?.from === "destination";
  const isDestination = useLocation().pathname.includes("destination");
  const isAttractive = header === "attractive";

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
      <div className="py-8">
        <Breadcrumb />
        {isAllDestination ? (
          <ViewAll
            tourData={allDestinations}
            isLoading={isLoadingAllDes}
            header={t("homePage.listTour_1")}
            isDestination={isDestination}
            isAllDestination={isAllDestination}
            error={errorAllDestinations}
          />
        ) : isDestination ? (
          <ViewAll
            tourData={tourByDestination}
            isLoading={isLoadingDes}
            header={location}
            isDestination={isDestination}
            error={errorDestinations}
          />
        ) : (
          <ViewAll
            tourData={isAttractive ? attractiveData : traditionalData}
            isLoading={isAttractive ? attractiveLoading : traditionalLoading}
            header={
              isAttractive ? t("homePage.listTour_2") : t("homePage.listTour_3")
            }
            error={isAttractive ? errorAttractive : errorTraditional}
          />
        )}
      </div>
    </CommonLayout>
  );
};
export default ViewAllList;
