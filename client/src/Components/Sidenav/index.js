import React from "react";
import { Logo, SidebarControleArrow } from "Components";
import styles from "./styles.module.scss";
import NavLinks from "./NavLinks";
import useGlobalContext from "Hooks/useGlobalContext";

function Sidenav() {
   const {isSidenavOpen} = useGlobalContext();


   return (
      <aside className={`bg-white ${styles.sidenav} ${!isSidenavOpen ? styles["sidenav--closed"] : ""}`}>
         <header className={`d-flex align-items-center justify-content-between px-3 ${styles.sidenavHeader}`}>
            <Logo logoTextclassName={styles['animatable-text']}/>
            <SidebarControleArrow floatInXlScreen notFixedToRight  />
         </header>
         <NavLinks isSidenavOpen={isSidenavOpen}/>
      </aside>
   );
}

export default Sidenav;
