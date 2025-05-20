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
import { Loading } from "@/components/common/Loading";
import { useQueryClient } from "@tanstack/react-query";

const ViewDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { source } = useParams();
  const isAttractive = source === "attractive";
  const { data: tourDataDetail } = useTourDetail(id ?? "", isAttractive);
  const dispatch = useDispatch();
  console.log("tourDataDetail", tourDataDetail);

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(setStatePage(PageState.DESCRIPTION));
    // Update tour detail in redux when data changes
    if (tourDataDetail) {
      dispatch(setTourDetail(tourDataDetail));
    }
  }, [id, tourDataDetail, dispatch]);

  const statePage = useSelector((state: any) => state.statePageSlide.state);

  const changeSave = useChangeSaveTour();
  const fetchDataDetail = useTourDetail(id ?? "", isAttractive);
  const handleChangeSaveTour = (id: string) => {
    changeSave.mutate(
      {
        id,
        isSave: !tourDataDetail?.isSave,
        isAttractive: isAttractive,
      },
      {
        onSuccess: () => {
          fetchDataDetail.refetch();
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
