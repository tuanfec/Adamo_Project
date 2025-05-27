import { useLocation } from "react-router-dom";
import { CardImgDetail } from "./CardImgDetail";
import { CardInformation } from "./CardInformation";

export const BookHistoryDetail: React.FC = () => {
  const { state } = useLocation();
  const data = state?.data;
  const isHotel = state?.data?.hotelData ? true : false;

  return (
    <div className="my-10 lg:mx-30 md:mx-20 mx-2 relative">
      <CardImgDetail isHotel={isHotel} data={data} />
      <CardInformation isHotel={isHotel} data={data} />
    </div>
  );
};
