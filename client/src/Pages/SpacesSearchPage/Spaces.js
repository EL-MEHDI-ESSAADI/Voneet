import React from "react";
import styled from "styled-components";
import SingleSpace from "./SingleSpace";

// styles
const StyledSpaces = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   gap: 1rem;
`;

// compnents
function Spaces({ spacesData }) {
   const spacesElements = spacesData.map((spaceData) => <SingleSpace key={spaceData.id} spaceData={spaceData} />);

   return <StyledSpaces>{spacesElements}</StyledSpaces>;
}

export default Spaces;
