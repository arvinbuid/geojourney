import {Link} from "react-router-dom";
import PageNav from "../components/PageNav";
import AppNav from "../components/AppNav";

function Homepage() {
  return (
    <div>
      <AppNav />
      <PageNav />
      <h1>Geo Journey</h1>
      <Link to='/app'>Go to the app</Link>
    </div>
  );
}

export default Homepage;
