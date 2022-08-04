import React from "react";
import { useGlobalContext } from "Hooks";
import { ArrowIcon, Button } from "./styles";

function SidebarControleArrow({ notFixedToRight = false, floatInXlScreen = false }) {
   const { isSidenavOpen, openSidenav, closeSidenav } = useGlobalContext();

   return (
      <Button
         onClick={isSidenavOpen ? closeSidenav : openSidenav}
         floatInXlScreen={floatInXlScreen}
         aria-label="toggle sidenav"
      >
         <ArrowIcon rotateToLeft={isSidenavOpen && notFixedToRight} />
      </Button>
   );
}

export default SidebarControleArrow;
