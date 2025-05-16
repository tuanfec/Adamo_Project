import { CardTour } from "../home/CardTour";
import { useNavigate } from "react-router-dom";
import { useTourList } from "@/hooks/useTourList";
import { useMemo, useEffect } from "react";
import { TourData } from "@/types/tour";
import { useHotels } from "@/hooks/useHotels";
import { HotelFormData } from "@/types/hotel";
import { HotelCard } from "../home/HotelCard";
import { Loading } from "../common/Loading";
import { useTranslation } from "react-i18next";
interface RelatedTourProps {
  source: string;
  currentTourId?: string;
  isHotel?: boolean;
}

export const RelatedTour: React.FC<RelatedTourProps> = ({
  source,
  currentTourId,
  isHotel,
}) => {
  const { t } = useTranslation();
  const { data: tourData, isLoading } = useTourList(source);
  const navigate = useNavigate();
  const { data: hotelData } = useHotels();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentTourId]);

  const randomTours = useMemo(() => {
    if (!tourData || tourData.length === 0) return [];

    const filteredTours = currentTourId
      ? tourData.filter((tour) => tour.id !== currentTourId)
      : tourData;

    const shuffled = [...filteredTours].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, Math.min(6, shuffled.length));
  }, [tourData, currentTourId]);

  const relatedHotels = useMemo(() => {
    if (!hotelData || hotelData.length === 0) return [];

    const filteredHotels = currentTourId
      ? hotelData.filter((hotel: HotelFormData) => hotel.id !== currentTourId)
      : hotelData;

    const shuffled = [...filteredHotels].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, Math.min(6, shuffled.length));
  }, [hotelData, currentTourId]);

  const viewDetail = (id: string) => {
    if (isHotel) {
      navigate(`/hotels/view_detail/${id}`, {
        state: { source: source },
        replace: true,
      });
    } else {
      navigate(`/tours/view_detail/${source}/${id}`, {
        state: { source: source },
        replace: true,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loading />
      </div>
    );
  }

  if (!randomTours.length && !relatedHotels.length) {
    return null;
  }

  return (
    <div>
      {isHotel ? (
        <p className="text-2xl font-medium my-8">
          {t("RelatedTour.recommended")}
        </p>
      ) : (
        <p className="text-2xl font-medium my-8">{t("RelatedTour.title")}</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {isHotel
          ? relatedHotels.map((item) => (
              <HotelCard data={item} onClick={() => viewDetail(item.id)} />
            ))
          : randomTours.map((item, index) => (
              <CardTour
                onClick={() => viewDetail(item.id)}
                key={item.id || index}
                image={item.image?.[0]}
                title={item.title}
                description={item.description}
                experiences={item.experiences}
                location={item.location}
                votes={item.reviews?.rating}
                duration={item.duration}
                price={item.price}
                isSave={item.isSave}
                isHover={true}
              />
            ))}
      </div>
    </div>
  );
};
