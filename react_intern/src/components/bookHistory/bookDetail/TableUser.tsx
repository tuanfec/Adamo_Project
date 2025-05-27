import { useTranslation } from "react-i18next";

export const TableUser: React.FC<{
  data: any;
}> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <table className="w-full mb-8 border dark:border-[#9999996f] border-[#8888883c] border-collapse text-white ">
      <tbody>
        <tr className=" border-b dark:border-[#9999996f] border-[#8888883c]">
          <td className="p-4 lg:text-lg md:text-md text-sm dark:bg-[#27272A] bg-[#c1c1c2] font-medium border-r dark:text-white text-black dark:border-[#9999996f] border-[#8888883c]">
            {t("booking.Name")}
          </td>
          <td className="p-4 lg:text-lg md:text-md text-sm  border-r dark:text-white text-black dark:border-[#9999996f] border-[#8888883c]">
            {data?.lastName} {data?.firstName}
          </td>
        </tr>

        <tr className=" border-b dark:border-[#9999996f] border-[#8888883c]">
          <td className="p-4 lg:text-lg md:text-md text-sm dark:bg-[#27272A] bg-[#c1c1c2] font-medium border-r dark:text-white text-black dark:border-[#9999996f] border-[#8888883c]">
            {t("booking.email")}
          </td>
          <td className="p-4 lg:text-lg md:text-md text-sm  border-r dark:text-white text-black dark:border-[#9999996f] border-[#8888883c]">
            {data?.email}
          </td>
        </tr>

        <tr className=" border-b dark:border-[#9999996f] border-[#8888883c]">
          <td className="p-4 lg:text-lg md:text-md text-sm dark:bg-[#27272A] bg-[#c1c1c2] font-medium border-r dark:text-white text-black dark:border-[#9999996f] border-[#8888883c]">
            {t("booking.phone")}
          </td>
          <td className="p-4 lg:text-lg md:text-md text-sm  border-r dark:text-white text-black dark:border-[#9999996f] border-[#8888883c]">
            {data?.phone}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
