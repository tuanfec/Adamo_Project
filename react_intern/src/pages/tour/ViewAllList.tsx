import { ViewAll } from "@/components/home/ViewAll";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { useLocation, useParams } from "react-router-dom";
import { useTourList } from "@/hooks/useTourList";
import { useSelector } from "react-redux";
import { CommonLayout } from "@/layouts/CommonLayout";
import banner from "@assets/banner_img.jpg";
import { useTranslation } from "react-i18next";
const ViewAllList: React.FC = () => {
  const { t } = useTranslation();
  const { source } = useParams();
  const header = useLocation().state?.header;
  const { data, isLoading } = useTourList(source);
  const tourData = useSelector((state: any) => state.tourDataSlide.tourData);

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
        <ViewAll
          tourData={tourData && tourData.length > 0 ? tourData : data}
          isLoading={isLoading}
          header={header ?? ""}
        />
      </div>
    </CommonLayout>
  );
};
export default ViewAllList;
