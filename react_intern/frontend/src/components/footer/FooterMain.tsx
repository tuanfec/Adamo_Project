import { FooterLogo } from "./FooterLogo";
import { FooterInfor } from "./FooterInfor";
import { FooterContact } from "./FooterContact";
import { CopyRight } from "./CopyRight";
export const FooterMain: React.FC = () => {
  return (
    <footer className="bg-[#1C1C1E] text-white w-full ">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex justify-center lg:mx-30 lg:mb-20 md:justify-start">
            <FooterLogo />
          </div>
          <div className="flex justify-center">
            <FooterInfor />
          </div>
          <div className="flex justify-center md:justify-end ml-5 lg:ml-0">
            <FooterContact />
          </div>
        </div>
      </div>
      <CopyRight />
    </footer>
  );
};
