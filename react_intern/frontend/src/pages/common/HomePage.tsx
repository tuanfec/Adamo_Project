import { EmailSubcription } from "@/components/home/EmailSubcription";
import { Content } from "@/components/home/Content";
import { ListTour } from "@/components/home/ListTour";
import { useDataTours, useGetAllTours } from "@/hooks/useTours";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllTour,
  setAttractiveTour,
  setDestination,
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
  const { data: attractiveData, error: errorAttractive } =
    useDataTours("attractive");
  const { data: traditionalData, error: errorTraditional } =
    useDataTours("traditional");
  const { data: allDestinations, error: errorAllDestinations } =
    useAllDestinations();
  const { data: hotelData } = useHotels();
  const { data: allTourData } = useGetAllTours();

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
            error={errorAllDestinations}
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
              error={errorAttractive}
            />
          )}
        </div>
        <div data-aos="fade-up" data-aos-duration="1000">
          {traditionalTourRedux && (
            <ListTour
              data={traditionalTourRedux}
              header={t("homePage.listTour_3")}
              slidesPerView={3}
              spaceBetween={40}
              onClick={() => handleViewAll(false, false)}
              source="traditional"
              error={errorTraditional}
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
