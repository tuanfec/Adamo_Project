import { Room } from "@/types/hotel";
import { useTranslation } from "react-i18next";
import { TiMediaFastForward } from "react-icons/ti";

export const CardImgDetail: React.FC<{ data: any; isHotel: boolean }> = ({
  data,
  isHotel,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4 dark:bg-[#424246] bg-[#E2E2E3] rounded-2xl p-6">
      <p className="lg:text-2xl md:text-xl font-medium">
        {isHotel ? data?.hotelData?.title : data?.tourDetail?.title}
      </p>
      <img
        src={isHotel ? data?.hotelData?.image[0] : data?.tourDetail?.image[0]}
        alt={data?.name}
        className="object-cover aspect-[2/1] rounded-sm mb-5"
      />
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div className="flex flex-col gap-5">
          {isHotel ? (
            <div className="flex flex-col ">
              <p>{t("booking.SelectedRoom")}</p>
              {data?.selectedRoom?.map((room: Room, index: number) => (
                <p
                  className="font-medium lg:text-lg md:text-md text-sm dark:text-[#FF7B42] text-[#00277b] "
                  key={index}>
                  {room?.name} - x{room?.numberSelect}
                </p>
              ))}
            </div>
          ) : (
            <div>
              <p>{t("booking.Type")}</p>
              <p className="font-medium lg:text-lg md:text-md text-sm dark:text-[#FF7B42] text-[#00277b]">
                {data?.tourDetail?.type}
              </p>
            </div>
          )}
          <div>
            <p>{t("booking.Time")}</p>
            <div className="flex items-center gap-3 font-medium lg:text-lg md:text-md text-sm dark:text-[#FF7B42] text-[#00277b]">
              {isHotel
                ? data?.hotelData?.startDate
                : data?.tourDetail?.startDate}{" "}
              <TiMediaFastForward />{" "}
              {isHotel ? data?.hotelData?.endDate : data?.tourDetail?.endDate}
            </div>
          </div>
        </div>
        {isHotel && (
          <div className="flex flex-col md:items-end gap-1">
            <p className="mt-5">{t("booking.HotelRules")}</p>
            <p className="font-medium lg:text-lg md:text-md text-sm dark:text-[#FF7B42] text-[#00277b]">
              {t("booking.Checkin")}:{" "}
              {data?.hotelData?.tourDescription?.rules?.time?.checkIn}
            </p>
            <p className="font-medium lg:text-lg md:text-md text-sm dark:text-[#FF7B42] text-[#00277b]">
              {t("booking.Checkout")}:{" "}
              {data?.hotelData?.tourDescription?.rules?.time?.checkOut}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
