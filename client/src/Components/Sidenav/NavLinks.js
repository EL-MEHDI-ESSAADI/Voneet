import React from "react";
import { navLinksStore } from "Data";
import styles from "./styles.module.scss";
import MyNavLink from "./MyNavLink";

function NavLinks({ isSidenavOpen }) {
   const navLinksElements = navLinksStore.map((list, index) => {
      return (
         <div key={index} className="text-capitalize">
            {list.headerText && <h6 className={styles.navListHeader}>{isSidenavOpen ? list.headerText : "-" }</h6>}
            <ul className={`${styles.navList} ${!index ? styles["navList--first"] : ""}`}>
               {list.links.map((link) => (
                  <MyNavLink {...link} key={link.text} />
               ))}
            </ul>
         </div>
      );
   });

   return <div>{navLinksElements}</div>;
}

export default NavLinks;
