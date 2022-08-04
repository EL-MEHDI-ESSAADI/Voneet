import React from "react";
import styled from "styled-components";
import SingleWelcomeDm from "./SingleWelcomeDm";

// Styles
const StyledWelcomDms = styled.div`
   display: grid;
   gap: 1rem;
   width: min(100%, 1445px);
   margin: auto;
   @media (min-width: 576px) {
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
   }
`;

// components
function WelcomeDms({ welcomeDmsList }) {
   const welcomeDmsElements = welcomeDmsList.map((welcomeDmData) => (
      <SingleWelcomeDm key={welcomeDmData.id} welcomeDmData={welcomeDmData} />
   ));

   return <StyledWelcomDms>{welcomeDmsElements}</StyledWelcomDms>;
}

export default WelcomeDms;
