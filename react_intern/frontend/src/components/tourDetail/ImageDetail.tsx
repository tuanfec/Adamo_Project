import { Pagination, Navigation, Grid, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaBookmark } from "react-icons/fa";
import { TourData } from "@/types/tour";
import { HotelFormData, Room } from "@/types/hotel";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";
export const ImageDetail: React.FC<{
  data?: TourData | HotelFormData;
  isRoom?: boolean;
  roomData?: Room;
  onSubmit?: (id: string) => void;
}> = ({ data, isRoom, roomData, onSubmit }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const { t } = useTranslation();

  return (
    <div className={`relative`}>
      {/* Main Swiper */}
      <div className={`relative mb-6`}>
        <Swiper
          modules={[Navigation, Pagination, Thumbs]}
          spaceBetween={10}
          navigation
          thumbs={{ swiper: thumbsSwiper }}
          className="aspect-[1/1] lg:aspect-[1/1] md:aspect-[3/2] rounded-lg ">
          {isRoom ? (
            roomData?.image.map((item: string, index: number) => (
              <div className="relative">
                <SwiperSlide key={index}>
                  <img
                    src={item}
                    alt={roomData?.name}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              </div>
            ))
          ) : (
            <>
              {data?.image?.map((item: string, index: number) => (
                <SwiperSlide key={index} className="relative">
                  <img
                    src={item}
                    alt={data?.title}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </>
          )}
        </Swiper>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onSubmit && data?.id) onSubmit(data?.id);
          }}
          className={`absolute top-0 right-4 cursor-pointer z-10 ${data?.isSave ? "text-[#FF7B42]" : "text-[#FFFFFF]"}`}>
          <Tooltip
            title={data?.isSave ? t("CardTour.saved") : t("CardTour.save")}>
            <FaBookmark className="lg:text-5xl md:text-5xl text-4xl" />
          </Tooltip>{" "}
        </button>
      </div>

      {/* Thumbnail Swiper */}
      <Swiper
        modules={[Grid, Thumbs]}
        watchSlidesProgress
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        className="thumbs-swiper w-full">
        {isRoom ? (
          roomData?.image.map((item: string, index: number) => (
            <SwiperSlide key={index} className="cursor-pointer">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img
                  src={item}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <>
            {data?.image?.map((item: string, index: number) => (
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
            {data?.image?.length && data?.image?.length > 4 && (
              <SwiperSlide className="cursor-pointer">
                <div className="aspect-[4/3] rounded-lg overflow-hidden relative bg-black/50">
                  <img
                    src={data?.image[4]}
                    alt="More photos"
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-white font-medium">
                    <span>+{data?.image?.length - 4}</span>
                  </div>
                </div>
              </SwiperSlide>
            )}
          </>
        )}
      </Swiper>
    </div>
  );
};
