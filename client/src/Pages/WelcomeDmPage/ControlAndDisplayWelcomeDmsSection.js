import React, { useState, useEffect } from "react";
import { PageSection } from "Components/styles";
import { APP_API } from "Data";
import axios from "axios";
import SectionHeader from "./SectionHeader";
import AddWelcomeDmForm from "./AddWelcomeDmForm";
import WelcomeDms from "./WelcomeDms";
import { useGlobalContext } from "Hooks";
import { welcomeDmContext } from "Contexts";
import { getCatchErrorFunction } from "Helpers/utils";

/*
   I want to make a point on how I used welcomeDmsList :
      I can every time the user delete/add.. a welcome message to get the new value of welcomeDmsList from
      the server that itself will get it from Twitter api, but that will cost me a request to 
      direct_messages/welcome_messages/list.json, and the user have the right only to make 15 request in 15
      minutes, so preferd to handel updating the welcomeDmsList by my hand
*/

const Spinner = () => (
   <div className="d-flex justify-content-center">
      <div className="spinner-border text-primary" role="status">
         <span className="visually-hidden">Loading...</span>
      </div>
   </div>
);
function ControlAndDisplayWelcomeDmsSection() {
   const [welcomeDmsList, setWelcomeDmsList] = useState([]);
   const [isLoadingWelcomeDms, setIsLoadingWelcomeDms] = useState(false);
   const [error, setError] = useState("");
   const {
      user: { isLoggedin: isUserLoggedin },
      addToast,
   } = useGlobalContext();

   useEffect(() => {
      if (!isUserLoggedin) return;
      getUserWelcomeDms();
   }, [isUserLoggedin]);

   function getUserWelcomeDms() {
      // start loading welcomeDms
      setIsLoadingWelcomeDms(true);

      axios
         .get(APP_API + "/welcomeMessages", { withCredentials: true })
         .then(({ data }) => setWelcomeDmsList(data))
         .catch(
            getCatchErrorFunction(
               "we have reached the rate limit (15-Requests/15-min) on getting your welcome messages from twitter",
               "Fail to get your welcome messages because ",
               addToast,
               (cause) => setError("Fail to get your welcome messages because " + cause)
            )
         )
         .finally(() => setIsLoadingWelcomeDms(false));
   }

   return (
      <welcomeDmContext.Provider value={setWelcomeDmsList}>
         <PageSection>
            <SectionHeader>Add a Welcome Message</SectionHeader>
            <AddWelcomeDmForm />
         </PageSection>

         {isUserLoggedin && (
            <PageSection>
               <SectionHeader>Welcome Messages</SectionHeader>
               {isLoadingWelcomeDms ? (
                  <Spinner />
               ) : error ? (
                  <div>{error}</div>
               ) : welcomeDmsList.length ? (
                  <WelcomeDms welcomeDmsList={welcomeDmsList} />
               ) : (
                  <div>You don't have any welcome messages.</div>
               )}
            </PageSection>
         )}
      </welcomeDmContext.Provider>
   );
}

export default React.memo(ControlAndDisplayWelcomeDmsSection);
