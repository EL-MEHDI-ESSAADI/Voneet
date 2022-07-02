import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "Components";

function SharedLayout() {
   return (
      <>
         <div></div>
         <div className="flex-grow-1">
            <Header />
            <Outlet />
         </div>
      </>
   );
}

export default SharedLayout;
