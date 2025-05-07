import { CardTour } from "../home/CardTour";
import { useNavigate } from "react-router-dom";
import { useTourList } from "@/hooks/useTourList";
import { useMemo, useEffect } from "react";
import { TourData } from "@/types/tour";

interface RelatedTourProps {
  header: string;
  currentTourId?: string;
}

export const RelatedTour: React.FC<RelatedTourProps> = ({
  header,
  currentTourId,
}) => {
  const { data: tourData, isLoading } = useTourList(header);
  const navigate = useNavigate();

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

  const viewDetail = (id: string) => {
    navigate(`/view_detail/${id}`, {
      state: { previousHeader: header },
      replace: true,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p>Loading...</p>
      </div>
    );
  }

  if (!randomTours.length) {
    return null;
  }

  return (
    <div>
      <p className="text-xl font-medium my-6">Related Tours</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {randomTours.map((item, index) => (
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
          />
        ))}
      </div>
    </div>
  );
};
