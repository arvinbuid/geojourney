import {Outlet} from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import {HiXMark} from "react-icons/hi2";

function Sidebar({isSidebarOpen, setIsSidebarOpen}) {
  return (
    <aside className={`${isSidebarOpen ? styles["sidebar-open"] : ""}`}>
      <div className={styles.sidebar}>
        <Logo />
        <AppNav />
        <Outlet />

        <button className={styles["sidebar-icon"]} onClick={() => setIsSidebarOpen(false)}>
          <HiXMark />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
