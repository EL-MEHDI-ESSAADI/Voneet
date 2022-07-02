import React from "react";
import styles from "./UserStyles.module.scss";
import { Dropdown } from "react-bootstrap";
// import useGlobalContext from "Hooks/useGlobalContext";

const User = React.forwardRef(({onClick}, ref) => {
   // const { user } = useGlobalContext();
   const user = {
      profileImage: "https://pbs.twimg.com/profile_images/1539340885128888323/eX_JWLjS_normal.png",
      name: "Mehdi Essaadi",
      userName: "Von_Mehdi",
   };
   return (
      <div ref={ref} onClick={onClick} className="d-flex align-items-center gap-3" role="button">
         <img src={user.profileImage} alt="profile" className={`rounded-circle ${styles.img}`} />
         <div>
            <h6 className="h6 fw-normal lh-base">{user.name}</h6>
            <p className="m-0 small lh-1">{user.userName}</p>
         </div>
      </div>
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
