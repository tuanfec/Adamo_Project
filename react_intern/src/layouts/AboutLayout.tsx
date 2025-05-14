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
    <div className="min-h-screen flex flex-col">
      <Banner image={banner} height="400px">
        <div className="flex items-center justify-evenly">
          <Logo src={logo} width={89} height={86} />
          <Navbar />
        </div>
        <div className="flex items-center justify-center my-18 text-5xl font-medium text-white">
          About us
        </div>
      </Banner>
      <main className="container mx-auto lg:px-35 px-4 dark:bg-[#1e1e1e] dark:text-[#ffffff]">
        {children}
      </main>
      <FooterMain />
    </div>
  );
};
