import { ViewAll } from "@/components/home/ViewAll";
import { Header } from "@/components/hotels/Header";
import { ListHotels } from "@/components/hotels/ListHotels";
import { useGetSaveHotel, useGetSaveTour } from "@/hooks/useTours";
import { DetailLayout } from "@/layouts/DetailLayout";
import { Tabs, TabsProps } from "antd";
import { useTranslation } from "react-i18next";

const SaveTourAndHotel = () => {
  const { t } = useTranslation();

  const { data: TourSaveData, isLoading: isLoadingTour } = useGetSaveTour();
  const { data: HotelSaveData } = useGetSaveHotel();

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: t("navbar.tour"),
      children: (
        <>
          <ViewAll
            tourData={TourSaveData}
            header={t("navbar.save")}
            isLoading={isLoadingTour}
          />
        </>
      ),
    },
    {
      key: "2",
      label: t("navbar.hotels"),
      children: (
        <>
          <Header header={t("navbar.save")} hotelData={HotelSaveData} />
          <ListHotels hotels={HotelSaveData} isFilterApplied={false} />
        </>
      ),
    },
  ];
  return (
    <DetailLayout>
      <div className="my-10">
        <Tabs items={items} type="card" tabBarGutter={20} />
      </div>
    </DetailLayout>
  );
};

export default SaveTourAndHotel;
