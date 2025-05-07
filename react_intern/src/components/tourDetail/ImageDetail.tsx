import { useSelector } from "react-redux";
import { Pagination, Navigation, Grid, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/grid";
import "swiper/css/thumbs";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

export const ImageDetail: React.FC = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const tourDetail = useSelector(
    (state: any) => state.tourDataSlide.tourDetail
  );

  return (
    <div className="relative">
      {/* Main Swiper */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Thumbs]}
          spaceBetween={10}
          navigation
          thumbs={{ swiper: thumbsSwiper }}
          className="aspect-[1/1] rounded-lg ">
          {tourDetail?.image?.map((item: string, index: number) => (
            <SwiperSlide key={index} className="relative">
              <img
                src={item}
                alt={tourDetail?.title}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
          <button
            className={`absolute top-0 right-4 z-10 ${tourDetail?.isSave ? "text-[#FF7B42]" : "text-[#FFFFFF]"} `}>
            <FaBookmark className="lg:text-5xl md:text-4xl text-3xl" />
          </button>
        </Swiper>
      </div>

      {/* Thumbnail Swiper */}
      <Swiper
        modules={[Grid, Thumbs]}
        watchSlidesProgress
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        className="thumbs-swiper">
        {tourDetail?.image?.map((item: string, index: number) => (
          <SwiperSlide key={index} className="cursor-pointer">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src={item}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover hover:opacity-80 transition-opacity"
              />
            </div>
          </SwiperSlide>
        ))}
        {tourDetail?.image?.length > 4 && (
          <SwiperSlide className="cursor-pointer">
            <div className="aspect-[4/3] rounded-lg overflow-hidden relative bg-black/50">
              <img
                src={tourDetail?.image[4]}
                alt="More photos"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center text-white font-medium">
                <span>+{tourDetail?.image.length - 4}</span>
              </div>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};
