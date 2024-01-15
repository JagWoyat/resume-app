import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import Title from "./Title";
import { useEffect, useState } from "react";
import Button from "../common/Button";
import icon from "./../../assets/Monochrome-list-icon.svg";
import Icon from "../common/Icon";

const WIDTH_BREAKPOINT = 1000;

const NAV_ITEMS = [
  {
    title: "Weather App",
    link: "/weather-app",
  },
  {
    title: "Cryptocurrency App",
    link: "/crypto-app",
  },
  {
    title: "Image Editor with Go",
    link: "/image-editor",
  },
  {
    title: "Image Viewer",
    link: "/scroll",
  },
];

export default function Sidebar() {
  const [smallScreen, setSmallScreen] = useState(false);
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(window.innerWidth <= WIDTH_BREAKPOINT);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleClick() {
    setOpenNav((prevState) => {
      return !prevState;
    });
  }

  const navContent = (
    <>
      {NAV_ITEMS.map((item) => (
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? styles.routeLinkPending
              : isActive
              ? styles.routeLinkActive
              : styles.routeLink
          }
          to={item.link}
        >
          <h2>{item.title}</h2>
        </NavLink>
      ))}
    </>
  );

  return (
    <>
      {smallScreen ? (
        <>
          <header className={styles.headerSmall}>
            <div className={styles.navbarFlex}>
              <Title />
              <Button
                Icon={<Icon className={styles.buttonIcon} src={icon} />}
                onClick={handleClick}
                className={styles.sidebarOpen}
              />
            </div>
          </header>
          <nav
            style={openNav ? { translate: "0" } : { translate: "-100%" }}
            className={`${styles.wrapper} ${styles.wrapperSmall}`}
          >
            {navContent}
          </nav>
        </>
      ) : (
        <header className={`${styles.wrapper} ${styles.wrapperBig}`}>
          <div>
            <Title />
            <hr />
          </div>
          <nav>{navContent}</nav>
        </header>
      )}
    </>
  );
}
