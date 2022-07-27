import React from "react";
import { useEffect, useState } from "react";
import Toast from "react-bootstrap/Toast";
import styled, { keyframes } from "styled-components";

const TIME_TO_REMOVE_TOAST = 3500;

// styles
const CloseBtn = styled.button.attrs({ className: "btn-close p-3" })`
   flex-shrink: 0;
   width: 21px;
   height: 21px;
`;

const showing = keyframes`
   from {
      opacity: 0;
   }to {
      opacity: 1;
   }
`;
const hiding = keyframes`
   from {
      opacity: 1;
   }to {
      opacity: 0;
   }
`;

const StyledToast = styled(Toast)`
   animation: ${({ show }) => (show ? showing : hiding)} 0.15s linear forwards;

   @media (max-width: 576px) {
      width: 300px;
   }
`;

// components
function MyToast({ removeCurrentToast, variant = "light", children }) {
   const [show, setShow] = useState(true);

   useEffect(() => {
      // the hiding animation will take 0.15s to end , so after 0.15s I will delete the toast
      if (!show) setTimeout(() => removeCurrentToast(), 150);
   }, [show]);

   function onClose() {
      setShow(false);
   }

   return (
      <StyledToast
         className={`alert-${variant} mt-3 me-3`}
         onClose={onClose}
         show={show}
         delay={TIME_TO_REMOVE_TOAST}
         autohide
      >
         <div className="d-flex justify-content-between">
            <StyledToast.Body>{children}</StyledToast.Body>
            <CloseBtn aria-label="Close" onClick={onClose} />
         </div>
      </StyledToast>
   );
}

export default MyToast;
