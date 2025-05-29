import { ViewAll } from "@/components/home/ViewAll";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { useLocation, useParams } from "react-router-dom";
import { useTourList } from "@/hooks/useTourList";
import { useDispatch, useSelector } from "react-redux";
import { CommonLayout } from "@/layouts/CommonLayout";
import banner from "@assets/banner_img.jpg";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { setTourData } from "@/app/slide/tourDataSlide";
import { useAllDestinations, useGetTourByLocation } from "@/hooks/useTours";
const ViewAllList: React.FC = () => {
  const { t } = useTranslation();
  const { source } = useParams();
  const distpath = useDispatch();

  const header = useLocation().state?.header;
  const tourData = useSelector((state: any) => state.tourDataSlide.tourData);

  const { data, isLoading } = useTourList(source);
  const { data: tourByDestination } = useGetTourByLocation(
    useLocation().state?.location
  );
  const { data: allDestinations } = useAllDestinations();

  const isAllDestination = useLocation().state?.from === "destination";
  const isDestination = useLocation().pathname.includes("destination");
  const isAttractive = header === "attractive";

  useEffect(() => {
    distpath(setTourData(data));
  }, [data]);

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
            isLoading={isLoading}
            header={header ?? ""}
            isDestination={isDestination}
            isAllDestination={isAllDestination}
          />
        ) : isDestination ? (
          <ViewAll
            tourData={tourByDestination}
            isLoading={isLoading}
            header={header ?? ""}
            isDestination={isDestination}
          />
        ) : (
          <ViewAll
            tourData={tourData && tourData.length > 0 ? tourData : data}
            isLoading={isLoading}
            header={
              isAttractive ? t("homePage.listTour_2") : t("homePage.listTour_3")
            }
          />
        )}
      </div>
    </CommonLayout>
  );
};
export default ViewAllList;
