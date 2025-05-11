import { Link } from "react-router-dom";

export const FooterInfor: React.FC = () => {
  return (
    <div className="flex flex-row items-start justify-center gap-8 md:gap-12 lg:gap-25">
      <div className="flex flex-col gap-4">
        <Link to="/" className="hover:text-[#FF7B42] transition-colors">
          Home
        </Link>
        <Link to="/about" className="hover:text-[#FF7B42] transition-colors">
          About
        </Link>
        <Link to="/tours" className="hover:text-[#FF7B42] transition-colors">
          Tours
        </Link>
        <Link to="/hotels" className="hover:text-[#FF7B42] transition-colors">
          Hotels
        </Link>
        <Link to="/contact" className="hover:text-[#FF7B42] transition-colors">
          Contact
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <p className="cursor-pointer hover:text-[#FF7B42] transition-colors">
          Partner with us
        </p>
        <p className="cursor-pointer hover:text-[#FF7B42] transition-colors">
          Terms & Conditions
        </p>
        <Link
          to="/policy"
          className="cursor-pointer hover:text-[#FF7B42] transition-colors">
          Privacy Policy
        </Link>
        <p className="cursor-pointer hover:text-[#FF7B42] transition-colors">
          Guest Policy
        </p>
      </div>
    </div>
  );
};
