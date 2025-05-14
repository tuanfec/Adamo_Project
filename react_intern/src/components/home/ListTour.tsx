import { CardTour } from "./CardTour";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ListTour.css";
import { TourData } from "@/types/tour";

interface ListTourProps {
  data: TourData[];
  header?: string;
  slidesPerView?: number;
  spaceBetween?: number;
  onClick?: () => void;
}

export const ListTour: React.FC<ListTourProps> = ({
  data,
  header,
  slidesPerView,
  spaceBetween,
  onClick,
}) => {
  return (
    <div className="flex flex-col gap-4 my-10">
      <div className="flex justify-between items-center">
        <p className="text-4xl md:text-3xl font-medium lg:w-[60%] w-[80%]">
          {header}
        </p>
        <button
          onClick={onClick}
          className="bg-black dark:bg-[#FF7B42] dark:text-white cursor-pointer lg:mt-10 text-white h-[38px] w-[92px]">
          View All
        </button>
      </div>
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={spaceBetween}
          slidesPerView={slidesPerView}
          navigation
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: slidesPerView,
            },
            300: {
              slidesPerView: 1,
            },
          }}
          className="pb-12 relative">
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <CardTour
                image={item.image?.[0]}
                title={item.title}
                description={item.description}
                experiences={item.experiences}
                votes={item.reviews?.rating}
                location={item.location}
                duration={item.duration}
                price={item.price}
                isSave={item.isSave}
              />
            </SwiperSlide>
          ))}
          <div className="swiper-pagination !bottom-0"></div>
        </Swiper>
      </div>
    </div>
  );
};
