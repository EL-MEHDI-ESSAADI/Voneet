import React from "react";
import { PageWrapper } from "Components";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledBackToHomePage = styled.section`
   display: grid;
   place-content: center;
   justify-items: center;
   padding-inline: .5rem;
   text-align: center;
`;

function BackToHomePage() {
   const navigate = useNavigate()

   return (
      <PageWrapper MainContentWrapper={StyledBackToHomePage}>
         <h2>Sorry, this page doesn't exist.</h2>
         <button className="mt-3 btn btn-primary" onClick={() =>navigate("/")}>Back to home</button>
      </PageWrapper>
   );
}

export default BackToHomePage;
