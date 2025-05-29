import logo from "../../assets/logo.jpg";
import { Logo } from "../header/Logo";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export const FooterLogo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Logo src={logo} width={89} height={86} />
      <div className="flex flex-row items-center justify-center gap-4">
        <FaFacebook />
        <FaInstagram />
        <FaTwitter />
      </div>
    </div>
  );
};
