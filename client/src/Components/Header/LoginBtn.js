import React from "react";
import { Button } from "react-bootstrap";
import { HiOutlineLogin } from "react-icons/hi";

function LoginBtn() {
   return (
      <Button  className="px-2 py-1 d-flex align-items-center">
         <HiOutlineLogin size="1.5rem" />
         <span className="ms-1">Login</span>
      </Button>
   );
}

export default LoginBtn;
