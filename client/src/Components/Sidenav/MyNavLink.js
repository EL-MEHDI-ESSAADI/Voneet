import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";

function MyNavLink({ to, Icon, text }) {
   return (
      <NavLink to={to} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}>
         <Icon size="1.25rem" />
         <span className={`d-inline-block animatable-text ${styles["animatable-text"]}`}>{text}</span>
      </NavLink>
   );
}

export default MyNavLink;
