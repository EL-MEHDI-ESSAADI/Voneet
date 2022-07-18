import React, { useReducer } from "react";
import appContext from "Context/appContext";

const xl = 1200;
const defaultState = {
   isSidenavOpen: window.innerWidth > xl ? true : false,
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
