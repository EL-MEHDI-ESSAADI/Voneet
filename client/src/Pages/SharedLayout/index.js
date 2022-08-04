import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidenav from "./Sidenav";
import styled from "styled-components";

const Div = styled.div`
   display: grid;
   grid-template-rows: min-content 1fr;
`;

function SharedLayout() {
   return (
      <>
         <Sidenav />
         <Div className="flex-grow-1">
            <Header />
            <Outlet />
         </Div>
      </>
   );
}

export default SharedLayout;
