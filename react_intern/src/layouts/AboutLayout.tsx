import { Logo } from "@/components/header/Logo";
import { Navbar } from "@/components/header/Navbar";
import logo from "../assets/logo.jpg";
import { Banner } from "@/components/header/Banner";
import { FooterMain } from "@/components/footer/FooterMain";
import banner from "@/assets/banner_img.jpg";
export const AboutLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Banner image={banner} height="400px">
        <div className="flex items-center justify-evenly">
          <Logo src={logo} width={89} height={86} />
          <Navbar />
        </div>
        <div className="flex items-center justify-center my-18 text-5xl font-medium text-white">
          About us
        </div>
      </Banner>
      <main className="flex-1 relative z-0 dark:bg-[#1e1e1e] dark:text-[#ffffff]">
        <div className="container mx-auto lg:px-35 md:px-10 px-4">
          {children}
        </div>
      </main>
      <FooterMain />
    </div>
  );
};
