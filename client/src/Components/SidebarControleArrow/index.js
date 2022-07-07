import React from "react";
import { Button } from "react-bootstrap";
import { ImArrowRight2 } from "react-icons/im";
import useGlobalContext from "../../Hooks/useGlobalContext";
import styles from "./styles.module.scss";

function SidebarControleArrow({ notFixedToRight=false,  floatInXlScreen = false }) {
   const { isSidenavOpen, openSidenav, closeSidenav } = useGlobalContext();

   return (
      <Button
         onClick={isSidenavOpen ? closeSidenav : openSidenav}
         className={`rounded-circle ${styles["arrow-btn"]} ${floatInXlScreen ? styles["arrow-btn--float"] : ""}`}
      >
         <ImArrowRight2
            aria-hidden="true"
            display="block"
            className={`${styles["arrow-icon"]} ${isSidenavOpen && notFixedToRight ? styles["arrow-icon--left"] : ""}`}
         />
      </Button>
   );
}

export default SidebarControleArrow;
