import React from "react";
import { Route, Routes } from "react-router-dom";
import { SharedLayout, LandingPage, AuthCallbackPage, WelcomeDmPage } from "Pages";
import { AppToasts, RequestTests } from "Components";

function App() {
   return (
      <>
         {/* <RequestTests /> */}
         <AppToasts />
         <Routes>
            <Route path="/" element={<SharedLayout />}>
               <Route index element={<LandingPage />} />
               <Route path="/callback" element={<AuthCallbackPage />} />
               <Route path="/welcomeMessage" element={<WelcomeDmPage />} />
               <Route path="*" element={<h1>Page</h1>} />
            </Route>
         </Routes>
      </>
   );
}

export default App;
