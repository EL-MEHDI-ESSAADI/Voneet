import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { APP_API } from "Data";
import useGlobalContext from "Hooks/useGlobalContext";

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
         .get(APP_API + "/auth/callback", {
            withCredentials: true,
            params: {
               oauth_token: pageHrefParamas.get("oauth_token"),
               oauth_verifier: pageHrefParamas.get("oauth_verifier"),
            },
         })
         .then((response) => {
            changeUserData({ isLoggedin: true, twitterAccountInfo: response.data });
            addToast({ text: "Login successful", variant: "success" });
         })
         .catch(({ error }) => {
            console.error(error);
            changeUserData({ isLoggedin: false, twitterAccountInfo: null });
            addToast({ text: "Something went wrong please try to login again", variant: "danger" });
         })
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
