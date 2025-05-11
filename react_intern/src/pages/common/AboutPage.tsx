import { AboutLayout } from "@/layouts/AboutLayout";
import { Content } from "@/components/home/Content";
import img3 from "@/assets/img3.png";
import img4 from "@/assets/img4.png";
import img5 from "@/assets/img5.png";
import img6 from "@/assets/img6.png";
import { FloatButton } from "antd";
import { Breadcrumb } from "@/components/common/Breadcrumb";
function AboutPage() {
  return (
    <AboutLayout>
      <Breadcrumb />
      <Content />
      {/* Content_2 */}
      <div className="flex  md:flex-row lg:flex-row lg:max-h-full my-10 relative flex-col-reverse">
        <div className="flex flex-col px-3 md:px-2 lg:px-0 gap-4 w-full lg:w-[80%] lg:gap-10">
          <p className="lg:text-4xl md:text-3xl text-2xl font-medium mt-10">
            With <span className="text-[#FF7B42]">NgaoduVietnam</span>, immerses
            you in majestic space and unique cultural features
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
            viverra nuQlla eget sed odio. Vulputate risus faucibus sem non,
            feugiat nec consequat, montes. Elementum scelerisque phasellus donec
            lectus ullamcorper faucibus. Malesuada et adipiscing molestie
            egestas leo ut.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
            viverra nuQlla eget sed odio. Vulputate risus faucibus sem non,
            feugiat nec consequat, montes.
          </p>
        </div>
        <div className="w-full">
          <img
            className="h-full lg:max-h-[539px] lg:min-w-[540px] float-end"
            src={img3}
            alt="image"
          />
        </div>
      </div>

      {/* Content_3 */}
      <div className="flex flex-col lg:max-h-full my-10 lg:my-20 relative lg:gap-15 gap-10 ">
        <img
          className="w-full aspect-[16/6] object-cover"
          src={img4}
          alt="image"
        />
        <div className="flex flex-col gap-10">
          <p className="text-4xl md:text-3xl w-[100%] md:w-[90%] lg:w-[44%] font-medium">
            Experience the traditional cultural beauties of Vietnam
          </p>
          <div className="flex flex-row lg:gap-20 gap-10">
            <p className="w-[50%]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
              viverra nuQlla eget sed odio. Vulputate risus faucibus sem non,
              feugiat nec consequat, montes. Elementum scelerisque phasellus
              donec lectus ullamcorper faucibus. Malesuada et adipiscing
              molestie egestas leo ut.
            </p>
            <p className="w-[50%]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
              viverra nuQlla eget sed odio. Vulputate risus faucibus sem non,
              feugiat nec consequat, montes. Elementum scelerisque phasellus
              donec lectus ullamcorper faucibus.
            </p>
          </div>
        </div>
      </div>

      {/* Content_4 */}
      <div className="flex min-h-full flex-col md:flex-row lg:flex-row lg:gap-17 gap-10 my-10">
        <div className="lg:w-[100%]">
          <img
            className="max-h-[574px] lg:min-w-[445px] md:min-w-[445px]"
            src={img5}
            alt="image"
          />
        </div>
        <div className="flex flex-col lg:w-[100%] h-full lg:gap-12 md:gap-30 gap-10">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
            viverra nuQlla eget sed odio. Vulputate risus faucibus sem non,
            feugiat nec consequat, montes. Elementum scelerisque phasellus donec
            lectus ullamcorper faucibus. Malesuada et adipiscing molestie
            egestas leo ut.
          </p>
          <img
            className="lg:min-h-[384px] md:min-h-[250px]"
            src={img6}
            alt="image"
          />
        </div>
      </div>
      <FloatButton.BackTop visibilityHeight={200} />
    </AboutLayout>
  );
}

export default AboutPage;
