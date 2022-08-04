import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { APP_API } from "Data";
import { useGlobalContext } from "Hooks";
import { getCatchErrorFunction } from "Helpers/utils";

// styles
const StyledAuthCallbackPage = styled.section`
   display: grid;
   justify-items: center;
   align-content: center;
`;

function AuthCallbackPage() {
   const { changeUserData, addToast } = useGlobalContext();
   const navigate = useNavigate();

   useEffect(() => {
      const pageHrefParamas = new URLSearchParams(window.location.search);

      axios
         .post(
            APP_API + "/auth/callback",
            {
               oauth_token: pageHrefParamas.get("oauth_token"),
               oauth_verifier: pageHrefParamas.get("oauth_verifier"),
            },
            { withCredentials: true }
         )
         .then((response) => {
            changeUserData({ isLoggedin: true, twitterAccountInfo: response.data });
            addToast({ text: "Login successful", variant: "success" });
         })
         .catch(
            getCatchErrorFunction("", "Fail to login because ", addToast, () =>
               changeUserData({ isLoggedin: false, twitterAccountInfo: null })
            )
         )
         .finally(() => {
            navigate(sessionStorage.getItem("pathBeforeAuth") || "/");
         });
   }, []);

   return (
      <StyledAuthCallbackPage>
         <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
         </div>
         <h5 className="h5 mt-3">Logging in</h5>
      </StyledAuthCallbackPage>
   );
}

export default AuthCallbackPage;
