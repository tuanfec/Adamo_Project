import { ListTour } from "./ListTour";
import { useTranslation } from "react-i18next";

const ListDestinations: React.FC<{ DataDestinations: any }> = ({
  DataDestinations,
}) => {
  const { t } = useTranslation();
  return (
    <div>
      {DataDestinations && (
        <ListTour
          header={t("homePage.listTour_1")}
          data={DataDestinations}
          slidesPerView={4}
          spaceBetween={30}
          isDestination={true}
        />
      )}
    </div>
  );
};

export default ListDestinations;
