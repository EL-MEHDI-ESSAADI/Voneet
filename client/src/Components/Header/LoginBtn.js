import React from "react";
import { Button } from "react-bootstrap";
import { HiOutlineLogin } from "react-icons/hi";
import styled from "styled-components";

// styles 
const StyledButton = styled(Button).attrs({className: "px-2 py-1 d-flex align-items-center"})``

// component
function LoginBtn() {
   return (
      <StyledButton>
         <HiOutlineLogin size="1.5rem" aria-hidden="true"/>
         <span className="ms-1">Login</span>
      </StyledButton>
   );
}

export default LoginBtn;
