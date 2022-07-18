import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const colors = ["var(--bs-primary)", "var(--bs-orange)", "var(--bs-pink)", "var(--bs-green)"];

// styles
const StyledFeature = styled(Link)`
   max-width: 300px;
   padding: 2rem;
   border-top: solid 5px ${({ id }) => colors[id - 1]};
   border-radius: 10px;
   color: var(--bs-secondary) !important;
   box-shadow: var(--secondary-shadow-color-1) 0px 2px 8px 0px;
   transition: var(--secondary-trn-2);

   &:hover {
      transform: scale(1.025);
   }
`;

// component
function SingleFeature({ name, description, path, id }) {
   return (
      <StyledFeature to={path} id={id}>
         <h4 className="h4 mb-1 text-capitalize">{name}</h4>
         <p>{description}</p>
      </StyledFeature>
   );
}

export default SingleFeature;
