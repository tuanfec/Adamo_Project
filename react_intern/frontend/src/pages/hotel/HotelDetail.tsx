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
import { useHotelDetail } from "@/hooks/useHotels";
import { setHotelDetail } from "@/app/slide/hotelDataSlide";
import { SelectRoom } from "@/components/selectRoom";
import { useChangeSaveHotel } from "@/hooks/useHotels";
import { useNotification } from "@/components/notifiction/NotificationProvider";
import { useTranslation } from "react-i18next";

const HotelDetail: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { source } = useParams();
  const notification = useNotification();

  const { data: hotelDataDetail } = useHotelDetail(id ?? "");

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(setStatePage(PageState.DESCRIPTION));
    if (hotelDataDetail) {
      dispatch(setHotelDetail(hotelDataDetail));
    }
  }, [id, hotelDataDetail, dispatch]);

  const statePage = useSelector((state: any) => state.statePageSlide.state);

  const changeSave = useChangeSaveHotel();
  const fetchDataDetail = useHotelDetail(id ?? "");
  const handleChangeSaveHotel = (id: string) => {
    const oldSave = hotelDataDetail?.isSave;
    const newSave = !oldSave;
    changeSave.mutate(
      {
        id,
        isSave: newSave,
      },
      {
        onSuccess: () => {
          fetchDataDetail.refetch();
          notification.success({
            message: newSave
              ? t("notification.saveHotlel")
              : t("notification.unsaveHotel"),
          });
        },
        onError: (error) => {
          console.error("Error updating save status:", error);
        },
      }
    );
  };
  return (
    <DetailLayout>
      <div className="py-8">
        <div className="mt-6 mb-12">
          <Breadcrumb />
        </div>
        <HeaderDetail hotelData={hotelDataDetail} />
        <div className="flex flex-col lg:flex-row gap-[6%]">
          <div className="w-full lg:w-[60%]">
            <ImageDetail
              onSubmit={handleChangeSaveHotel}
              data={hotelDataDetail}
            />
            <InfomationTour isTour={false} />
            {statePage === PageState.DESCRIPTION && (
              <DescriptionTour dataHotel={hotelDataDetail} />
            )}
            {statePage === PageState.SELECT_ROOM && (
              <SelectRoom data={hotelDataDetail} />
            )}
            {statePage === PageState.REVIEWS && (
              <ReviewTour
                data={hotelDataDetail?.reviews}
                isHotel={true}
                id={id ?? ""}
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
export default HotelDetail;
