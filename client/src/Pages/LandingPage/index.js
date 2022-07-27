import React from "react";
import { Features, Footer, HelloSection } from "Components";
import { PageSection } from "Components/styles";
import styled, { keyframes } from "styled-components";

// styles
const colorChange = keyframes`
   to {
      background-position: 200% center;
   }
`;

const Heading = styled.h1.attrs({ className: "display-5" })`
   background-image: linear-gradient(
      to right,
      var(--bs-pink) 20%,
      var(--bs-primary) 40%,
      var(--bs-primary) 60%,
      var(--bs-pink) 80%
   );
   text-align: center;
   font-weight: 700;
   color: transparent;
   background-size: 200% auto;
   -webkit-background-clip: text;
   background-clip: text;
   animation: ${colorChange} 20s linear infinite;
`;

const Paragraph = styled.p`
   font-size: clamp(1rem, 8vw - 1rem, 1.25rem); ;
`;

// component
function LandingPage() {
   return (
      <main id="main">
         <HelloSection />
         <PageSection>
            <Heading>WELCOME TO VONEET</Heading>
            <Paragraph className="text-center mt-3">
               An twitter tool that bring to you some new awesome twitter freatures
            </Paragraph>
            <Features/>
         </PageSection>
         <Footer />
      </main>
   );
}

export default LandingPage;