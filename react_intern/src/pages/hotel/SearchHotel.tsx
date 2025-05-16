import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Loading } from "@/components/common/Loading";
import { CommonLayout } from "@/layouts/CommonLayout";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import banner from "@/assets/hotel_banner.jpg";
import { setHotelData } from "@/app/slide/hotelDataSlide";
import { useHotels } from "@/hooks/useHotels";
import { ListHotels } from "@/components/hotels/ListHotels";
import { useTranslation } from "react-i18next";
const SearchHotel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const searchHotel = useSelector(
    (state: any) => state.hotelDataSlide.searchHotel
  );

  const { data: hotelData, isLoading: isLoadingHotel } = useHotels();

  useEffect(() => {
    dispatch(setHotelData(hotelData));
  }, [hotelData, dispatch]);

  if (isLoadingHotel) {
    return <Loading />;
  }
  const dataFilter = hotelData?.filter((item: any) => {
    const matchLocation =
      !searchHotel.location ||
      item.location
        .trim()
        .toLowerCase()
        .includes(searchHotel.location.trim().toLowerCase());
    const matchStartDate =
      !searchHotel.startDate ||
      (item.startDate &&
        new Date(item.startDate) >= new Date(searchHotel.startDate));
    const matchEndDate =
      !searchHotel.endDate ||
      (item.endDate && new Date(item.endDate) <= new Date(searchHotel.endDate));

    return matchLocation && matchStartDate && matchEndDate;
  });

  return (
    <CommonLayout
      title={t("banner.hotelPage.title")}
      content={t("banner.hotelPage.content")}
      isDisplaySearchTour={true}
      isDisplayFeatured={false}
      img={banner}
      isHeader={false}
      isTour={false}
      isShow={true}>
      <div className="py-8 ">
        <Breadcrumb />
        <ListHotels hotels={dataFilter} isFilterApplied={false} />
      </div>
    </CommonLayout>
  );
};
export default SearchHotel;
