import React from "react";
import { ReactComponent as LogoSymbole } from "Assets/LogoSymbole.svg";
import { Link } from "react-router-dom";

function Logo({ logoTextclassName = "" }) {
   return (
      <Link to="/">
         <LogoSymbole />
         <span className={`h3 align-middle ms-2 d-inline-block ${logoTextclassName}`}>Voneet</span>
      </Link>
   );
}

export default Logo;
