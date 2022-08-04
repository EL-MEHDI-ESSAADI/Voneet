import { HelloSection, Footer } from "Components";
import styled from "styled-components";

const Main = styled.main`
   display: grid;
   grid-template-rows: min-content 1fr min-content;
`;

function PageWrapper({ children }) {
   return (
      <Main id="main">
         <HelloSection />
         <div>{children}</div>
         <Footer />
      </Main>
   );
}

export default PageWrapper;
