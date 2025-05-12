import { Logo } from "@/components/header/Logo";
import { Navbar } from "@/components/header/Navbar";
import logo from "../assets/logo.jpg";
import { SearchForm } from "@/components/form/SearchForm";
import { FooterMain } from "@/components/footer/FooterMain";
import { Banner } from "@/components/header/Banner";
import { Featured } from "@/components/common/Featured";
import { MapSection } from "@/components/tourDetail/DescriptionTour/components/MapSection";
export const CommonLayout: React.FC<{
  children: React.ReactNode;
  title: string;
  content: string;
  isDisplaySearchTour: boolean;
  isDisplayFeatured: boolean;
  img: string;
  isHeader: boolean;
  isTour: boolean;
  isShow: boolean;
  isContact?: boolean;
}> = ({
  children,
  title,
  content,
  isDisplaySearchTour,
  isDisplayFeatured,
  img,
  isHeader,
  isTour,
  isShow,
  isContact = false,
}) => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Banner image={img} height="666px">
        {/* Header Section */}
        <div className="flex items-center justify-evenly">
          <Logo src={logo} width={89} height={86} />
          <Navbar />
        </div>

        {/* Mobile-first Grid Layout */}
        <div className="grid grid-cols-1 lg:bottom-0  lg:px-0 md:px-0  mt-8 lg:grid-cols-5 lg:grid-rows-5 lg:gap-0">
          {/* Welcome Section */}
          <div className="lg:col-span-2 lg:row-span-3 lg:ml-30 lg:row-start-2 order-1 pb-6 md:pb-6 md:px-auto lg:pb-0">
            <div className="flex flex-col gap-4 lg:pl-10">
              <p className="text-[#FFF2CF] font-medium text-center lg:text-left">
                {content}
              </p>
              <p
                className={`text-3xl lg:text-5xl font-medium text-white text-center lg:text-left ${
                  isContact ? "mt-20" : "mt-0"
                }`}>
                {title}
              </p>
            </div>
          </div>

          {isDisplaySearchTour && (
            <div className=" lg:col-span-2 lg:row-span-5 lg:col-start-4 lg:row-start-2 order-2">
              <SearchForm isHeader={isHeader} isTour={isTour} />
            </div>
          )}

          {isShow &&
            (isDisplayFeatured ? (
              <div className="w-full lg:col-span-3 lg:row-start-6 order-3">
                <Featured />
              </div>
            ) : (
              <div className="w-full hidden lg:block lg:col-span-3 lg:row-start-6 order-3">
                <div className=" bg-white min-h-[99px]  md:px-5 md:py-1 lg:px-20 lg:py-6 "></div>
              </div>
            ))}
        </div>
      </Banner>

      {/* Main Content */}
      <main className="flex-1 relative z-0">
        <div className="container mx-auto lg:px-35 md:px-10 px-4">
          {children}
        </div>
      </main>
      {isContact && (
        <MapSection
          isContact={isContact}
          location={{
            locationName: "NgaoDuVietNam",
            coordinates: {
              lat: 10.8231,
              lng: 106.6297,
            },
          }}
        />
      )}
      <FooterMain />
    </div>
  );
};
