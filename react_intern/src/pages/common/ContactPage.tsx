import { CommonLayout } from "@/layouts/CommonLayout";
import banner from "@/assets/contact.png";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ContactForm } from "@/components/form/contact/ContactForm";
import { ImageContent } from "@/components/contact/ImageContent";
import { Capcha } from "@/components/form/contact/Capcha";
export const ContactPage = () => {
  return (
    <CommonLayout
      title="Contact Us"
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
          <div className="w-full lg:w-1/2">
            <ContactForm />
            <Capcha />
          </div>
          <div className="w-full lg:w-1/2">
            <ImageContent />
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};
