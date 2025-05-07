import { useDispatch, useSelector } from "react-redux";
import { PageState, setStatePage } from "@/app/slide/statePageSlide";

export const InfomationTour: React.FC = ({}) => {
  const tourDetail = useSelector(
    (state: any) => state.tourDataSlide.tourDetail
  );
  const statePage = useSelector((state: any) => state.statePageSlide.state);
  const dispatch = useDispatch();

  const getTextColor = (page: string) => {
    return statePage === page ? "text-[#FF7B42]" : "text-gray-600";
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <div
          onClick={() => dispatch(setStatePage(PageState.DESCRIPTION))}
          className={`font-medium text-2xl ${getTextColor(PageState.DESCRIPTION)}`}>
          Descriptions
        </div>
        <div
          onClick={() => dispatch(setStatePage(PageState.ADDITIONAL_INFOR))}
          className={`font-medium text-2xl ${getTextColor(PageState.ADDITIONAL_INFOR)}`}>
          Additional Infor
        </div>
        <div
          onClick={() => dispatch(setStatePage(PageState.REVIEWS))}
          className={`font-medium text-2xl ${getTextColor(PageState.REVIEWS)}`}>
          Reviews ({tourDetail?.reviews?.totalReviews})
        </div>
      </div>
      <div className="border-b border-gray-400 mt-5"></div>
    </div>
  );
};
