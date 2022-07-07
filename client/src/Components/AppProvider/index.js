import React, { useReducer } from "react";
import appContext from "Context/appContext";

const defaultState = {
   isSidenavOpen: true,
};

const reducer = (state, action) => {
   switch (action.type) {
      case "openCloseSidenav":
         return { ...state, isSidenavOpen: action.makeSidenavOpen ? true : false };

      default:
         break;
   }
};

function AppProvider({ children }) {
   const [state, appDispatch] = useReducer(reducer, defaultState);

   const openSidenav = () => appDispatch({ type: "openCloseSidenav", makeSidenavOpen: true });
   const closeSidenav = () => appDispatch({ type: "openCloseSidenav", makeSidenavOpen: false });

   return (
      <appContext.Provider value={{ openSidenav, closeSidenav, isSidenavOpen: state.isSidenavOpen }}>
         {children}
      </appContext.Provider>
   );
}

export default AppProvider;
