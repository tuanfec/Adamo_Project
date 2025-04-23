import { CardTour } from "./CardTour";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ListTour.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHeader, setTourData } from "@/app/slide/tourDataSlide";
import { setLocation } from "@/app/slide/statePageSlide";
interface CardTourProps {
  image?: string;
  title?: string;
  description?: string;
  experiences?: number;
  location?: string;
  votes?: number;
  duration?: string;
  price?: number;
  isSave?: boolean;
}

interface ListTourProps {
  data: CardTourProps[];
  header?: string;
  slidesPerView?: number;
  spaceBetween?: number;
}

export const ListTour: React.FC<ListTourProps> = ({
  data,
  header,
  slidesPerView,
  spaceBetween,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleViewAll = () => {
    dispatch(setTourData(data));
    dispatch(setHeader(header));
    dispatch(setLocation("Tour"));
    navigate("/view_all");
  };
  return (
    <div className="flex flex-col gap-4 my-10">
      <div className="flex justify-between items-center">
        <p className="text-4xl md:text-3xl font-medium lg:w-[60%] w-[80%]">
          {header}
        </p>
        <button
          onClick={handleViewAll}
          className="bg-black lg:mt-10 text-white h-[38px] w-[92px]">
          View All
        </button>
      </div>
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={spaceBetween}
          slidesPerView={slidesPerView}
          navigation
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
          }}
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
                image={item.image}
                title={item.title}
                description={item.description}
                experiences={item.experiences}
                votes={item.votes}
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
