import { ListTour } from "./ListTour";
import { useTranslation } from "react-i18next";

const ListDestinations: React.FC<{
  DataDestinations: any;
  onClick?: () => void;
}> = ({ DataDestinations, onClick }) => {
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
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default ListDestinations;
