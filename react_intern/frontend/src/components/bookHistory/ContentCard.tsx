import { MdAccessTime } from "react-icons/md";
import { TiMediaFastForward } from "react-icons/ti";
import { FaLocationDot } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { TagComponet } from "./Tag";

export const ContentCard: React.FC<{ data: any; isHotel: boolean }> = ({
  data,
  isHotel,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2">
      <p className="font-bold text-sm md:text-lg lg:text-xl lg:mb-2 dark:text-white">
        {isHotel ? data?.hotelData?.title : data?.tourDetail?.title}
      </p>

      <div className="flex gap-2 items-center ">
        <FaLocationDot className="lg:size-5 md:size-5 text-[#a34d28] dark:text-[#bbbbbb]" />
        <p className="dark:text-[#bbbbbb]">
          {isHotel ? data?.hotelData?.location : data?.tourDetail?.location}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 items-center ">
        <MdAccessTime className="lg:size-5 md:size-5 text-[#a34d28] dark:text-[#bbbbbb]" />
        <p className="italic dark:text-[#bbbbbb]">
          {isHotel ? data?.hotelData?.startDate : data?.tourDetail?.startDate}
        </p>
        <TiMediaFastForward className="dark:text-[#bbbbbb]" />
        <p className="italic dark:text-[#bbbbbb]">
          {isHotel ? data?.hotelData?.endDate : data?.tourDetail?.endDate}
        </p>
      </div>

      <div className="flex gap-2 items-center dark:text-[#bbbbbb]">
        <MdPeopleAlt className="lg:size-5 md:size-5 text-[#a34d28] dark:text-[#bbbbbb]" />
        <p>
          {t("adult")}: {data?.totalGuest?.adult}
        </p>
        <p>
          {t("child")}: {data?.totalGuest?.child}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 items-center lg:mt-2">
        {data?.hotelData?.rooms.map((room: any, index: string) => (
          <TagComponet key={index} data={room} />
        ))}
      </div>
    </div>
  );
};
