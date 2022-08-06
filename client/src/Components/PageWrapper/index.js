import { HelloSection, Footer } from "Components";
import React from "react";
import styled from "styled-components";

const Main = styled.main`
   display: grid;
   grid-template-rows: min-content 1fr min-content;
`;

function PageWrapper({ children, MainContentWrapper }) {
   return (
      <Main id="main">
         <HelloSection />
         {React.createElement(MainContentWrapper || "section", null, children)}
         <Footer />
      </Main>
   );
}

export default PageWrapper;
