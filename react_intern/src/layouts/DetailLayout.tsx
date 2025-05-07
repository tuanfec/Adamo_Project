import { Logo } from "@/components/header/Logo";
import { Navbar } from "@/components/header/Navbar";
import logo from "../assets/logo.jpg";

export const DetailLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center lg:px-10 justify-around">
        <Logo textColor="text-black" src={logo} width={89} height={86} />
        <Navbar textColor="text-black" />
      </div>
      <div className="border-t border-1 border-gray-300"></div>
      <div className="flex lg:px-40 px-4  flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
};
