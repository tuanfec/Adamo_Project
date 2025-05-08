import { Pagination, Navigation, Grid, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";

import { FaBookmark } from "react-icons/fa";
import { TourData } from "@/types/tour";
import { HotelFormData, Room } from "@/types/hotel";
export const ImageDetail: React.FC<{
  data?: TourData | HotelFormData;
  isRoom?: boolean;
  roomData?: Room;
}> = ({ data, isRoom, roomData }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  return (
    <div className={`relative`}>
      {/* Main Swiper */}
      <div className={`relative `}>
        <Swiper
          modules={[Navigation, Pagination, Thumbs]}
          spaceBetween={10}
          navigation
          thumbs={{ swiper: thumbsSwiper }}
          className="aspect-[1/1] lg:aspect-[1/1] md:aspect-[3/2] rounded-lg ">
          {isRoom ? (
            roomData?.image.map((item: string, index: number) => (
              <SwiperSlide key={index}>
                <img
                  src={item}
                  alt={roomData?.name}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
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
              <button
                className={`absolute top-0 right-4 z-10 ${data?.isSave ? "text-[#FF7B42]" : "text-[#FFFFFF]"}`}>
                <FaBookmark className="lg:text-5xl md:text-4xl text-3xl" />
              </button>
            </>
          )}
        </Swiper>
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
