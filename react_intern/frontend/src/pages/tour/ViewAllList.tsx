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
import { useLocation, useParams } from "react-router-dom";

const ViewAllList: React.FC = () => {
  const { t } = useTranslation();
  const { source } = useParams();

  const header = useLocation().state?.header;
  console.log("source", source);

  const { data: attractiveData, isLoading: attractiveLoading } =
    useDataTours("attractive");
  const { data: traditionalData, isLoading: traditionalLoading } =
    useDataTours("traditional");
  const { data: tourByDestination, isLoading: isLoadingDes } =
    useGetTourByLocation(useLocation().state?.location);
  const { data: allDestinations, isLoading: isLoadingAllDes } =
    useAllDestinations();

  const isAllDestination = useLocation().state?.from === "destination";
  const isDestination = useLocation().pathname.includes("destination");
  const isAttractive = header === "attractive";

  // useEffect(() => {
  //   distpath(setTourData(data));
  // }, [data]);

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
            header={header ?? ""}
            isDestination={isDestination}
            isAllDestination={isAllDestination}
          />
        ) : isDestination ? (
          <ViewAll
            tourData={tourByDestination}
            isLoading={isLoadingDes}
            header={header ?? ""}
            isDestination={isDestination}
          />
        ) : (
          <ViewAll
            tourData={isAttractive ? attractiveData : traditionalData}
            isLoading={isAttractive ? attractiveLoading : traditionalLoading}
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
