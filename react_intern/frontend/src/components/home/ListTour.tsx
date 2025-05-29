import { CardTour } from "./CardTour";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ListTour.css";
import { TourData } from "@/types/tour";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useChangeSaveTour } from "@/hooks/useTours";
import { useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/components/notifiction/NotificationProvider";

interface ListTourProps {
  data: TourData[];
  header?: string;
  slidesPerView?: number;
  spaceBetween?: number;
  onClick?: () => void;
  source?: string;
  isDestination?: boolean;
}

export const ListTour: React.FC<ListTourProps> = ({
  data,
  header,
  slidesPerView,
  spaceBetween,
  onClick,
  source,
  isDestination,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notification = useNotification();

  const changeSave = useChangeSaveTour();
  const useQueyClient = useQueryClient();
  const handleChangeSaveTour = (id: string) => {
    const oldIsSave = data.find((item) => item.id === id)?.isSave;
    const newIsSave = !oldIsSave;
    changeSave.mutate(
      {
        id,
        isSave: newIsSave,
      },
      {
        onSuccess: () => {
          useQueyClient.setQueryData(["tourData", source], (oldData: any) => {
            if (!oldData) return oldData;
            return oldData.map((tour: any) => {
              if (tour.id === id) {
                return { ...tour, isSave: newIsSave };
              }
              return tour;
            });
          });
          notification.success({
            message: newIsSave
              ? t("notification.saveTour")
              : t("notification.unsaveTour"),
          });
        },
        onError: (error) => {
          console.error("Error updating save status:", error);
        },
      }
    );
  };

  const viewDetail = (id?: string, source?: string, location?: string) => {
    if (isDestination) {
      navigate(`/tours/view_all/destination/${location}`, {
        state: { location },
      });
    } else {
      navigate(`/tours/view_detail/${source}/${id}`, {
        state: { previousHeader: header, id },
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 my-10">
      <div className="flex md:flex-row flex-col gap-2 justify-between md:items-center">
        <p className="lg:text-4xl md:text-3xl text-2xl font-medium lg:w-[60%] md:w-[60%] full">
          {header}
        </p>
        <button
          onClick={onClick}
          className="bg-black rounded dark:bg-[#FF7B42] dark:text-white cursor-pointer lg:mt-10  text-white py-2 w-fit px-4">
          {t("ViewAll")}
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
                onClick={() =>
                  viewDetail(item.id, source || "attractive", item.location)
                }
                image={item.image?.[0]}
                title={item.title}
                description={item.description}
                experiences={item.experiences}
                votes={item.reviews?.rating}
                location={item.location}
                duration={item.duration}
                price={item.price}
                isSave={item.isSave}
                isHover={true}
                handleChangeSaveTour={() => handleChangeSaveTour(item.id || "")}
              />
            </SwiperSlide>
          ))}
          <div className="swiper-pagination !bottom-0"></div>
        </Swiper>
      </div>
    </div>
  );
};
