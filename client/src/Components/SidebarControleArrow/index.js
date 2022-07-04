import React from "react";
import { Button } from "react-bootstrap";
import { ImArrowRight2 } from "react-icons/im";
import styles from "./styles.module.scss";

function SidebarControleArrow({ isItLeftArrow = false, floatInXlScreen = false }) {
   return (
      <Button
         className={`rounded-circle ${styles["arrow-btn"]} ${
            floatInXlScreen ? styles["arrow-btn--float"] : ""
         }`}
      >
         <ImArrowRight2
            aria-hidden="true"
            display="block"
            className={`${styles["arrow-icon"]} ${isItLeftArrow ? styles["arrow-icon--left"] : ""}`}
         />
      </Button>
   );
}

export default SidebarControleArrow;
