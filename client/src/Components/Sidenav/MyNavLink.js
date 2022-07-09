import React from "react";
import { ScalableText } from "Components/styles";
import { StyledNavLink } from "./styles";
import useGlobalContext from "Hooks/useGlobalContext";

function MyNavLink({ to, Icon, text }) {
   const { isSidenavOpen } = useGlobalContext();

   return (
      <StyledNavLink to={to}>
         <Icon size="1.25rem" className="flex-shrink-0" />
         <ScalableText shrink={!isSidenavOpen}>{text}</ScalableText>
      </StyledNavLink>
   );
}

export default MyNavLink;
