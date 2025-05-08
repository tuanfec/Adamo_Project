import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ViewAll } from "@/components/home/ViewAll";
import { useAttractiveTours } from "@/hooks/useTours";
import { TourLayout } from "@/layouts/TourLayout";

export const TourPage: React.FC = () => {
  const { data: tourData, isLoading } = useAttractiveTours();

  return (
    <TourLayout>
      <div className="py-8">
        <Breadcrumb />
        <ViewAll
          from="attractive"
          tourData={tourData}
          isLoading={isLoading}
          header={"Attractive tour and interesting experiences"}
        />
      </div>
    </TourLayout>
  );
};
