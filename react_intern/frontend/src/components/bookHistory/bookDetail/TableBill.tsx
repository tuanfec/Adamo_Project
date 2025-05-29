import React from "react";
import { useTranslation } from "react-i18next";

export const TableBill: React.FC<{
  data: any;
  isHotel: boolean;
}> = ({ data, isHotel }) => {
  const { t } = useTranslation();
  return (
    <table className="w-full border dark:border-[#9999996f] border-[#8888883c] border-collapse text-white ">
      <thead>
        <tr className="dark:bg-[#27272A] bg-[#c1c1c2] border-b dark:border-[#9999996f] border-[#8888883c]">
          <th className="text-left lg:text-lg md:text-md text-sm dark:text-white text-black p-4 border-r dark:border-[#9999996f] border-[#8888883c]">
            {t("booking.product")}
          </th>
          <th className="text-center lg:text-lg md:text-md text-sm dark:text-white text-black p-4 border-r dark:border-[#9999996f] border-[#8888883c]">
            {t("booking.quantity")}
          </th>
          <th className="text-right lg:text-lg md:text-md text-sm dark:text-white text-black p-4">
            {t("booking.price")}
          </th>
        </tr>
      </thead>
      <tbody>
        {isHotel ? (
          data?.selectedRoom?.map((room: any, index: number) => (
            <tr
              key={index}
              className={`dark:bg-[#38383D] bg-[#DEDEDF] border-b dark:border-[#9999996f] border-[#8888883c] 
              }`}>
              <td className="p-4 lg:text-lg md:text-md text-sm border-r dark:text-white text-black dark:border-[#9999996f] border-[#8888883c]">
                {room?.name}
              </td>
              <td className="text-center lg:text-lg md:text-md text-sm dark:text-white text-black border-r dark:border-[#9999996f] border-[#8888883c]">
                {room?.numberSelect}
              </td>
              <td className="text-right p-4 lg:text-lg md:text-md text-sm dark:text-white text-black">
                ${room?.price * room?.numberSelect}
              </td>
            </tr>
          ))
        ) : (
          <tr className="dark:bg-[#38383D] bg-[#DEDEDF] border-b dark:border-[#9999996f] border-[#8888883c]">
            <td className="p-4 border-r lg:text-lg md:text-md text-sm dark:text-white text-black dark:border-[#9999996f] border-[#8888883c]">
              {data?.tourDetail?.title}
            </td>
            <td className="text-center lg:text-lg md:text-md text-sm dark:text-white text-black border-r dark:border-[#9999996f] border-[#8888883c]">
              {data?.totalGuest?.adult} {t("adult")}, {data?.totalGuest?.child}{" "}
              {t("child")}
            </td>
            <td className="text-right p-4 lg:text-lg md:text-md text-sm dark:text-white text-black">
              {data?.tourDetail?.price} đ
            </td>
          </tr>
        )}
        {isHotel && data?.addOn?.breakfast?.numberSelect > 0 && (
          <tr
            className={`dark:bg-[#38383D] bg-[#DEDEDF] border-b dark:border-[#9999996f] border-[#8888883c] 
              }`}>
            <td className="p-4 lg:text-lg md:text-md text-sm border-r dark:text-white text-black dark:border-[#9999996f] border-[#8888883c]">
              {t("addOnSection.breakfast")}
            </td>
            <td className="text-center lg:text-lg md:text-md text-sm dark:text-white text-black border-r dark:border-[#9999996f] border-[#8888883c]">
              {data?.addOn?.breakfast?.numberSelect}
            </td>
            <td className="text-right lg:text-lg md:text-md text-sm p-4 dark:text-white text-black">
              $
              {data?.addOn?.breakfast?.price *
                data?.addOn?.breakfast?.numberSelect}
            </td>
          </tr>
        )}
        {isHotel && data?.addOn?.extraBed?.numberSelect > 0 && (
          <tr
            className={`dark:bg-[#38383D] bg-[#DEDEDF] border-b dark:border-[#9999996f] border-[#8888883c] 
              }`}>
            <td className="p-4 lg:text-lg md:text-md text-sm border-r dark:text-white text-black dark:border-[#9999996f] border-[#8888883c]">
              {t("addOnSection.extraBed")}
            </td>
            <td className="text-center lg:text-lg md:text-md text-sm dark:text-white text-black border-r dark:border-[#9999996f] border-[#8888883c]">
              {data?.addOn?.extraBed?.numberSelect}
            </td>
            <td className="text-right lg:text-lg md:text-md text-sm p-4 dark:text-white text-black">
              $
              {data?.addOn?.extraBed?.price *
                data?.addOn?.extraBed?.numberSelect}
            </td>
          </tr>
        )}

        <tr className="dark:bg-[#27272A] bg-[#c1c1c2] border-b dark:border-[#9999996f] border-[#8888883c]">
          <td
            colSpan={2}
            className="p-4 lg:text-lg md:text-md text-sm font-medium border-r dark:text-white text-black dark:border-[#9999996f] border-[#8888883c]">
            {t("booking.Provisionaltotal")}
          </td>
          <td className="text-right p-4 dark:text-white text-black">
            ${isHotel ? data?.totalPrice : data?.total}
          </td>
        </tr>
        <tr className="dark:bg-[#27272A] bg-[#c1c1c2] border-b dark:border-[#9999996f] border-[#8888883c]">
          <td
            colSpan={2}
            className="p-4 lg:text-lg md:text-md text-sm font-medium border-r dark:text-white text-black dark:border-[#9999996f] border-[#8888883c]">
            {t("booking.voucher")}
          </td>
          <td className="text-right p-4 lg:text-lg md:text-md text-sm dark:text-white text-black">
            {data?.discount ? `${data?.discount}%` : t("booking.novoucher")}
          </td>
        </tr>
        <tr className="dark:bg-[#27272A] bg-[#c1c1c2]">
          <td
            colSpan={2}
            className="p-4 lg:text-lg md:text-md text-sm font-bold border-r dark:text-white text-black dark:border-[#9999996f] border-[#8888883c]">
            {t("booking.Finaltotal")}
          </td>
          <td className="text-right p-4  font-bold dark:text-[#FF7B42] text-[#0447d7cb] text-lg">
            ${data?.finalPrice}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
