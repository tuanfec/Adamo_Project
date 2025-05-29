import { CustomDropdown } from "../form/CustomDropdown";
import { LuCalendarClock } from "react-icons/lu";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { Room } from "@/types/hotel";
import { useTranslation } from "react-i18next";
import { useGetVoucher } from "@/hooks/useComon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useMemo, useState } from "react";
import { useNotification } from "../notifiction/NotificationProvider";
import { useDispatch } from "react-redux";
import { setVoucher } from "@/app/slide/checkOutSlide";
import { Voucher } from "@/types/tour";
const zodSchema = z.object({
  adult: z.number().min(1, "Adult is required"),
  child: z.number().min(0, "Child is required"),
});
type FormValues = z.infer<typeof zodSchema>;

type TourSummaryProps = {
  onChange?: (data: {
    discount: number;
    selectedVoucher: string | null;
    finalPrice: number;
    tourDetail: any;
    total: number;
    totalGuest: any;
    selectedRoom: any;
    addOn: any;
    hotelData: any;
    totalPrice: number;
  }) => void;
};

const TourSummary: React.FC<TourSummaryProps> = ({ onChange }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const notification = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(zodSchema) });

  const [selectedVoucher, setSelectedVoucher] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const { tourDetail, total, totalGuest } = useLocation().state;
  const { selectedRoom, addOn, hotelData, totalPrice } = useLocation().state;

  const { data: voucherData } = useGetVoucher();

  useEffect(() => {
    if (selectedVoucher) {
      const voucherSelect = voucherData?.find(
        (voucher: Voucher) => voucher.id === selectedVoucher
      );
      dispatch(setVoucher(voucherSelect));
    }
  }, [dispatch, selectedVoucher]);

  const finalPrice = useMemo(() => {
    if (tourDetail) {
      return total - (total * discount) / 100;
    } else {
      return totalPrice - (totalPrice * discount) / 100;
    }
  }, [totalPrice, discount, total]);

  const noti = () => {
    notification.success({
      message: t("discountNoti"),
    });
  };

  useEffect(() => {
    if (onChange) {
      onChange({
        discount,
        selectedVoucher,
        finalPrice,
        tourDetail,
        total,
        totalGuest,
        selectedRoom,
        addOn,
        hotelData,
        totalPrice,
      });
    }
  }, [finalPrice]);

  return (
    <div className="w-full h-full ">
      <div className="w-full bg-[#F4F4F4] dark:bg-[#7a7a7a9d] backdrop-blur-md ">
        <div className="flex flex-col gap-4 pt-8 pb-3 px-7">
          <div className="flex flex-col gap-2 ">
            <h2 className="text-xl font-medium dark:text-white">
              {tourDetail?.title || hotelData?.title}
            </h2>
            <div className="flex items-center gap-2">
              <CiLocationOn className="text-xl text-[#FF7B42]" />
              <span className="text-sm text-[#636567] dark:text-[#bbbbbb]">
                {tourDetail?.location || hotelData?.location}
              </span>
            </div>
          </div>

          {tourDetail && (
            <div className="flex items-center gap-[30%]">
              <div className="flex flex-col">
                <p className="text-gray-600 text-sm dark:text-[#bbbbbb]">
                  {t("checkOut.duration")}
                </p>
                <span className="font-medium dark:text-white">
                  {tourDetail?.duration}
                </span>
              </div>
              <div className="flex flex-col">
                <p className="text-gray-600 text-sm dark:text-[#bbbbbb]">
                  {t("checkOut.type")}
                </p>
                <span className="font-medium dark:text-white">
                  {tourDetail?.type}
                </span>
              </div>
            </div>
          )}

          <div className="flex flex-col ">
            <div className="flex flex-col gap-6 py-5">
              <CustomDropdown<FormValues>
                icon={<LuCalendarClock className="text-xl text-[#FF7B42]" />}
                isSelect={false}
                isDuration={true}
                tourDetail={tourDetail}
                hotelData={hotelData}
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
              />

              <CustomDropdown<FormValues>
                isTotalGuest={true}
                totalGuest={totalGuest}
                placeholder={t("checkOut.numberOfGuests")}
                icon={<FiUsers className="text-xl text-[#FF7B42]" />}
                isSelect={false}
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
              />

              <div className="flex relative w-full justify-between items-center gap-4">
                <Select onValueChange={(id) => setSelectedVoucher(id)}>
                  <SelectTrigger className="py-6 w-1/2 dark:text-white text-black rounded-none border border-[#bbbbbb]">
                    <SelectValue placeholder={t("checkOut.promoCode")} />
                  </SelectTrigger>
                  <SelectContent>
                    {voucherData?.map(
                      (voucher: any, index: number) =>
                        voucher?.remaining > 0 && (
                          <SelectItem
                            className="dark:text-[#FF7B42]"
                            key={index}
                            value={voucher.id.toString()}>
                            {t("discount")} {voucher.discount} %
                          </SelectItem>
                        )
                    )}
                  </SelectContent>
                </Select>
                <button
                  type="button"
                  onClick={() => {
                    const selected = voucherData?.find(
                      (v: any) => v.id.toString() === selectedVoucher
                    );
                    setDiscount(selected ? selected.discount : 0);
                    noti();
                  }}
                  className="border w-1/3 border-[#FF7B42] text-[#FF7B42] cursor-pointer hover:bg-[#FF7B42] hover:text-white font-medium text-lg h-[49px] px-4">
                  {t("checkOut.apply")}
                </button>
              </div>
            </div>
            {hotelData && (
              <div className="flex flex-col gap-4">
                {selectedRoom.map((item: Room, index: number) => {
                  return (
                    <div key={index} className="flex justify-between">
                      <div className="flex gap-2 items-center">
                        <p className="text-md font-medium text-[#FF7B42]">
                          {item?.numberSelect}x
                        </p>
                        <span className="font-bold text-md dark:text-[#bbbbbb]">
                          {item?.name}
                        </span>
                      </div>
                      <span className="font-bold text-lg dark:text-white">
                        ${item?.price}
                      </span>
                    </div>
                  );
                })}
                <div>
                  <p className="text-lg font-medium text-[#888888] dark:text-white">
                    {t("addOnSection.addOns")}
                  </p>
                  <div className="flex flex-col gap-2 mt-2">
                    {addOn && (
                      <div>
                        {addOn?.breakfast.numberSelect > 0 && (
                          <div className="flex justify-between">
                            <div className="flex gap-2">
                              <p className="text-md font-medium text-[#FF7B42]">
                                {addOn?.breakfast.numberSelect}x
                              </p>
                              <span className="font-bold text-md dark:text-[#bbbbbb]">
                                {t("addOnSection.breakfast")}
                              </span>
                            </div>

                            <span className="font-bold text-lg dark:text-white">
                              ${addOn?.breakfast.price}
                            </span>
                          </div>
                        )}
                        {addOn?.extraBed.numberSelect > 0 && (
                          <div className="flex justify-between">
                            <div className="flex gap-2">
                              <p className="text-md font-medium text-[#FF7B42]">
                                {addOn?.extraBed.numberSelect}x
                              </p>
                              <span className="font-bold text-md dark:text-[#bbbbbb]">
                                {t("addOnSection.extraBed")}
                              </span>
                            </div>

                            <span className="font-bold text-lg dark:text-white">
                              ${addOn?.extraBed.price}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex bg-black items-center justify-between lg:py-8 py-6 text-white px-7 mb-10">
        <p className="text-xl font-normal">{t("checkOut.total")}: </p>{" "}
        <div className="flex flex-col">
          {tourDetail ? (
            <p
              className={`font-bold text-xl ${discount ? "line-through" : ""} ${discount ? "text-[#bbbbbb]" : ""}`}>
              ${total || tourDetail?.price}
            </p>
          ) : (
            <p
              className={`font-bold text-xl ${discount ? "line-through" : ""}  ${discount ? "text-[#bbbbbb]" : ""}`}>
              ${totalPrice}
            </p>
          )}
          {discount > 0 && <p className="font-bold text-xl ">${finalPrice}</p>}
        </div>
      </div>
    </div>
  );
};

export default TourSummary;
