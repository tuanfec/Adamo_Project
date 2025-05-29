import { AboutLayout } from "@/layouts/AboutLayout";
import { Content } from "@/components/home/Content";
import img3 from "@/assets/img3.png";
import img4 from "@/assets/img4.png";
import img5 from "@/assets/img5.png";
import img6 from "@/assets/img6.png";
import { FloatButton } from "antd";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { useTranslation } from "react-i18next";
const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <AboutLayout>
      <Breadcrumb />
      <Content />
      {/* Content_2 */}
      <div className="flex  md:flex-row lg:flex-row lg:max-h-full my-10 relative flex-col-reverse">
        <div
          data-aos="fade-down-right"
          className="flex flex-col px-3 md:px-2 lg:px-2 gap-4 w-full lg:w-[80%] lg:gap-10 dark:text-[#f4f3f3]">
          <p className="lg:text-4xl md:text-3xl text-2xl font-medium mt-10">
            {t("aboutPage.content_1.title_1")}{" "}
            <span className="text-[#FF7B42]">NgaoduVietnam</span>
            {t("aboutPage.content_1.title_2")}{" "}
          </p>
          <div className="md:mr-5">
            <p>{t("aboutPage.content_1.description_1")}</p>
            <p>{t("aboutPage.content_1.description_2")}</p>
          </div>
        </div>
        <div className="w-full">
          <img
            data-aos="fade-left"
            className="h-full lg:max-h-[539px] lg:min-w-[540px] float-end"
            src={img3}
            alt="image"
          />
        </div>
      </div>

      {/* Content_3 */}
      <div className="flex flex-col lg:max-h-full my-10 lg:my-20 relative lg:gap-15 gap-10 ">
        <img
          data-aos="fade-up"
          data-aos-duration="1000"
          className="w-full aspect-[16/6] object-cover"
          src={img4}
          alt="image"
        />
        <div
          data-aos="fade-down"
          data-aos-duration="1000"
          className="flex flex-col gap-10">
          <p className="text-4xl md:text-4xl w-[100%] md:w-[90%] lg:w-[50%] font-medium">
            {t("aboutPage.content_2.title")}{" "}
          </p>
          <div className="flex flex-col lg:flex-row lg:gap-20 gap-10 dark:text-[#f4f3f3]">
            <p className="lg:w-[50%] ">
              {t("aboutPage.content_2.description_1")}{" "}
            </p>
            <p className="lg:w-[50%]">
              {t("aboutPage.content_2.description_2")}{" "}
            </p>
          </div>
        </div>
      </div>

      {/* Content_4 */}
      <div className="flex min-h-fit lg:h-[620px]  flex-col md:flex-row lg:flex-row lg:gap-17 gap-10 my-10">
        <div className="lg:w-[100%]">
          <img
            data-aos="fade-right"
            className="md:h-full w-full min-h-full lg:min-w-[445px] md:min-w-[445px]"
            src={img5}
            alt="image"
          />
        </div>
        <div
          data-aos="fade-left"
          className="flex flex-col justify-between  lg:w-[100%] h-full lg:gap-10 md:gap-18 gap-5 dark:text-[#f4f3f3]">
          <p>{t("aboutPage.content_2.description_3")} </p>
          <img
            className="lg:aspect-[3/2] md:aspect-[8/9]"
            src={img6}
            alt="image"
          />
        </div>
      </div>
      <FloatButton.BackTop visibilityHeight={200} />
    </AboutLayout>
  );
};

export default AboutPage;
