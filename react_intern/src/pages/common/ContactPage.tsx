import { CommonLayout } from "@/layouts/CommonLayout";
import banner from "@/assets/contact.jpg";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ContactForm } from "@/components/form/contact/ContactForm";
import { ImageContent } from "@/components/contact/ImageContent";
import { useTranslation } from "react-i18next";
const ContactPage = () => {
  const { t } = useTranslation();
  return (
    <CommonLayout
      title={t("banner.contactPage.title")}
      content=""
      isDisplaySearchTour={false}
      isDisplayFeatured={false}
      img={banner}
      isHeader={false}
      isTour={false}
      isShow={false}
      isContact={true}>
      <div className="py-8">
        <Breadcrumb />

        <div className="flex flex-col lg:flex-row gap-20 my-20">
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            className="w-full lg:w-1/2">
            <ContactForm />
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="1000"
            className="w-full lg:w-1/2">
            <ImageContent />
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};
export default ContactPage;
