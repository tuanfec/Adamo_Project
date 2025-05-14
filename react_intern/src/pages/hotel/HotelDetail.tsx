import { Breadcrumb } from "@/components/common/Breadcrumb";
import { DetailCardForm } from "@/components/form/DetailCardForm";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { DetailLayout } from "@/layouts/DetailLayout";
import { HeaderDetail } from "@/components/tourDetail/TitleTour";
import { ImageDetail } from "@/components/tourDetail/ImageDetail";
import { InfomationTour } from "@/components/tourDetail/InfomationTour";
import { PageState, setStatePage } from "@/app/slide/statePageSlide";
import { DescriptionTour } from "@/components/tourDetail/DescriptionTour";
import { RelatedTour } from "@/components/tourDetail/RelatedTour";
import { ReviewTour } from "@/components/tourDetail/ReviewTour/Index";
import { Loading } from "@/components/common/Loading";
import { useHotelDetail } from "@/hooks/useHotels";
import { setHotelDetail } from "@/app/slide/hotelDataSlide";
import { SelectRoom } from "@/components/selectRoom";

export const HotelDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { source } = useParams();
  const { data: hotelDataDetail, isLoading } = useHotelDetail(id ?? "");
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(setStatePage(PageState.DESCRIPTION));
    // Update tour detail in redux when data changes
    if (hotelDataDetail) {
      dispatch(setHotelDetail(hotelDataDetail));
    }
  }, [id, hotelDataDetail, dispatch]);

  const statePage = useSelector((state: any) => state.statePageSlide.state);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <DetailLayout>
      <div className="py-8">
        <div className="mt-6 mb-12">
          <Breadcrumb />
        </div>
        <HeaderDetail hotelData={hotelDataDetail} />
        <div className="flex flex-col lg:flex-row gap-[6%]">
          <div className="w-full lg:w-[60%]">
            <ImageDetail data={hotelDataDetail} />
            <InfomationTour isTour={false} />
            {statePage === PageState.DESCRIPTION && (
              <DescriptionTour dataHotel={hotelDataDetail} />
            )}
            {statePage === PageState.SELECT_ROOM && (
              <SelectRoom data={hotelDataDetail} />
            )}
            {statePage === PageState.REVIEWS && (
              <ReviewTour
                comments={hotelDataDetail?.comments}
                data={hotelDataDetail?.reviews}
                isHotel={true}
              />
            )}
          </div>
          <div className="w-full lg:w-[40%]">
            <DetailCardForm isHotel={true} hotelData={hotelDataDetail} />
          </div>
        </div>
        <RelatedTour
          isHotel={true}
          source={source ?? ""}
          currentTourId={id ?? ""}
        />
      </div>
    </DetailLayout>
  );
};
