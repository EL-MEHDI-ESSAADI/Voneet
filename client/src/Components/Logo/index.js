import React from "react";
import { ReactComponent as LogoSymbole } from "Assets/LogoSymbole.svg";
import { Link } from "react-router-dom";
import { ScalableText } from "Components/styles";

function Logo({ shrink }) {
   return (
      <Link to="/" aria-label="logo">
         <LogoSymbole />
         <ScalableText shrink={shrink} className="h3 align-middle ms-2" aria-hidden="true">
            Voneet
         </ScalableText>
      </Link>
   );
}

export default Logo;
