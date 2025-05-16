import { IoHomeOutline, IoCallOutline, IoMailOutline } from "react-icons/io5";
import img from "@/assets/img1.jpg";
import { useTranslation } from "react-i18next";
export const ImageContent = () => {
  const { t } = useTranslation();
  return (
    <div
      style={{ backgroundImage: `url(${img})` }}
      className="relative z-0 w-full lg:min-h-[600px] min-h-[450px]">
      <div className="flex flex-col text-white gap-4 absolute bottom-0 left-0 w-[85%] bg-black z-10 p-4">
        <p className="text-white text-3xl font-medium">{t("contact.office")}</p>
        <div className="flex items-center gap-2">
          <div className="bg-[#FF7B42] rounded-full p-2 size-10 flex items-center justify-center">
            <IoHomeOutline />
          </div>
          <div className="flex flex-col ">
            <div>{t("contact.address")}</div>
            <div>27 Old Gloucester Street, London, WC1N 3AX</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-[#FF7B42] rounded-full p-2 size-10 flex items-center justify-center">
            <IoCallOutline />
          </div>
          <div className="flex flex-col ">
            <div>{t("contact.phone")}</div>
            <div>+44 (0)20 7946 0946</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-[#FF7B42] rounded-full p-2 size-10 flex items-center justify-center">
            <IoMailOutline />
          </div>
          <div className="flex flex-col ">
            <div>{t("contact.email")}</div>
            <div>info@example.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};
