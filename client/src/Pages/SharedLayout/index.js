import React from "react";
import { Outlet } from "react-router-dom";

function SharedLayout() {
   return (
      <>
         <Outlet />
      </>
   );
}

export default SharedLayout;
