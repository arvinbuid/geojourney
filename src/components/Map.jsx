import {useNavigate, useSearchParams} from "react-router-dom";
import styles from "./Map.module.css";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {useState} from "react";
import {useCities} from "../contexts/CitiesContext";
import {flagemojiToPNG} from "../helpers/Helpers";

function Map() {
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const {cities} = useCities();

  let lat = searchParams.get("lat");
  let lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <MapContainer className={styles.map} center={mapPosition} zoom={13} scrollWheelZoom={true}>
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
      </MapContainer>
    </div>
  );
}

export default Map;
