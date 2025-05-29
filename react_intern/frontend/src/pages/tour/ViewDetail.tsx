import { Breadcrumb } from "@/components/common/Breadcrumb";
import { DetailCardForm } from "@/components/form/DetailCardForm";
import { useChangeSaveTour, useTourDetail } from "@/hooks/useTours";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTourDetail } from "@/app/slide/tourDataSlide";
import { useEffect } from "react";
import { DetailLayout } from "@/layouts/DetailLayout";
import { HeaderDetail } from "@/components/tourDetail/TitleTour";
import { ImageDetail } from "@/components/tourDetail/ImageDetail";
import { InfomationTour } from "@/components/tourDetail/InfomationTour";
import { PageState, setStatePage } from "@/app/slide/statePageSlide";
import { DescriptionTour } from "@/components/tourDetail/DescriptionTour";
import { RelatedTour } from "@/components/tourDetail/RelatedTour";
import { AdditionaInfor } from "@/components/tourDetail/AdditionalInfor";
import { ReviewTour } from "@/components/tourDetail/ReviewTour/Index";
import { useNotification } from "@/components/notifiction/NotificationProvider";
import { useTranslation } from "react-i18next";

const ViewDetail: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { source } = useParams();
  const { t } = useTranslation();
  const notification = useNotification();

  const { data: tourDataDetail } = useTourDetail(id ?? "", source ?? "");

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(setStatePage(PageState.DESCRIPTION));
    if (tourDataDetail) {
      dispatch(setTourDetail(tourDataDetail));
    }
  }, [id, tourDataDetail, dispatch]);

  const statePage = useSelector((state: any) => state.statePageSlide.state);

  const changeSave = useChangeSaveTour();
  const fetchDataDetail = useTourDetail(id ?? "", source ?? "");
  const handleChangeSaveTour = (id: string) => {
    const oldSave = tourDataDetail?.isSave;
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
              ? t("notification.saveTour")
              : t("notification.unsaveTour"),
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
        <HeaderDetail tourData={tourDataDetail} />
        <div className="flex flex-col lg:flex-row gap-[6%]">
          <div className="w-full lg:w-[60%]">
            <ImageDetail
              onSubmit={handleChangeSaveTour}
              data={tourDataDetail}
            />
            <InfomationTour isTour={true} />
            {statePage === PageState.DESCRIPTION && (
              <DescriptionTour dataTour={tourDataDetail?.tourDescription} />
            )}
            {statePage === PageState.ADDITIONAL_INFOR && (
              <AdditionaInfor data={tourDataDetail?.additionalInfo} />
            )}
            {statePage === PageState.REVIEWS && (
              <ReviewTour
                data={tourDataDetail?.reviews}
                isHotel={false}
                id={id ?? ""}
              />
            )}
          </div>
          <div className="w-full lg:w-[40%]">
            <DetailCardForm isHotel={false} />
          </div>
        </div>
        <RelatedTour source={source ?? ""} currentTourId={id ?? ""} />
      </div>
    </DetailLayout>
  );
};
export default ViewDetail;
