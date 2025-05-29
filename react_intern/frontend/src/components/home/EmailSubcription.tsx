import { useTranslation } from "react-i18next";
import { MdOutlineEmail } from "react-icons/md";

export const EmailSubcription: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex lg:flex-row md:flex-row flex-col items-center justify-center lg:mx-0 md:mx-10 ">
      <div
        data-aos="fade-right"
        className="inline-block w-full lg:text-4xl text-xl font-medium mb-2">
        <p className="lg:w-[65%] md:w-[60%] w-full ml-2 lg:ml-0 md:ml-0">
          {t("homePage.email.content")}
          <span className="text-[#FF7B42]">
            {" "}
            {t("homePage.email.content_2")}
          </span>
        </p>
      </div>

      <div
        data-aos="fade-left"
        className="w-full flex flex-row lg:items-end lg:justify-end justify-center gap-4 ">
        <div className="flex flex-row border-1 border-black dark:border-[#FF7B42]  items-center justify-center gap-4 py-[2%] pl-[15%] lg:pl-7 lg:pr-20">
          <MdOutlineEmail className="lg:text-2xl text-ms text-[#FF7B42]" />
          <input type="text" placeholder="example@gmail.com" />
        </div>
        <button className="bg-black dark:bg-[#FF7B42] dark:text-white cursor-pointer text-white py-[2%] px-6 rounded-sm">
          {t("homePage.email.button")}
        </button>
      </div>
    </div>
  );
};
