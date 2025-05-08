import { Logo } from "../header/Logo";
import logo from "@/assets/logo.jpg";
export const Loading: React.FC = () => {
  return (
    <div className="flex relative items-center bg-white justify-center h-screen">
      <div className="animate-bounce">
        <Logo src={logo} width={200} height={200} textColor="text-black" />
      </div>
    </div>
  );
};
