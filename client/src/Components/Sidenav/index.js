import React from "react";
import { Logo, SidebarControleArrow } from "Components";
import styles from "./styles.module.scss"

function Sidenav() {
   return (
      <div className={`bg-white ${styles.sidenav}`}>
         <header className={`d-flex align-items-center justify-content-between px-4 ${styles.sidenavHeader}`}> 
            <Logo />
            <SidebarControleArrow isItLeftArrow floatInXlScreen/>
         </header>
      </div>
   );
}

export default Sidenav;
