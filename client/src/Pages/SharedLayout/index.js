import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Sidenav } from "Components";

function SharedLayout() {
   return (
      <>
         <Sidenav />
         <div className="flex-grow-1">
            <Header />
            <Outlet />
         </div>
      </>
   );
}

export default SharedLayout;
