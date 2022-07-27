import axios from "axios";
import React from "react";
import styled from "styled-components";
import { APP_API } from "Data";

const Div = styled.div`
   position: fixed;
   left: 50%;
   top: 50%;
   z-index: 1000000000000000000;
   display: flex;
   gap: 1rem;
   background-color: beige;
   transform: translate(-50%, -50%);
`;

function RequestTests() {
   function testServer() {
      axios
         .get(APP_API, { withCredentials: true })
         .then(({ data }) => console.log(data))
         .catch(console.error);
   }


   return (
      <Div>
         <button onClick={testServer} className="btn btn-primary">
            send request to / router
         </button>
      </Div>
   );
}

export default RequestTests;
