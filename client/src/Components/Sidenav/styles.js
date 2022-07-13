import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";

export const StyledNavLink = styled(NavLink)`
   display: flex;
   align-items: center;
   gap: 1rem;
   height: 44.16px;
   padding: 0.63rem 1rem;
   border-radius: 4px;
   color: var(--bs-gray);
   transition: var(--secondary-trn-2);
   transition-property: color, background-color, padding;
   box-shadow: var(--secondary-shadow-color-1) 1.95px 1.95px 2.6px;

   &:hover {
      color: var(--bs-blue);
      background-color: var(--bs-primary-tint-88);
   }

   &.active {
      color: var(--bs-white);
      background-color: var(--bs-primary);
      box-shadow: 0px 2px 4px var(--primary-shadow-color);
   }
`;

export const NavList = styled.ul`
   position: relative;
   display: grid;
   gap: 0.5rem;
   padding: 0.75rem 1rem;
   margin: 0;

   ${({ isItTopList }) => {
      if (isItTopList)
         return css`
            margin-block: 0.5rem 1rem;

            &::after {
               content: "";
               position: absolute;
               bottom: 0;
               left: 10%;
               width: 80%;
               height: 1px;
               background: var(--bs-gray-200);
            }
         `;
   }}
`;

export const NavListHeader = styled.h6`
   padding-inline: 1rem;
   color: var(--bs-gray-500);
`;

export const SidenavHeader = styled.header.attrs({
   className: "d-flex align-items-center justify-content-between px-3",
})`
   position: relative;
   height: calc(var(--page-uncollapsed-header-height) + 1px);
   border-bottom: 1px solid var(--bs-gray-200);
`;

export const StyledSidenav = styled.aside.attrs({ "aria-label": "sidenav" })`
   z-index: 1;
   width: var(--sidenav-width);
   transition: var(--secondary-trn-1);
   background-color: var(--bs-white);
   box-shadow: 0 0 30px 0 var(--secondary-shadow-color-2);

   @media (max-width: 1200px) {
      position: absolute;
      z-index: 1030;
      left: 0;
      top: 0;
   }

   ${({ closed }) => {
      if (closed)
         return css`
            width: var(--closed-sidenav-width);

            @media (max-width: 1200px) {
               transform: translateX(-100%);
               visibility: hidden;
            }

            ${NavListHeader} {
               text-align: center;
            }

            ${StyledNavLink} {
               gap: 0;
               padding: 0.625rem 0.875rem;
            }
         `;
   }}
`;
