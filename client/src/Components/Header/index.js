import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { Logo, SidebarControleArrow } from "Components";
import useGlobalContext from "Hooks/useGlobalContext";
import LoginBtn from "./LoginBtn";
import UserDropdown from "./UserDropdown";
import styles from "./header.module.scss";

function Header() {
   const { isUserLoggedin } = useGlobalContext();

   return (
      <Navbar bg="white" expand="sm" className={styles.header}>
         <Container fluid className="px-4">
            <div className="d-flex d-xl-none align-items-center gap-3">
               <SidebarControleArrow />
               <Logo />
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
