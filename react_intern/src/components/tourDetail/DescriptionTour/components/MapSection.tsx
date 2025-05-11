import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Location } from "@/types/tour";
import { MAP_CONSTANTS } from "@/constants/map";
import { useMapPosition } from "@/hooks/useMapPosition";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions(MAP_CONSTANTS.DEFAULT_MARKER_ICON);

interface MapSectionProps {
  location: Location | null;
  isContact?: boolean;
}

const MapUpdater: React.FC<MapSectionProps> = ({ location }) => {
  useMapPosition(location);
  return null;
};

export const MapSection: React.FC<MapSectionProps> = ({
  location,
  isContact,
}) => {
  const defaultCenter: [number, number] =
    location?.coordinates?.lat && location?.coordinates?.lng
      ? [location.coordinates.lat, location.coordinates.lng]
      : [40.8518, 14.2681];
  console.log(isContact);
  return (
    <div>
      <div
        className={`${isContact ? "h-[500px]" : "h-[300px]"}  overflow-hidden rounded-lg mt-6`}>
        {location?.coordinates?.lat && location?.coordinates?.lng ? (
          <MapContainer
            center={defaultCenter}
            zoom={MAP_CONSTANTS.DEFAULT_ZOOM}
            style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url={MAP_CONSTANTS.TILE_LAYER_URL}
              attribution={MAP_CONSTANTS.TILE_LAYER_ATTRIBUTION}
            />
            <Marker
              position={[location.coordinates.lat, location.coordinates.lng]}>
              <Popup>
                <div>
                  <h3 className="font-medium">{location.locationName}</h3>
                </div>
              </Popup>
            </Marker>
            <MapUpdater location={location} />
          </MapContainer>
        ) : (
          <div className="h-full relative z-0 w-full flex items-center justify-center bg-[url(/src/assets/map.jpg)]  bg-cover bg-center">
            <div className="absolute z-10 bg-gray-100/50 w-full blur-lg h-full"></div>
            <p className="text-black relative z-10 text-2xl font-medium">
              Select a location to view on map
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
