import { Breadcrumb } from "@/components/common/Breadcrumb";
import { useHotels } from "@/hooks/useHotels";
import { ListHotels } from "@/components/hotels/ListHotels";
import { useDispatch, useSelector } from "react-redux";
import { setHotelData } from "@/app/slide/hotelDataSlide";
import { useEffect } from "react";
import { Header } from "@/components/hotels/Header";
import { CommonLayout } from "@/layouts/CommonLayout";
import banner from "@/assets/hotel_banner.jpg";
import { useTranslation } from "react-i18next";
const HotelPage: React.FC = () => {
  const { t } = useTranslation();
  const { data: hotels } = useHotels();
  const dispatch = useDispatch();

  //select Redux data
  const hotelData = useSelector((state: any) => state.hotelDataSlide.hotelData);
  const sortBy = useSelector((state: any) => state.hotelDataSlide.sortBy);
  const filterData = useSelector((state: any) => state.hotelDataSlide.filter);
  console.log(hotels);

  useEffect(() => {
    dispatch(setHotelData(hotels));
  }, [hotels, dispatch]);

  //funcion sort hotel
  const sortedHotels = (hotels || []).slice().sort((a: any, b: any) => {
    if (sortBy === t("Sort.Type.highL")) {
      const minA = Math.min(...a.rooms.map((room: any) => room.price));
      const minB = Math.min(...b.rooms.map((room: any) => room.price));
      return minB - minA;
    }
    if (sortBy === t("Sort.Type.lowH")) {
      const minA = Math.min(...a.rooms.map((room: any) => room.price));
      const minB = Math.min(...b.rooms.map((room: any) => room.price));
      return minA - minB;
    }
    if (sortBy === t("Sort.Type.rate") || sortBy === t("Sort.Type.star")) {
      if (sortBy === t("Sort.Type.rate")) {
        return b.reviews.rating - a.reviews.rating;
      }
      if (sortBy === t("Sort.Type.star")) {
        return b.hotelStar - a.hotelStar;
      }
    }
    return 0;
  });

  // filter in sortData
  const filteredHotels = sortedHotels.filter((hotel: any) => {
    const matchBudget = hotel.rooms.some(
      (room: any) =>
        room.price >= filterData.budget[0] && room.price <= filterData.budget[1]
    );
    const matchStar: boolean =
      filterData?.hotelStar.length === 0 ||
      filterData?.hotelStar.includes(hotel.hotelStar.toString());
    const matchScore: boolean =
      filterData?.score.length === 0 ||
      hotel?.reviews?.rating >= filterData.score[0];
    return matchBudget && matchStar && matchScore;
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
        <Header hotelData={hotelData} />
        {filterData.isApplied ? (
          <ListHotels
            isFilterApplied={filterData.isApplied}
            hotels={filteredHotels}
          />
        ) : (
          <ListHotels
            isFilterApplied={filterData.isApplied}
            hotels={sortedHotels}
          />
        )}
      </div>
    </CommonLayout>
  );
};
export default HotelPage;
