import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { MAP_CONSTANTS } from "@/constants/map";
import { Location } from "@/types/tour";

export const useMapPosition = (location: Location | null) => {
  const map = useMap();

  useEffect(() => {
    if (location?.coordinates?.lat && location?.coordinates?.lng) {
      map.setView(
        [location.coordinates.lat, location.coordinates.lng],
        MAP_CONSTANTS.DEFAULT_ZOOM
      );
    }
  }, [location, map]);

  return null;
};
