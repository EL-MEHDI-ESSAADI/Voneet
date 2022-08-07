import React from "react";
import { navLinksStore } from "Data";
import MyNavLink from "./MyNavLink";
import { NavList, NavListHeader } from "./styles";
import { useGlobalContext } from "Hooks";

function NavLinks() {
   const { isSidenavOpen } = useGlobalContext();

   const navLinksElements = navLinksStore.map((list, index) => {
      return (
         <div key={index} className="text-capitalize">
            {list.headerText && <NavListHeader>{isSidenavOpen ? list.headerText : "-"}</NavListHeader>}
            <NavList isItTopList={!index}>
               {list.links.map((link) => (
                  <li key={link.id} ><MyNavLink {...link} /></li>
               ))}
            </NavList>
         </div>
      );
   });

   return <div>{navLinksElements}</div>;
}

export default NavLinks;
