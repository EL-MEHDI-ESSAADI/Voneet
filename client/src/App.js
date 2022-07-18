import React from "react";
import { Route, Routes } from "react-router-dom";
import { SharedLayout, LandingPage } from "Pages";

function App() {
   return (
      <>
         <Routes>
            <Route path="/" element={<SharedLayout />}>
               <Route index element={<LandingPage />} />
               <Route path="*" element={<h1>Page</h1>} />
            </Route>
         </Routes>
      </>
   );
}

export default App;
