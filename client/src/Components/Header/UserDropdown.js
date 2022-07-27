import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styled from "styled-components";
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

function UserDropdown() {
   const { changeUserData, addToast } = useGlobalContext();

   function logout() {
      axios(APP_API + "/auth/logout", { withCredentials: true })
         .then(() => {
            changeUserData({
               isLoggedin: false,
               twitterAccountInfo: undefined,
            });
            addToast({ text: "logout successful", variant: "success" });
         })
         .catch((err) => {
            // console the error, and set a toast for it
            console.error(err);
            addToast({ text: "Something went wrong please try to logout again", variant: "danger" });
         });
   }
   return (
      <Dropdown align="end">
         <Dropdown.Toggle as={User} id="dropdown-custom-components" />
         <Dropdown.Menu>
            <Dropdown.Item as="button" onClick={logout}>
               Logout
            </Dropdown.Item>
         </Dropdown.Menu>
      </Dropdown>
   );
}

export default UserDropdown;
