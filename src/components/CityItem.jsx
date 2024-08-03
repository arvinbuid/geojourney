import {Link} from "react-router-dom";
import styles from "./CityItem.module.css";
import {polyfillCountryFlagEmojis} from "country-flag-emoji-polyfill";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({city}) {
  polyfillCountryFlagEmojis(); // load flags on windows os
  const {cityName, emoji, date, id} = city;

  return (
    <li>
      <Link className={styles.cityItem} to={`${id}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;