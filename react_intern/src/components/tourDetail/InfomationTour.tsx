import { useDispatch, useSelector } from "react-redux";
import { PageState, setStatePage } from "@/app/slide/statePageSlide";

export const InfomationTour: React.FC<{ isTour: boolean }> = ({ isTour }) => {
  const tourDetail = useSelector(
    (state: any) => state.tourDataSlide.tourDetail
  );
  const hotelDetail = useSelector(
    (state: any) => state.hotelDataSlide.hotelDetail
  );
  const statePage = useSelector((state: any) => state.statePageSlide.state);
  const dispatch = useDispatch();

  const getTextColor = (page: string) => {
    return statePage === page
      ? "text-[#FF7B42]"
      : "text-gray-600 dark:text-white";
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        {!isTour && (
          <div
            onClick={() => dispatch(setStatePage(PageState.SELECT_ROOM))}
            className={`font-medium text-xl lg:text-2xl cursor-pointer ${getTextColor(PageState.SELECT_ROOM)}`}>
            Select room{" "}
          </div>
        )}
        <div
          onClick={() => dispatch(setStatePage(PageState.DESCRIPTION))}
          className={`font-medium text-xl lg:text-2xl cursor-pointer ${getTextColor(PageState.DESCRIPTION)}`}>
          Descriptions
        </div>
        {isTour && (
          <div
            onClick={() => dispatch(setStatePage(PageState.ADDITIONAL_INFOR))}
            className={`font-medium text-xl lg:text-2xl cursor-pointer ${getTextColor(PageState.ADDITIONAL_INFOR)}`}>
            Additional Infor
          </div>
        )}
        <div
          onClick={() => dispatch(setStatePage(PageState.REVIEWS))}
          className={`font-medium text-xl lg:text-2xl cursor-pointer ${getTextColor(PageState.REVIEWS)}`}>
          Reviews (
          {isTour
            ? tourDetail?.reviews?.totalReviews
            : hotelDetail?.reviews?.totalReviews}
          )
        </div>
      </div>
      <div className="border-b border-gray-400 dark:border-gray-600 mt-5"></div>
    </div>
  );
};
