import React from "react";
import { Button } from "react-bootstrap";
import { ImArrowRight2 } from "react-icons/im";
import styles from "./styles.module.scss";

function SidebarControleArrow() {
   return (
      <Button className={`rounded-circle ${styles["arrow-btn"]}`}>
         <ImArrowRight2 aria-hidden="true" display="block" />
      </Button>
   );
}

export default SidebarControleArrow;
