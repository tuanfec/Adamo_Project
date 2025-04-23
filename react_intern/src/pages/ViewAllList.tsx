import { ViewAll } from "@/components/home/ViewAll";
import { HomeLayout } from "@/layouts/HomeLayout";
import { useSelector } from "react-redux";
import { Breadcrumb } from "@/components/common/Breadcrumb";

export const ViewAllList: React.FC = () => {
  const tourData = useSelector((state: any) => state.tourDataSlide.tourData);

  return (
    <HomeLayout>
      <div className="py-8">
        <Breadcrumb />
        <ViewAll data={tourData} />
      </div>
    </HomeLayout>
  );
};
