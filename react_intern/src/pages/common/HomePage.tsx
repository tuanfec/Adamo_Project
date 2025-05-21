import { EmailSubcription } from "@/components/home/EmailSubcription";
import { Content } from "@/components/home/Content";
import { ListTour } from "@/components/home/ListTour";
import { useDataTours, useGetAllTours } from "@/hooks/useTours";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllTour,
  setAttractiveTour,
  setDestination,
  setTourData,
  setTraditionalTour,
} from "@/app/slide/tourDataSlide";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FloatButton } from "antd";
import { CommonLayout } from "@/layouts/CommonLayout";
import banner from "@/assets/banner_img.jpg";
import { useTranslation } from "react-i18next";
import { useHotels } from "@/hooks/useHotels";
import { setHotelData } from "@/app/slide/hotelDataSlide";
import ListDestinations from "@/components/home/ListDestinations";
import { useAllDestinations } from "@/hooks/useTours";

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Get data from API
  const { data: attractiveData } = useDataTours("attractive");
  const { data: traditionalData } = useDataTours("traditional");
  const { data: hotelData } = useHotels();
  const { data: allTourData } = useGetAllTours();
  const { data: allDestinations } = useAllDestinations();

  //Select data from redux
  const attractiveTourRedux = useSelector(
    (state: any) => state.tourDataSlide.attractiveTour
  );
  const traditionalTourRedux = useSelector(
    (state: any) => state.tourDataSlide.traditionalTour
  );
  const allDestinationsRedux = useSelector(
    (state: any) => state.tourDataSlide.destination
  );

  //dispatch data to redux
  useEffect(() => {
    if (
      !attractiveData ||
      !traditionalData ||
      !hotelData ||
      !allTourData ||
      !allDestinations
    )
      return;
    dispatch(setAllTour(allTourData));
    dispatch(setHotelData(hotelData));
    dispatch(setAttractiveTour(attractiveData));
    dispatch(setTraditionalTour(traditionalData));
    dispatch(setDestination(allDestinations));
  }, [attractiveData, traditionalData, hotelData, dispatch]);

  const handleViewAll = (isAttractive?: boolean, isDestination?: boolean) => {
    dispatch(setAllTour(allTourData));
    if (isAttractive) {
      dispatch(setTourData(attractiveData));
    } else if (!isAttractive && !isDestination) {
      dispatch(setTourData(traditionalData));
    }
    if (isDestination) {
      navigate(`/tours/view_all_destination`, {
        state: {
          from: "destination",
        },
      });
    } else
      navigate(
        `/tours/view_all/${isAttractive ? "attractive" : "traditional"}`,
        {
          state: {
            header: isAttractive ? "attractive" : "traditional",
          },
        }
      );
  };

  return (
    <CommonLayout
      title={t("banner.homePage.title")}
      content={t("banner.homePage.content")}
      isDisplaySearchTour={true}
      isDisplayFeatured={true}
      img={banner}
      isHeader={true}
      isTour={true}
      isShow={true}>
      <div className="py-8 ">
        <Content />
        <div data-aos="fade-up" data-aos-duration="1000">
          <ListDestinations
            onClick={() => handleViewAll(true, true)}
            DataDestinations={allDestinationsRedux}
          />
        </div>
        <div data-aos="fade-up" data-aos-duration="1000">
          {attractiveTourRedux && (
            <ListTour
              data={attractiveTourRedux}
              header={t("homePage.listTour_2")}
              slidesPerView={3}
              spaceBetween={40}
              onClick={() => handleViewAll(true, false)}
              source="attractive"
            />
          )}
        </div>
        <div data-aos-duration="1000">
          {traditionalTourRedux && (
            <ListTour
              data={traditionalTourRedux}
              header={t("homePage.listTour_3")}
              slidesPerView={3}
              spaceBetween={40}
              onClick={() => handleViewAll(false, false)}
              source="traditional"
            />
          )}
        </div>
        <EmailSubcription />
      </div>
      <FloatButton.BackTop visibilityHeight={200} />
    </CommonLayout>
  );
};
export default HomePage;
