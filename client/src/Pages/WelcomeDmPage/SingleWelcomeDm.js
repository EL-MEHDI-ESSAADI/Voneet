import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { APP_API } from "Data";
import { useGlobalContext, useWelcomeDmContext } from "Hooks";
import { getCatchErrorFunction } from "Helpers/utils";

// styles
const StyledWelcomeDm = styled.div`
   --border-radius-value: 0.5rem;
   position: relative;
   padding: 1.5rem;
   border-radius: var(--border-radius-value);
   background-color: var(--bs-primary-tint-88);
   box-shadow: var(--secondary-shadow-color-1) 1.95px 1.95px 2.6px;

   ${({ isActive }) => {
      if (isActive)
         return css`
            &::after {
               content: "active";
               position: absolute;
               top: 0;
               right: 0;
               padding: 0.15rem 0.5rem;
               border-top-right-radius: var(--border-radius-value);
               border-bottom-left-radius: var(--border-radius-value);
               background: var(--bs-orange);
            }
         `;
   }}
`;

// components
const DropdownToggleBtn = React.forwardRef(({ onClick }, ref) => {
   return (
      <button className="fw-bold p-1 lh-1" ref={ref} onClick={onClick}>
         ...
      </button>
   );
});
const Spinner = () => (
   <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
      <span className="visually-hidden">Loading...</span>
   </div>
);

function SingleWelcomeDm({ welcomeDmData }) {
   const setWelcomeDmsList = useWelcomeDmContext();
   const { addToast } = useGlobalContext();
   const [waitingForServerRes, setWaitingForServerRes] = useState({
      isWaitingForDelete: false,
      isWaitingForActive: false,
      isWaitingForDeactive: false,
   });
   const isWaitingForServerRes = Object.values(waitingForServerRes).includes(true);

   function deleteWelcomeDm() {
      setWaitingForServerRes((old) => ({ ...old, isWaitingForDelete: true }));
      axios
         .delete(APP_API + `/welcomeMessages/${welcomeDmData.id}`, { withCredentials: true })
         .then(() => {
            setWelcomeDmsList((oldWelcomeDmsList) =>
               oldWelcomeDmsList.filter((item) => item.id !== welcomeDmData.id)
            );
            addToast({
               text: "Welcome message deleted successfully",
               variant: "success",
            });
         })
         .catch(
            getCatchErrorFunction(
               "we have reached the rate limit on deleting your welcome messages from twitter",
               "Fail to delete your welcome message because ",
               addToast
            )
         )

         .finally(() => setWaitingForServerRes((old) => ({ ...old, isWaitingForDelete: false })));
   }

   function activateWelcomeDm() {
      setWaitingForServerRes((old) => ({ ...old, isWaitingForActive: true }));
      axios
         .put(APP_API + `/welcomeMessages/${welcomeDmData.id}/active`, null, { withCredentials: true })
         .then(() => {
            setWelcomeDmsList((oldWelcomeDmsList) => [
               { ...welcomeDmData, isActive: true },
               ...oldWelcomeDmsList
                  .filter((item) => item.id !== welcomeDmData.id)
                  .map((item) => (item.isActive ? { ...item, isActive: false } : item)),
            ]);
            addToast({
               text: "Welcome message activated successfully",
               variant: "success",
            });
         })
         .catch(
            getCatchErrorFunction(
               "we have reached the rate limit on activating your welcome messages from twitter",
               "Fail to activate your welcome message because",
               addToast
            )
         )

         .finally(() => setWaitingForServerRes((old) => ({ ...old, isWaitingForActive: false })));
   }
   function deactivateWelcomeDm() {
      setWaitingForServerRes((old) => ({ ...old, isWaitingForDeactive: true }));
      axios
         .put(APP_API + `/welcomeMessages/${welcomeDmData.id}/deactive`, null, { withCredentials: true })
         .then(() => {
            setWelcomeDmsList((oldWelcomeDmsList) => [
               ...oldWelcomeDmsList.map((item) => (item.isActive ? { ...item, isActive: false } : item)),
            ]);
            addToast({
               text: "Welcome message deactivated successfully",
               variant: "success",
            });
         })
         .catch(
            getCatchErrorFunction(
               "we have reached the rate limit on deactivating your welcome messages from twitter",
               "Fail to deactivate your welcome message because",
               addToast
            )
         )
         .finally(() => setWaitingForServerRes((old) => ({ ...old, isWaitingForDeactive: false })));
   }

   return (
      <StyledWelcomeDm isActive={welcomeDmData.isActive}>
         <div className="mb-2 gap-2 d-flex justify-content-between">
            <h5 className="fw-normal text-capitalize">{welcomeDmData.name}</h5>
            <Dropdown align="end">
               <Dropdown.Toggle as={DropdownToggleBtn} />
               <Dropdown.Menu>
                  <Dropdown.Item as="button" disabled={isWaitingForServerRes} onClick={deleteWelcomeDm}>
                     {waitingForServerRes.isWaitingForDelete && <Spinner />}
                     Delete
                  </Dropdown.Item>
                  {welcomeDmData.isActive ? (
                     <Dropdown.Item as="button" disabled={isWaitingForServerRes} onClick={deactivateWelcomeDm}>
                        {waitingForServerRes.isWaitingForDeactive && <Spinner />}
                        Deactivate
                     </Dropdown.Item>
                  ) : (
                     <Dropdown.Item as="button" disabled={isWaitingForServerRes} onClick={activateWelcomeDm}>
                        {waitingForServerRes.isWaitingForActive && <Spinner />}
                        Activate
                     </Dropdown.Item>
                  )}
               </Dropdown.Menu>
            </Dropdown>
         </div>
         <div className="h6">{welcomeDmData.text}</div>
      </StyledWelcomeDm>
   );
}

export default SingleWelcomeDm;
