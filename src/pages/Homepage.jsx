import {Link} from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          You travel the world.
          <br />
          GeoJourney keeps track of all your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps through every city you can think of. Never forget
          your amazing adventures, and show friends how you&apos;ve traveled the world.
        </h2>
        <Link to='/app' className='cta'>
          Start tracking now
        </Link>
      </section>
    </main>
  );
}
