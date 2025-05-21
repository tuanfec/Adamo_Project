import { CardTour } from "../home/CardTour";
import { useNavigate } from "react-router-dom";
import { useTourList } from "@/hooks/useTourList";
import { useMemo, useEffect, use, useState } from "react";
import { useChangeSaveHotel, useHotels } from "@/hooks/useHotels";
import { HotelFormData } from "@/types/hotel";
import { HotelCard } from "../home/HotelCard";
import { useTranslation } from "react-i18next";
import { useChangeSaveTour } from "@/hooks/useTours";
import { useNotification } from "../notifiction/NotificationProvider";
import { useQueryClient } from "@tanstack/react-query";
import { TourData } from "@/types/tour";
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
  const navigate = useNavigate();
  const notification = useNotification();

  const { data: tourData } = useTourList(source);
  const { data: hotelData } = useHotels();

  const [fixedRandomTours, setFixedRandomTours] = useState<TourData[]>([]);
  const [fixedRandomHotels, setFixedRandomHotels] = useState<HotelFormData[]>(
    []
  );
  const [hasRandomized, setHasRandomized] = useState(false);

  useEffect(() => {
    if (tourData && tourData.length > 0 && !hasRandomized) {
      setHasRandomized(true);
      const filtered = currentTourId
        ? tourData.filter((tour) => tour.id !== currentTourId)
        : tourData;

      const shuffled = [...filtered].sort(() => 0.5 - Math.random());
      setFixedRandomTours(shuffled.slice(0, Math.min(6, shuffled.length)));
    }
  }, [tourData, currentTourId, hasRandomized]);

  useEffect(() => {
    if (hotelData && hotelData.length > 0 && !hasRandomized) {
      setHasRandomized(true);
      const filtered = currentTourId
        ? hotelData.filter((hotel: any) => hotel.id !== currentTourId)
        : hotelData;

      const shuffled = [...filtered].sort(() => 0.5 - Math.random());
      setFixedRandomHotels(shuffled.slice(0, Math.min(6, shuffled.length)));
    }
  }, [hotelData, currentTourId, hasRandomized]);

  useEffect(() => {
    setHasRandomized(false);
  }, [currentTourId]);

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
  const changeSave = useChangeSaveHotel();
  const queryClient = useQueryClient();
  const handleChangeSaveHotel = (id: string) => {
    const oldSave = hotelData?.find((hotel: any) => hotel.id === id)?.isSave;
    const newSave = !oldSave;
    changeSave.mutate(
      {
        id,
        isSave: newSave,
      },
      {
        onSuccess: () => {
          queryClient.setQueryData(["hotels"], (oldData: any) => {
            if (!oldData) return oldData;
            return oldData.map((hotel: any) => {
              if (hotel.id === id) {
                return { ...hotel, isSave: newSave };
              }
              return hotel;
            });
          });
          setFixedRandomHotels((prev) =>
            prev.map((hotel) =>
              hotel.id === id ? { ...hotel, isSave: newSave } : hotel
            )
          );
          notification.success({
            message: newSave
              ? t("notification.saveHotlel")
              : t("notification.unsaveHotel"),
          });
        },
        onError: (error) => {
          console.error("Error updating save status:", error);
        },
      }
    );
  };
  const handleChangeSaveTour = (id: string) => {
    const oldSave = tourData?.find((tour) => tour.id === id)?.isSave;
    const newSave = !oldSave;
    changeSave.mutate(
      {
        id,
        isSave: newSave,
      },
      {
        onSuccess: () => {
          queryClient.setQueryData(["tours"], (oldData: any) => {
            if (!oldData) return oldData;
            return oldData.map((tour: any) => {
              if (tour.id === id) {
                return { ...tour, isSave: newSave };
              }
              return tour;
            });
          });
          setFixedRandomTours((prev) =>
            prev.map((tour) =>
              tour.id === id ? { ...tour, isSave: newSave } : tour
            )
          );
          notification.success({
            message: newSave
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
          ? fixedRandomHotels.map((item) => (
              <HotelCard
                data={item}
                onClick={() => viewDetail(item.id)}
                handleChangeSaveHotel={() =>
                  handleChangeSaveHotel(item.id || "")
                }
              />
            ))
          : fixedRandomTours.map((item, index) => (
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
                handleChangeSaveTour={() => handleChangeSaveTour(item.id || "")}
              />
            ))}
      </div>
    </div>
  );
};
