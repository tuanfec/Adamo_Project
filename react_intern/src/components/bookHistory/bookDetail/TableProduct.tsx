import { useTranslation } from "react-i18next";

export const TableProduct: React.FC<{
  data: any;
}> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <table className="w-full mb-8 border dark:border-[#9999996f] border-[#8888883c] border-collapse text-white ">
      <thead>
        <tr className="dark:bg-[#27272A] bg-[#c1c1c2] border-b dark:border-[#9999996f] border-[#8888883c]">
          <th className="text-left dark:text-white text-black p-4 lg:text-lg md:text-md text-sm border-r dark:border-[#9999996f] border-[#8888883c]">
            {t("booking.createAt")}
          </th>
          <th className="text-left dark:text-white text-black p-4 lg:text-lg md:text-md text-sm border-r dark:border-[#9999996f] border-[#8888883c]">
            {t("booking.paymentMethod")}
          </th>
          <th className="text-left dark:text-white text-black p-4 lg:text-lg md:text-md text-sm">
            {" "}
            {t("booking.Status")}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className=" border-b dark:border-[#9999996f] border-[#8888883c]">
          <td className="p-4 lg:text-lg md:text-md text-sm border-r dark:text-white text-black dark:border-[#9999996f] border-[#8888883c]">
            <>
              {new Date(data?.createAt).toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
              <br />
              {new Date(data?.createAt).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </>
          </td>
          <td className="p-4 lg:text-lg md:text-md text-sm  border-r dark:text-white text-black dark:border-[#9999996f] border-[#8888883c]">
            {data?.paymentMethod === "paypal" ? "Paypal" : "Credit Card"}
          </td>
          <td className="p-4 lg:text-lg md:text-md text-sm  border-r dark:text-white text-black dark:border-[#9999996f] border-[#8888883c]">
            {t("booking.successful")}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
