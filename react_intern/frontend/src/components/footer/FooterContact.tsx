import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";

export const FooterContact: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 text-sm">
      <div className="flex items-start gap-2">
        <FaLocationDot className="mt-1 flex-shrink-0 text-[#FF7B42]" />
        <p>Lilama 10 Tower, 56 To Huu, Trung Van, Nam Tu Liem, Ha Noi</p>
      </div>
      <div className="flex items-center gap-2">
        <MdOutlineEmail className="flex-shrink-0 text-[#FF7B42]" />
        <a
          href="mailto:hello@adamotravel.com"
          className="hover:text-[#FF7B42] transition-colors">
          hello@adamotravel.com
        </a>
      </div>
    </div>
  );
};
