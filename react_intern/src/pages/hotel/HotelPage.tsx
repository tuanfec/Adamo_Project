import { Breadcrumb } from "@/components/common/Breadcrumb";
import { useHotels } from "@/hooks/useHotels";
import { Loading } from "@/components/common/Loading";
import { ListHotels } from "@/components/hotels/ListHotels";
import { useDispatch, useSelector } from "react-redux";
import { setHotelData } from "@/app/slide/hotelDataSlide";
import { useEffect } from "react";
import { Header } from "@/components/hotels/Header";
import { CommonLayout } from "@/layouts/CommonLayout";
import banner from "@/assets/hotel_banner.jpg";
const HotelPage: React.FC = () => {
  const { data: hotels, isLoading } = useHotels();
  const dispatch = useDispatch();
  const hotelData = useSelector((state: any) => state.hotelDataSlide.hotelData);
  const sortBy = useSelector((state: any) => state.hotelDataSlide.sortBy);
  const filterData = useSelector((state: any) => state.hotelDataSlide.filter);

  useEffect(() => {
    dispatch(setHotelData(hotels));
  }, [hotels, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  const sortedHotels = (hotels || []).slice().sort((a: any, b: any) => {
    if (sortBy === "Price high to low") {
      const minA = Math.min(...a.rooms.map((room: any) => room.price));
      const minB = Math.min(...b.rooms.map((room: any) => room.price));
      return minB - minA;
    }
    if (sortBy === "Price low to high") {
      const minA = Math.min(...a.rooms.map((room: any) => room.price));
      const minB = Math.min(...b.rooms.map((room: any) => room.price));
      return minA - minB;
    }
    if (sortBy === "Rating" || sortBy === "Star") {
      if (sortBy === "Rating") {
        return b.reviews.rating - a.reviews.rating;
      }
      if (sortBy === "Star") {
        return b.hotelStar - a.hotelStar;
      }
    }
    return 0;
  });

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
      title="From cozy country homes to funky city apartments"
      content="Find deals on hotels, homes, and much more..."
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
