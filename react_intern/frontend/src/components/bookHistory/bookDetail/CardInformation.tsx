import { BiSolidCircleHalf } from "react-icons/bi";
import { TableProduct } from "./TableProduct";
import { TableUser } from "./TableUser";
import { TableBill } from "./TableBill";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { FaRegUserCircle } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useTranslation } from "react-i18next";

export const CardInformation: React.FC<{ data: any; isHotel: boolean }> = ({
  data,
  isHotel,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex relative flex-col gap-4 dark:bg-[#424246] bg-[#E2E2E3] rounded-2xl p-6 mt-[3px]">
      <BiSolidCircleHalf className="size-6 md:size-7 absolute md:top-[-14px] md:left-[-13px] top-[-14px] left-[-11px] dark:text-[#1E1E1E] text-white" />
      <BiSolidCircleHalf className="size-6 md:size-7 absolute md:top-[-14px] md:right-[-13px] top-[-14px] right-[-11px] rotate-180 dark:text-[#1E1E1E] text-white" />
      <div className="flex items-center gap-2">
        <MdProductionQuantityLimits className="text-[#00277b] dark:text-[#FF7B42] size-5" />
        <p className="font-medium lg:text-lg md:text-md text-sm text-[#00277b] dark:text-[#FF7B42]">
          {t("booking.product")}: {data?.id}
        </p>
      </div>
      <TableProduct data={data} />
      <div className="flex items-center gap-2">
        <FaRegUserCircle className="text-[#00277b] dark:text-[#FF7B42] size-5" />
        <p className="font-medium lg:text-lg md:text-md text-sm text-[#00277b] dark:text-[#FF7B42]">
          {t("booking.userInfor")}
        </p>
      </div>
      <TableUser data={data} />
      <div className="flex items-center gap-2">
        <HiClipboardDocumentList className="text-[#00277b] dark:text-[#FF7B42] size-5" />
        <p className="font-medium lg:text-lg md:text-md text-sm text-[#00277b] dark:text-[#FF7B42]">
          {t("booking.orderinformation")}
        </p>
      </div>
      <TableBill data={data} isHotel={isHotel} />
    </div>
  );
};
