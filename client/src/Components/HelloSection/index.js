import React from "react";
import styled, { keyframes } from "styled-components";
import blueCirclesImg from "Assets/blueCircles.png";

const moveBg = keyframes`
   from {
      background-position: 0% 0%;
   }to {
      background-position: 100% 100%;
   }
`;

const Header = styled.header`
   height: 145px;
   padding: 1.5rem 2.25rem 0rem;
   border-radius: 0 0 1rem 1rem;
   background-color: var(--bs-primary-shade-20);
   background-image: url(${blueCirclesImg});
   background-size: 120% 120%;
   animation: ${moveBg} 70s linear alternate infinite;

   & > * {
      color: white;
   }

   @media (max-width: 768px) {
      background-size: cover;
      background-position: right;
      animation: none;
   }
`;

function HelloSection() {
   return (
      <Header>
         <h1 className="h1">Hello!</h1>
         <p>I'm VON the creater of this site, hope you find it useful.</p>
      </Header>
   );
}

export default HelloSection;
