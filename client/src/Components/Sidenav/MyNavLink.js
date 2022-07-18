import React from "react";
import { ScalableText } from "Components/styles";
import { StyledNavLink } from "./styles";
import useGlobalContext from "Hooks/useGlobalContext";

function MyNavLink({ path, Icon, name }) {
   const { isSidenavOpen, closeSidenav } = useGlobalContext();

   function handelClick() {
      const xl = 1200;
      if (window.innerWidth < xl) closeSidenav();
   }

   return (
      <StyledNavLink to={path} onClick={handelClick}>
         <Icon size="1.25rem" className="flex-shrink-0" aria-hidden="true" />
         <ScalableText shrink={!isSidenavOpen}>{name}</ScalableText>
      </StyledNavLink>
   );
}

export default MyNavLink;
