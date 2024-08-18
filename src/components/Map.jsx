import {useNavigate} from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import {useEffect, useState} from "react";
import {useCities} from "../contexts/CitiesContext";
import {flagemojiToPNG} from "../helpers/Helpers";
import {useGeolocation} from "../hooks/useGeolocation";
import {useUrlPosition} from "../hooks/useUrlPosition";
import Sidebar from "./Sidebar.jsx";
import Button from "./Button";
import styles from "./Map.module.css";

function Map() {
  const {cities} = useCities();
  const [mapPosition, setMapPosition] = useState([14.2893437, 120.9098051]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // useGeolocation custom hook
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  // useUrlPosition custom hook
  const [mapLat, mapLng] = useUrlPosition();

  // synchronize mapPosition with mapLat, mapLng
  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  // synchronize geolocationPosition with mapPosition
  useEffect(() => {
    if (geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <>
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className={styles.mapContainer}>
        {!geolocationPosition && (
          <Button type='position' onClick={getPosition}>
            {isLoadingPosition ? "Loading..." : "Use your position"}
          </Button>
        )}
        <MapContainer
          center={mapPosition}
          // center={[mapLat, mapLng]}
          zoom={6}
          scrollWheelZoom={true}
          className={styles.map}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
          />
          {cities.map((city) => (
            <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
              <Popup>
                <span>{flagemojiToPNG(city.emoji)}</span> <span>{city.cityName}</span>
              </Popup>
            </Marker>
          ))}

          <ChangeCenter position={mapPosition} />
          <DetectClickFromForm />
          <ToggleSideBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        </MapContainer>
      </div>
    </>
  );
}

function ChangeCenter({position}) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClickFromForm() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

function ToggleSideBar({isSidebarOpen, setIsSidebarOpen}) {
  const handleClick = () => setIsSidebarOpen(true);

  useMapEvents({
    click: handleClick,
  });

  return null;
}

export default Map;
