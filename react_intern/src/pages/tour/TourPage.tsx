import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ViewAll } from "@/components/home/ViewAll";
import { useAttractiveTours } from "@/hooks/useTours";
import { CommonLayout } from "@/layouts/CommonLayout";
import banner from "@/assets/banner_img.jpg";
export const TourPage: React.FC = () => {
  const { data: tourData, isLoading } = useAttractiveTours();

  return (
    <CommonLayout
      title="Search hundreds of tours and more"
      content="Attractive tour and interesting experiences"
      isDisplaySearchTour={true}
      isDisplayFeatured={false}
      img={banner}
      isHeader={false}
      isTour={true}
      isShow={true}>
      <Breadcrumb />
      <ViewAll
        from="attractive"
        tourData={tourData}
        isLoading={isLoading}
        header={"Attractive tour and interesting experiences"}
      />
    </CommonLayout>
  );
};
