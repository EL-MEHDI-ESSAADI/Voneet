import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { Logo, SidebarControleArrow } from "Components";
import { Link } from "react-router-dom";
import useGlobalContext from "Hooks/useGlobalContext";
import LoginBtn from "./LoginBtn";
import UserDropdown from "./UserDropdown";

function Header() {
   const { isUserLoggedin } = useGlobalContext();

   return (
      <Navbar bg="white" expand="sm">
         <Container fluid className="px-4">
            <div className="d-flex d-xl-none align-items-center gap-3">
               <SidebarControleArrow />
               <Navbar.Brand as={Link} to="/" className="m-0">
                  <Logo />
               </Navbar.Brand>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <div className="ms-auto d-flex justify-content-end pt-2 pt-sm-0">
                  {isUserLoggedin ? <UserDropdown /> : <LoginBtn />}
               </div>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
}

export default Header;
