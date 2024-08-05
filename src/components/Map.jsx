import {useNavigate, useSearchParams} from "react-router-dom";
import styles from "./Map.module.css";
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import {useEffect, useState} from "react";
import {useCities} from "../contexts/CitiesContext";
import {flagemojiToPNG} from "../helpers/Helpers";
import {useGeolocation} from "../hooks/useGeolocation";
import Button from "./Button";

function Map() {
  const {cities} = useCities();
  const [mapPosition, setMapPosition] = useState([14.2893437, 120.9098051]);
  const [searchParams] = useSearchParams();

  // useGeolocation custom hook
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  let mapLat = searchParams.get("lat");
  let mapLng = searchParams.get("lng");

  // synchronize mapPosition with mapLat, mapLng
  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  // synchronize geolocationPosition with mapPosition
  useEffect(() => {
    if (geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
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
      </MapContainer>
    </div>
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

export default Map;
