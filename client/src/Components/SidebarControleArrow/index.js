import React from "react";
import useGlobalContext from "Hooks/useGlobalContext";
import { ArrowIcon, Button } from "./styles";

function SidebarControleArrow({ notFixedToRight = false, floatInXlScreen = false }) {
   const { isSidenavOpen, openSidenav, closeSidenav } = useGlobalContext();

   return (
      <Button onClick={isSidenavOpen ? closeSidenav : openSidenav} floatInXlScreen={floatInXlScreen}>
         <ArrowIcon rotateToLeft={isSidenavOpen && notFixedToRight} />
      </Button>
   );
}

export default SidebarControleArrow;
