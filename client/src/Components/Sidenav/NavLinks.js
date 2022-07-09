import React from "react";
import { navLinksStore } from "Data";
import MyNavLink from "./MyNavLink";
import { NavList, NavListHeader } from "./styles";
import useGlobalContext from "Hooks/useGlobalContext";

function NavLinks() {
   const { isSidenavOpen } = useGlobalContext();

   const navLinksElements = navLinksStore.map((list, index) => {
      return (
         <div key={index} className="text-capitalize">
            {list.headerText && <NavListHeader>{isSidenavOpen ? list.headerText : "-"}</NavListHeader>}
            <NavList isItTopList={!index}>
               {list.links.map((link) => (
                  <MyNavLink {...link} key={link.text} />
               ))}
            </NavList>
         </div>
      );
   });

   return <div>{navLinksElements}</div>;
}

export default NavLinks;
