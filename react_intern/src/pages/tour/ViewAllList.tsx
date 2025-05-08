import { ViewAll } from "@/components/home/ViewAll";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { useLocation, useParams } from "react-router-dom";
import { useTourList } from "@/hooks/useTourList";
import { TourLayout } from "@/layouts/TourLayout";
import { useSelector } from "react-redux";
export const ViewAllList: React.FC = () => {
  const { source } = useParams();
  const header = useLocation().state?.header;
  const { data, isLoading } = useTourList(source);
  const tourData = useSelector((state: any) => state.tourDataSlide.tourData);

  return (
    <TourLayout>
      <div className="py-8">
        <Breadcrumb />
        <ViewAll
          tourData={tourData && tourData.length > 0 ? tourData : data}
          isLoading={isLoading}
          header={header ?? ""}
        />
      </div>
    </TourLayout>
  );
};
