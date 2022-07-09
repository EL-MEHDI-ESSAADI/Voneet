import React from "react";
import { Dropdown } from "react-bootstrap";
import styled from "styled-components";
// import useGlobalContext from "Hooks/useGlobalContext";

// styles
const StyledUser = styled.div.attrs({ className: "d-flex align-items-center gap-3" })``;

const UserImg = styled.img.attrs({ className: "rounded-circle" })`
   width: 2.8rem;
   height: 2.8rem;
   box-shadow: var(--secondary-shadow-color-1) 1.95px 1.95px 2.6px;
`;

// components
const User = React.forwardRef(({ onClick }, ref) => {
   // const { user } = useGlobalContext();
   const user = {
      profileImage: "https://pbs.twimg.com/profile_images/1539340885128888323/eX_JWLjS_normal.png",
      name: "Mehdi Essaadi",
      userName: "Von_Mehdi",
   };
   return (
      <StyledUser role="button" ref={ref} onClick={onClick}>
         <UserImg src={user.profileImage} alt="profile" />
         <div>
            <h6 className="h6 fw-normal lh-base">{user.name}</h6>
            <p className="m-0 small lh-1">{user.userName}</p>
         </div>
      </StyledUser>
   );
});

function UserDropdown() {
   return (
      <Dropdown align="end">
         <Dropdown.Toggle as={User} id="dropdown-custom-components" />
         <Dropdown.Menu>
            <Dropdown.Item as="button">Logout</Dropdown.Item>
         </Dropdown.Menu>
      </Dropdown>
   );
}

export default UserDropdown;
