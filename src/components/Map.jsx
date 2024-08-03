import {useNavigate, useSearchParams} from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();

  let lat = searchParams.get("lat");
  let lng = searchParams.get("lng");

  const navigate = useNavigate();

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h2>
        Position: lat: {lat}, long: {lng}
      </h2>
      <button onClick={() => setSearchParams({lat: 22, lng: 40})}>Change Position</button>
    </div>
  );
}

export default Map;
