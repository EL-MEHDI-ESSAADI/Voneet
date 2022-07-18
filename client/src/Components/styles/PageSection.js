import styled from "styled-components";

const PageSection = styled.section`
   width: calc(100% - 3rem);
   padding: 1.5rem 1rem;
   margin-inline: auto;
   margin-bottom: 2.5rem;
   border-radius: 8px;
   background-color: var(--bs-white);
   box-shadow: 0px 10px 13px var(--secondary-shadow-color-2);

   &:first-of-type {
      margin-top: -2rem;
   }

   @media (min-width: 576px) {
      padding: 1.5rem;
   }
   @media (min-width: 768px) {
      width: calc(100% - 4.5rem);
   }
`;

export default PageSection;
