import React, { useReducer } from "react";
import appContext from "Context/appContext";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import axios from "axios";
import { APP_API } from "Data";

const xl = 1200;
const defaultState = {
   isSidenavOpen: window.innerWidth > xl ? true : false,
   toasts: new Map(),
   user: {
      isLoggedin: undefined,
      twitterAccountInfo: undefined,
   },
};

const reducer = (state, action) => {
   switch (action.type) {
      case "openCloseSidenav":
         return { ...state, isSidenavOpen: action.makeSidenavOpen ? true : false };
      case "addToast":
         return { ...state, toasts: new Map(state.toasts).set(uuidv4(), action.value) };
      case "removeToast":
         const newToasts = state.toasts;

         // delate toast
         newToasts.delete(action.toastId);
         return { ...state, toasts: new Map(newToasts) };
      case "changeUserData":
         return { ...state, user: { ...state.user, ...action.newValue } };
      default:
         break;
   }
};

function AppProvider({ children }) {
   const [state, appDispatch] = useReducer(reducer, defaultState);

   const openSidenav = () => appDispatch({ type: "openCloseSidenav", makeSidenavOpen: true });
   const closeSidenav = () => appDispatch({ type: "openCloseSidenav", makeSidenavOpen: false });
   const addToast = (value) => appDispatch({ type: "addToast", value });
   const removeToast = (toastId) => appDispatch({ type: "removeToast", toastId });
   const changeUserData = (newValue) => appDispatch({ type: "changeUserData", newValue });

   useEffect(() => {
      /*
         if the page path is /callback that mean the user is in login process, so we shouldn't check if he's
         allready loggedin or no 
      */
      if (window.location.pathname === "/callback") return;
      // check if the user is allready loggedin
      axios
         .get(APP_API + "/auth/check", { withCredentials: true })
         .then(({ data }) => {
            changeUserData({
               isLoggedin: data.isUserLoggedin,
               twitterAccountInfo: data.twitterAccountInfo,
            });
         })
         .catch((err) => {
            console.error(err);
            changeUserData({
               isLoggedin: false,
               twitterAccountInfo: null,
            });
         });
   }, []);

   return (
      <appContext.Provider value={{ openSidenav, closeSidenav, addToast, removeToast, changeUserData, ...state }}>
         {children}
      </appContext.Provider>
   );
}

export default AppProvider;
