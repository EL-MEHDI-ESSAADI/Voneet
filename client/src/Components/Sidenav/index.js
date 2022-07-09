import React from "react";
import { Logo, SidebarControleArrow } from "Components";
import NavLinks from "./NavLinks";
import useGlobalContext from "Hooks/useGlobalContext";
import { SidenavHeader, StyledSidenav } from "./styles";

function Sidenav() {
   const { isSidenavOpen } = useGlobalContext();

   return (
      <StyledSidenav closed={!isSidenavOpen}>
         <SidenavHeader>
            <Logo shrink={!isSidenavOpen} />
            <SidebarControleArrow floatInXlScreen notFixedToRight />
         </SidenavHeader>
         <NavLinks isSidenavOpen={isSidenavOpen} />
      </StyledSidenav>
   );
}

export default Sidenav;
