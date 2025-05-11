import { ViewAll } from "@/components/home/ViewAll";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { useLocation, useParams } from "react-router-dom";
import { useTourList } from "@/hooks/useTourList";
import { useSelector } from "react-redux";
import { CommonLayout } from "@/layouts/CommonLayout";
import banner from "@assets/banner_img.jpg";
export const ViewAllList: React.FC = () => {
  const { source } = useParams();
  const header = useLocation().state?.header;
  const { data, isLoading } = useTourList(source);
  const tourData = useSelector((state: any) => state.tourDataSlide.tourData);

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
