import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { HiOutlineLogin } from "react-icons/hi";
import styled from "styled-components";
import { APP_API } from "Data";
import { useGlobalContext } from "Hooks";
import { getCatchErrorFunction } from "Helpers/utils";

// styles
const StyledButton = styled(Button).attrs({
   className: "px-2 py-1 d-flex align-items-center justify-content-between",
})`
   width: 87.5px;
`;

// component
function LoginBtn() {
   const [loading, setLoading] = useState(false);
   const { addToast } = useGlobalContext();

   function handelClick() {
      // start loading
      setLoading(true);

      axios
         .get(APP_API + "/auth", { withCredentials: true })
         .then(({ data }) => {
            // remember current page
            sessionStorage.setItem("pathBeforeAuth", window.location.pathname);
            // open auth url
            window.open(data.authUrl, "_self");
         })
         .catch(getCatchErrorFunction("", "Fail to login because ", addToast, () => setLoading(false)))
         .catch((error) => {
            let cause = "something went wrong in the app please try to login again";

            console.error(error);

            if (error.response && error.response.data) {
               // semething went wroung on the server
               if (error.response.status === 500) cause = error.response.data.message;
            } else if (error.request) {
               // server not responding
               cause = "the server not responding";
            }
            addToast({ text: "You can't login because " + cause, variant: "danger" });

            // stop loading
            setLoading(false);
         });
      axios
         .get(APP_API + "/auth", { withCredentials: true })
         .then(({ data }) => {
            // remember current page
            sessionStorage.setItem("pathBeforeAuth", window.location.pathname);
            // open auth url
            window.open(data.authUrl, "_self");
         })
         .catch(getCatchErrorFunction("", "Fail to login because ", addToast, () => setLoading(false)));
   }

   return (
      <StyledButton onClick={!loading ? handelClick : undefined}>
         {loading ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
         ) : (
            <HiOutlineLogin size="1.5rem" aria-hidden="true" />
         )}

         <span>Login</span>
      </StyledButton>
   );
}

export default LoginBtn;

/*
   - on click on login btn it will have a spiner

   - spinner and ta7eto "logging in ..."

   - you succesfly loged in to with your  ..
   - error happend, plear try to log in again
   - last one : you will redirect to your last page in : timer
*/
