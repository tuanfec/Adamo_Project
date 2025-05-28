import { useLocation, useParams } from "react-router-dom";
import { CardImgDetail } from "./CardImgDetail";
import { CardInformation } from "./CardInformation";
import { useGetBookHistoryDetail } from "@/hooks/useComon";

export const BookHistoryDetail: React.FC = () => {
  const { state } = useLocation();
  const param = useParams();

  const { data: BookedDataDetail } = useGetBookHistoryDetail(param.id);

  const data = state?.data;
  const isHotel = !!(state?.data?.hotelData || BookedDataDetail?.hotelData);
  const isData: boolean = data === undefined;

  return (
    <div className="my-10 lg:mx-30 md:mx-20 mx-2 relative">
      <CardImgDetail
        isHotel={isHotel}
        data={isData ? BookedDataDetail : data}
      />
      <CardInformation
        isHotel={isHotel}
        data={isData ? BookedDataDetail : data}
      />
    </div>
  );
};
