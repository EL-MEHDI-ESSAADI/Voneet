import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { Logo, SidebarControleArrow } from "Components";
import useGlobalContext from "Hooks/useGlobalContext";
import LoginBtn from "./LoginBtn";
import UserDropdown from "./UserDropdown";
import styled from "styled-components";

// styles
const HeaderUncollapsedPart = styled.div.attrs({ className: "d-flex justify-content-between flex-grow-1" })`
   --Navbar-y-padding: 0.5rem;
   height: calc(var(--page-uncollapsed-header-height) - var(--Navbar-y-padding) * 2);
`;

const ArrowBtnAndLogoCon = styled.div.attrs({ className: "d-flex d-xl-none align-items-center gap-3" })``;

const HeaderCollapsedPart = styled.div.attrs({ className: "ms-auto d-flex justify-content-end pt-2 pt-sm-0" })``;

// component
function Header() {
   const { isUserLoggedin } = useGlobalContext();

   return (
      <Navbar bg="white" expand="sm">
         <Container fluid className="px-4">
            <HeaderUncollapsedPart>
               <ArrowBtnAndLogoCon>
                  <SidebarControleArrow />
                  <Logo />
               </ArrowBtnAndLogoCon>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </HeaderUncollapsedPart>
            <Navbar.Collapse id="basic-navbar-nav">
               <HeaderCollapsedPart>{isUserLoggedin ? <UserDropdown /> : <LoginBtn />}</HeaderCollapsedPart>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
}

export default Header;
