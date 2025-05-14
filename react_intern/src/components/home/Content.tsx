import { BiSolidQuoteAltLeft } from "react-icons/bi";
import image1 from "@/assets/img1.jpg";
import image2 from "@/assets/img2.jpg";
export const Content: React.FC = () => {
  return (
    <div className="flex lg:flex-row lg:min-h-[623px] flex-col my-10">
      <div className="flex flex-col w-full relative min-h-[350px] mb-10">
        <img
          data-aos="fade-right"
          className="lg:max-w-[445px] lg:min-h-[541px] h-[300px] md:max-w-[80%] "
          src={image1}
          alt="image"
        />
        <img
          data-aos="fade-left"
          className="absolute bottom-0 lg:right-10 right-0 lg:max-w-[347px] lg:min-h-[347px] md:max-w-[347px] max-w-[200px] min-h-[200px]"
          src={image2}
          alt="image"
        />
      </div>
      <div
        data-aos="fade-up-left"
        data-aos-duration="1000"
        className="flex flex-col gap-14 lg:w-[80%] ">
        <div className="text-4xl md:text-3xl font-medium ">
          With <span className="text-[#FF7B42] ">NgaoduVietnam</span>, immerses
          you in majestic space and unique cultural features
        </div>
        <div className="flex flex-row gap-4 ">
          <BiSolidQuoteAltLeft className="text-8xl pb-[10%] text-[#FF7B42] " />
          <div className="dark:text-[#f4f3f3]">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
              viverra nuQlla eget sed odio. Vulputate risus faucibus sem non,
              feugiat nec consequat, montes. Elementum scelerisque phasellus
              donec lectus ullamcorper faucibus. Malesuada et adipiscing
              molestie egestas leo ut.
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
              viverra nuQlla eget sed odio. Vulputate risus faucibus sem non,
              feugiat nec consequat, montes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
