import { EmailSubcription } from "@/components/home/EmailSubcription";
import { Content } from "@/components/home/Content";
import { ListTour } from "@/components/home/ListTour";
import { useAttractiveTours, useTraditionalTours } from "@/hooks/useTours";
import { Loading } from "@/components/common/Loading";
import { useDispatch } from "react-redux";
import { setAllTour, setTourData } from "@/app/slide/tourDataSlide";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FloatButton } from "antd";
import { CommonLayout } from "@/layouts/CommonLayout";
import banner from "@/assets/banner_img.jpg";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { data: attractiveData, isLoading: isLoadingAttractive } =
    useAttractiveTours();
  const { data: traditionalData, isLoading: isLoadingTraditional } =
    useTraditionalTours();
  const navigate = useNavigate();

  // Add source to each tour item
  const attractiveWithSource = attractiveData?.map((tour: any) => ({
    ...tour,
    source: "attractive",
  }));
  const traditionalWithSource = traditionalData?.map((tour: any) => ({
    ...tour,
    source: "traditional",
  }));

  const allTourData = [...(attractiveData || []), ...(traditionalData || [])];
  useEffect(() => {
    dispatch(setAllTour(allTourData));
  }, [attractiveData, traditionalData, dispatch]);

  if (isLoadingAttractive || isLoadingTraditional) {
    return <Loading />;
  }
  const handleViewAll = (isAttractive: boolean) => {
    dispatch(setAllTour(allTourData));
    if (isAttractive) {
      dispatch(setTourData(attractiveData));
    } else {
      dispatch(setTourData(traditionalData));
    }
    navigate(`/tours/view_all/${isAttractive ? "attractive" : "traditional"}`, {
      state: {
        header: isAttractive
          ? "Attractive tour and interesting experiences"
          : "Experience the traditional cultural beauties of Vietnam",
      },
    });
  };
  return (
    <CommonLayout
      title="Perfect place for your stories"
      content="Welcome to NgaoduVietnam"
      isDisplaySearchTour={true}
      isDisplayFeatured={true}
      img={banner}
      isHeader={true}
      isTour={true}
      isShow={true}>
      <div className="py-8 ">
        <Content />
        <div data-aos="fade-up" data-aos-duration="1000">
          {attractiveData && (
            <ListTour
              data={attractiveData}
              header="Discover fascinating destinations"
              slidesPerView={4}
              spaceBetween={40}
            />
          )}
        </div>
        <div data-aos="fade-up" data-aos-duration="1000">
          {attractiveWithSource && (
            <ListTour
              data={attractiveWithSource}
              header="Attractive tour and interesting experiences"
              slidesPerView={3}
              spaceBetween={40}
              onClick={() => handleViewAll(true)}
            />
          )}
        </div>
        <div data-aos="fade-up" data-aos-duration="1000">
          {traditionalWithSource && (
            <ListTour
              data={traditionalWithSource}
              header="Experience the traditional cultural beauties of Vietnam"
              slidesPerView={3}
              spaceBetween={40}
              onClick={() => handleViewAll(false)}
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
