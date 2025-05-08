import { Logo } from "@/components/header/Logo";
import { Navbar } from "@/components/header/Navbar";
import logo from "../assets/logo.jpg";
import { Banner } from "@/components/header/Banner";
import { SearchTour } from "@/components/form/SearchTour";
import { Featured } from "@/components/common/Featured";
import { FooterMain } from "@/components/footer/FooterMain";

export const HomeLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Banner height="776px">
        {/* Header Section */}
        <div className="flex items-center justify-evenly">
          <Logo src={logo} width={89} height={86} />
          <Navbar />
        </div>

        {/* Mobile-first Grid Layout */}
        <div className="grid grid-cols-1 lg:bottom-0  lg:px-0 md:px-0  mt-8 lg:mt-0 lg:grid-cols-5 lg:grid-rows-5 lg:gap-0">
          {/* Welcome Section */}
          <div className="lg:col-span-2 lg:row-span-3 lg:ml-30 lg:row-start-2 order-1 pb-6 md:pb-6 md:px-auto lg:pb-0">
            <div className="flex flex-col gap-4 lg:pl-10">
              <p className="text-[#FFF2CF] font-medium text-center lg:text-left">
                Welcome to NgaoduVietnam
              </p>
              <p className="text-3xl lg:text-5xl font-medium text-white text-center lg:text-left">
                Perfect place for your stories
              </p>
            </div>
          </div>

          {/* Search Tour Section */}
          <div className=" lg:col-span-2 lg:row-span-5 lg:col-start-4 lg:row-start-2 order-2">
            <SearchTour isHeader={true} isTour={true} />
          </div>

          {/* Featured Section */}
          <div className="w-full lg:col-span-3 lg:row-start-6 order-3">
            <Featured />
          </div>
        </div>
      </Banner>

      {/* Main Content */}
      <main className="flex-1 relative z-0">
        <div className="container mx-auto lg:px-35 px-4">{children}</div>
      </main>

      <FooterMain />
    </div>
  );
};
