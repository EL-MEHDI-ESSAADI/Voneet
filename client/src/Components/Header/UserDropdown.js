import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styled, { keyframes } from "styled-components";
import useGlobalContext from "Hooks/useGlobalContext";
import axios from "axios";
import { APP_API } from "Data";

// styles
const StyledUser = styled.div.attrs({ className: "d-flex align-items-center gap-3" })``;

const UserImg = styled.img.attrs({ className: "rounded-circle" })`
   width: 2.8rem;
   height: 2.8rem;
   box-shadow: var(--secondary-shadow-color-1) 1.95px 1.95px 2.6px;
`;

const skeletonAnimation = keyframes`
   0% {
      opacity: 1;
   }

   50% {
      opacity: .6;
   }
   100% {
      opacity: 1;
   }
`;

const SkeletonChild = styled.div`
   width: ${({ width }) => width};
   height: ${({ height }) => height};
   background-color: #eaeaea;
   animation: ${skeletonAnimation} 1.5s ease-in-out infinite;
`;

// components
const User = React.forwardRef(({ onClick }, ref) => {
   const {
      user: { twitterAccountInfo: userTwitterAccountInfo },
   } = useGlobalContext();

   return (
      <StyledUser role="button" ref={ref} onClick={onClick} aria-label="user profile">
         <UserImg src={userTwitterAccountInfo.profile_image_url} alt="profile" />
         <div>
            <h6 className="h6 fw-normal lh-base">{userTwitterAccountInfo.name}</h6>
            <p className="m-0 small lh-1">{userTwitterAccountInfo.username}</p>
         </div>
      </StyledUser>
   );
});

export const UserSkeleton = () => (
   <StyledUser role="button" aria-label="user profile skeleton">
      <UserImg as={SkeletonChild} alt="profile" />
      <div>
         <SkeletonChild width="7rem" height="1.2rem" />
         <SkeletonChild className="mt-1" width="3.5rem" height="1.1rem" />
      </div>
   </StyledUser>
);

function UserDropdown() {
   const [isLoggingOut, setIsLoggingOut] = useState(false);
   const { changeUserData, addToast } = useGlobalContext();

   function logout() {
      setIsLoggingOut(true);

      axios(APP_API + "/auth/logout", { withCredentials: true })
         .then(() => {
            changeUserData({
               isLoggedin: false,
               twitterAccountInfo: null,
            });
            addToast({ text: "logout successful", variant: "success" });
         })
         .catch((err) => {
            // console the error, and set a toast for it
            console.error(err);
            addToast({ text: "Something went wrong please try to logout again", variant: "danger" });
         })
         .finally(() => setIsLoggingOut(false));
   }
   return (
      <Dropdown align="end">
         <Dropdown.Toggle as={User} id="dropdown-custom-components" />
         <Dropdown.Menu>
            <Dropdown.Item as="button" onClick={logout} disabled={isLoggingOut}>
               {isLoggingOut && (
                  <div className="spinner-border spinner-border-sm  text-primary me-1" role="status">
                     <span className="visually-hidden">Loading...</span>
                  </div>
               )}
               Logout
            </Dropdown.Item>
         </Dropdown.Menu>
      </Dropdown>
   );
}

export default UserDropdown;
