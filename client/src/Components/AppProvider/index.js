import React from "react";
import appContext from "Context/appContext";

function AppProvider({ children }) {

   return <appContext.Provider value={"cancumed it"}>{children}</appContext.Provider>;
}

export default AppProvider;
