import React from "react";
import ToastContainer from "react-bootstrap/ToastContainer";
import {useGlobalContext} from "Hooks";
import MyToast from "./MyToast";

function AppToasts() {
   const { removeToast, toasts } = useGlobalContext();

   const toastElements = [...toasts].reverse().map(([id, { text, variant }]) => {
      return (
         <MyToast key={id} id={id} variant={variant} removeCurrentToast={()=> removeToast(id)}>
            {text}
         </MyToast>
      );
   });

   return (
      <div className="fixed-top">
         <ToastContainer position="top-end">{toastElements}</ToastContainer>
      </div>
   );
}

export default AppToasts;
