import { BiSolidQuoteAltLeft } from "react-icons/bi";
import image1 from "@/assets/img1.jpg";
import image2 from "@/assets/img2.jpg";
import { useTranslation } from "react-i18next";
export const Content: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex lg:flex-row lg:min-h-[623px] flex-col my-10">
      <div className="flex flex-col w-full relative min-h-[350px] mb-10">
        <img
          data-aos="fade-right"
          data-aos-duration="1000"
          className="lg:max-w-[445px] lg:min-h-[541px] h-[300px] md:max-w-[80%] "
          src={image1}
          alt="image"
        />
        <img
          data-aos="fade-left"
          data-aos-duration="1000"
          className="absolute bottom-0 lg:right-10 right-0 lg:max-w-[347px] lg:min-h-[347px] md:max-w-[347px] max-w-[200px] min-h-[200px]"
          src={image2}
          alt="image"
        />
      </div>
      <div
        data-aos="fade-up-left"
        data-aos-duration="1000"
        className="flex flex-col gap-14 lg:w-[80%] ">
        <div className="text-4xl md:text-3xl font-medium ">
          {t("aboutPage.content_1.title_1")}{" "}
          <span className="text-[#FF7B42] ">NgaoduVietnam</span>
          {t("aboutPage.content_1.title_2")}{" "}
        </div>
        <div className="flex flex-row gap-4 ">
          <BiSolidQuoteAltLeft className="text-8xl pb-[10%] text-[#FF7B42] " />
          <div className="dark:text-[#f4f3f3]">
            <p>{t("aboutPage.content.description_1")}</p>
            <br />
            <p>{t("aboutPage.content.description_2")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
